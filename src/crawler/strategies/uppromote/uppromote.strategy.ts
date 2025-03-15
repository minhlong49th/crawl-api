import { Injectable, Logger } from '@nestjs/common';
import { ApiService } from '../../services/api.service';
import { Page } from 'playwright';
import { BaseCrawlerStrategy } from '../base-crawler.strategy';
import {
  WebsiteConfig,
  // WebsiteData,
  WebsiteCrawlerError,
  // MainData,
  // OfferData,
} from '../../types';
import { UppromoteDataExtractor } from './uppromote.extractor';
import { uppromoteConfig as crawlConfig } from '../../configs/uppromote.config';
import { delay, retry } from '../../../utils/helpers';
import { ElementHandle } from 'playwright';
import { Repository } from 'typeorm';
import { CrawlData } from 'src/entities/crawl-data.entity';
import { UppromoteDashboardStrategy } from './dashboard.strategy';
import { UppromoteBrandDetailStrategy } from './brandDetail.strategy';
import { UppromoteLoginStrategy } from './login.strategy';

@Injectable()
export class UppromoteStrategy extends BaseCrawlerStrategy {

  private readonly logger = new Logger(UppromoteStrategy.name);
  protected taskId: string;

  private readonly dashboardStrategy: UppromoteDashboardStrategy;
  private readonly brandStrategy: UppromoteBrandDetailStrategy;
  private readonly loginStrategy: UppromoteLoginStrategy;

  private currentPage: number = 1;
  private isRunning: boolean = false;


  constructor(
    private readonly crawlDataRepository: Repository<CrawlData>,
    config: WebsiteConfig,
    private readonly apiService: ApiService,
  ) {
    super(config);
    this.apiService = new ApiService();
    this.dashboardStrategy = new UppromoteDashboardStrategy(crawlDataRepository, config);
    this.brandStrategy = new UppromoteBrandDetailStrategy(crawlDataRepository, config);
    this.loginStrategy = new UppromoteLoginStrategy(config);
  }

  async stopCrawl(): Promise<void> {
    this.isRunning = false;
    this.logger.debug(`Stopping crawl uppromote website ${this.isRunning}`);
  }

  async extractData(
    page: Page,
    taskId: string,
  ): Promise<Record<string, any>[]> {
    this.logger.debug('Extracting Uppromote data');

    try {
      this.isRunning = true;
      this.taskId = taskId;
      this.currentPage = 1;
      let hasNextPage = true;
      let accessTokenCookie: string | undefined = undefined;

      const resultData: Record<string, any>[] = [];

      if (!page) {
          this.logger.debug('Page element is not available');
          throw new Error('Page element is not available');
      }

      await page.goto(crawlConfig.baseUrl + crawlConfig.endpoints.login, {
        waitUntil: 'networkidle',
      });

      //Check current URl is login page
      if (page.url().includes('/login')) {
        await this.loginStrategy.login(page);
        await page.goto(this.dashboardStrategy.getFullInitialUrl(this.currentPage), {
          waitUntil: 'networkidle',
        });

        
        await retry(async () => {
          const cookies = await page.context().cookies();
          this.logger.debug("Cookies:", cookies);

          if (cookies) {
            accessTokenCookie = cookies.find(cookie => cookie.name === 'marketplace_access_token')?.value;

            this.logger.debug("Access Token Cookie:", accessTokenCookie);
          } else {

            this.logger.debug("No cookies found");
            throw new Error('Cookie not found');
          }
        }, crawlConfig.rules.maxRetries);
        

        if (accessTokenCookie) {
          while(hasNextPage && this.isRunning) {
            const offers = await this.crawlListOffer(accessTokenCookie);

            // Process the API response
            if (offers && offers.data) {
              for (const offer of offers.data) {

                //check the running is false break this loop and stop crawl
                if (!this.isRunning) {
                  this.logger.debug(`Crawl is stopping ${this.isRunning} - break this loop and stop crawl`);
                  break;
                }
                
                const isExist = await this.crawlDataRepository.findOneBy({ name: offer['name'] });
                if (isExist) {
                    this.logger.debug(`Item ${offer['name']} already exist`);
                    continue;
                }

                const item = await this.crawlBrandInfo(offer, accessTokenCookie as string, taskId);

                if (item) {
                  resultData.push(item);
                }

                await delay(crawlConfig.rules.rateLimit); // Respect rate limiting

              }

              if (offers.next_page_url !== null) {
                
                hasNextPage = true;
                this.currentPage++;

                this.logger.debug('Move to next page');
              } else {
                hasNextPage = false;
                this.logger.debug('No more pages to crawl');
              }
              
            }
          }
          
        } else {

          this.logger.debug('Access Token Cookie not found');
          throw new Error('Access Token Cookie not found');
        }

      }
      
      return resultData;

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new WebsiteCrawlerError(
        `Failed to extract Uppromote data: ${errorMessage}`,
        this.config.type,
        { originalError: error },
      );
    }
  }

  async crawlListOffer(accessTokenCookie: string): Promise<any | null> {
    this.logger.debug(`Calling API ${crawlConfig.apiUrl}${crawlConfig.endpoints.findOffers}?page=${this.currentPage}&per_page=${crawlConfig.rules.itemsPerPage}&keyword=&sort_by=newest`);

    const response = await this.apiService.fetchData(
      crawlConfig.apiUrl + crawlConfig.endpoints.findOffers,
      {
        page: this.currentPage,
        per_page: crawlConfig.rules.itemsPerPage,
        keyword: '',
        sort_by: 'newest'
      },
      accessTokenCookie
    );

    if (response && response.data) {
      return response.data;
    } else {
      return null;
    }

  }

  async crawlBrandInfo(offer: any, accessTokenCookie: string, taskId: string): Promise<Record<string, any> | null> {
    this.logger.debug(`Calling API ${crawlConfig.apiUrl}${crawlConfig.endpoints.brandDetail}${offer['shop_id']}`);

    const brandResponse = await this.apiService.fetchData(
      crawlConfig.apiUrl + crawlConfig.endpoints.brandDetail + offer['shop_id'],
      {},
      accessTokenCookie
    );

    if (brandResponse && brandResponse.data) {
      const crawlData = this.crawlDataRepository.create({
        source: 'uppromote',
        name: offer['name'],
        website: brandResponse.data['website'],
        data: brandResponse.data,
        crawlTaskId: taskId,
      });

      this.crawlDataRepository.save(crawlData);
      return brandResponse.data;

    } else {
      return null;
    }

  }

  async progressNextPageButton(page: Page): Promise<boolean> {
    await retry(async () => {
      // Scroll to bottom page
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      // Check for next page
      let nextButton = await page.$(crawlConfig.selectors.nextButton);
      const isEnabled = nextButton ? await nextButton.isEnabled() : false;
      this.logger.debug(`The next button in the ${this.currentPage} page is ${isEnabled ? 'enabled' : 'disabled'}`);

      // Check if there is a next page
      if (nextButton) {
        if (isEnabled) {
          this.logger.debug('Move to next page');
          this.currentPage++;
          // await this.dashboardStrategy.progessDashboardPage(page, this.currentPage);
          nextButton.click();

          // Wait for the page to load after sorting
          await page.waitForSelector(crawlConfig.selectors.itemList);
          await delay(crawlConfig.rules.rateLimit); // Respect rate limiting
          nextButton = await page.$(crawlConfig.selectors.nextButton);
          return true;
        } else {
          this.logger.debug('No more pages to crawl');
          return false;
        }
      } else {
        throw new Error('No next button found');
      }
    },  crawlConfig.rules.maxRetries);

    return false;
  }

  async extractPageData(page: Page): Promise<Record<string, any>[]> {
    this.logger.debug('Extracting data from page');

    let items = await page.$$(crawlConfig.selectors.itemList);
    const itemData: Record<string, any>[] = [];

    let itemIndex = 0;
    const maxItems = items.length;

    while (itemIndex < maxItems) {
      this.logger.debug(`Extracting data from item ${itemIndex + 1}`);
      const item = items[itemIndex];

      //Check Item is ready crawl data
      const isExist = await this.dashboardStrategy.checkItemReadyCrawl(item);
      if (isExist) {
        itemIndex++;
        continue;
      }
      
      try {
        await this.dashboardStrategy.navigateToBrandDetailsPage(item, page);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        this.logger.debug(errorMessage);
        continue;
      }

      const data = await this.brandStrategy.extractItemData(item, page, this.taskId);
      itemData.push(data);

      await page.goBack({ waitUntil: 'networkidle' });
      // Wait for the page to load after sorting
      await page.waitForSelector(crawlConfig.selectors.itemList);
      await delay(crawlConfig.rules.rateLimit); // Respect rate limiting

      // //Locate the back button
      // const backButton = await page.$(crawlConfig.selectors.brandDetails.backButton);
      // if (backButton) {
      //   backButton.click();
      //   this.logger.debug('Back button clicked');

      //   await page.waitForURL(this.dashboardStrategy.getFullInitialUrl(), { waitUntil: 'networkidle' }, );
      //   // Wait for the page to load after sorting
      //   await page.waitForSelector(crawlConfig.selectors.itemList);
      //   await delay(crawlConfig.rules.rateLimit); // Respect rate limiting
      // } else {
      //   this.logger.debug('No back button found');
      // }
      
      // await this.dashboardStrategy.progessDashboardPage(page, this.currentPage);
      items = await page.$$(crawlConfig.selectors.itemList);
      itemIndex = 0;
    }

    this.logger.debug('Extracting data from page - ready');
    return itemData;
  }

  public async login(page: Page): Promise<void> {}
  protected async handleNavigation(page: Page): Promise<void> {}
  protected async validateWebsiteSpecificConfig(): Promise<void> {
    const requiredSelectors = [
      // 'mainContent',
      // 'itemContainer',
      // 'brandButton',
      // 'brandDetails',
    ];

    const missingSelectors = requiredSelectors.filter(
      (selector) => !this.config.selectors.data[selector],
    );

    if (missingSelectors.length > 0) {
      throw new WebsiteCrawlerError(
        `Missing required Uppromote selectors: ${missingSelectors.join(', ')}`,
        this.config.type,
        { missingSelectors },
      );
      await Promise.resolve(); // Dummy await to satisfy async requirement
    }
  }

  
}
