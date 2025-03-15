import { Injectable, Logger } from '@nestjs/common';
import { UppromoteDataExtractor } from './uppromote.extractor';
import { uppromoteConfig as crawlConfig } from '../../configs/uppromote.config';
import { delay } from '../../../utils/helpers';
import { ElementHandle } from 'playwright';
import { Repository } from 'typeorm';
import { CrawlData } from 'src/entities/crawl-data.entity';
import { Page } from 'playwright';
import {
    WebsiteConfig,
    WebsiteCrawlerError,
  } from '../../types';
import { UppromoteLoginStrategy } from './login.strategy';

@Injectable()
export class UppromoteDashboardStrategy {
    private readonly logger = new Logger(UppromoteDashboardStrategy.name);
    private readonly loginStrategy: UppromoteLoginStrategy;
    protected taskId: string;

    constructor(
        private readonly crawlDataRepository: Repository<CrawlData>,
        config: WebsiteConfig,
    ) {
        this.loginStrategy = new UppromoteLoginStrategy(config);
    }

    ////Check Item is ready crawl data
    public async checkItemReadyCrawl(item: ElementHandle<SVGElement | HTMLElement>) {
        this.logger.debug('Checking item ready crawl');
        
        if (!item) {
            this.logger.debug('Item element is not available');
            throw new Error('Item element is not available');
        }

        const nameEl = await item.$(crawlConfig.selectors.item.title);
        if (nameEl) {
            const nameValue = await nameEl.textContent();
            if (nameValue) {
                const isExist = await this.crawlDataRepository.findOneBy({ name: nameValue });
                if (isExist) {
                    this.logger.debug(`Item ${nameValue} already exist`);
                    return true;
                }
            }
        }

        this.logger.debug('Checking item ready crawl - ready');

      return false
    }

    public async navigateToBrandDetailsPage(
        item: ElementHandle<SVGElement | HTMLElement>,
        page: Page,
      ): Promise<void> {
        this.logger.debug('Navigating to brand details page');

        if (!item) {
            this.logger.debug('Item element is not available');
            throw new Error('Item element is not available');
        }

        if (!page) {
            this.logger.debug('Page element is not available');
            throw new Error('Page element is not available');
        }
    
        //Locate the 'About the brand' button of the item
        const about_this_brand_button = await item.$(
          crawlConfig.selectors.item.about_this_brand_button,
        );
    
        if (!about_this_brand_button) {
          this.logger.debug('About this brand button not found');
          throw new Error('About this brand button not found');
        }
    
        //Click on the 'About the brand' button
        await about_this_brand_button.click();
    
        //Wait for the Brand modal to appear
        await delay(1000);
    
        //Locate the 'About the brand' modal
        const brandModal = await page.$(
          crawlConfig.selectors.item.view_brand_dialog,
        );
        //Locate the `View brand details` button of the modal
        if (!brandModal) {
          this.logger.debug('Brand modal not found');
          throw new Error('Brand modal not found');
        }
    
        //Locate the `View brand details` button of the modal
        const viewBrandDetailsButton = await brandModal.$(
          crawlConfig.selectors.item.view_brand_button,
        );
        if (!viewBrandDetailsButton) {
          this.logger.debug('View brand details button not found');
          throw new Error('View brand details button not found');
        }
    
        //Click on the `View brand details` button
        await viewBrandDetailsButton.click();
    
        //Wait for redirection to the brand page details
        await page.waitForLoadState('networkidle');
        await page.waitForSelector(
          crawlConfig.selectors.brandDetails.brandContainer,
        );
        await delay(crawlConfig.rules.rateLimit); // Respect rate limiting

        this.logger.debug('Navigating to brand details page - ready');
    }

    public async progessDashboardPage(page: Page, currentPage: number): Promise<void> {
        this.logger.debug('Processing dashboard page');

        if (!page) {
            this.logger.debug('Page element is not available');
            throw new Error('Page element is not available');
        }
    
        await page.goto(this.getFullInitialUrl(currentPage), {
          waitUntil: 'networkidle',
        });
    
        //Check current URl is login page
        if (page.url().includes('/login')) {
          await this.loginStrategy.login(page);
          await page.goto(this.getFullInitialUrl(currentPage), {
            waitUntil: 'networkidle',
          });
        }
    
        // Locate and click on the 'Newest' option from the dropdown
        this.logger.debug('Clicking on the sort dropdown');
        await page.click(crawlConfig.selectors.sortSelect);
    
        // Wait for the sort dropdown to appear
        await delay(1000);
    
        // Locate and click on the 'Newest' option from the dropdown
        this.logger.debug('Clicking on the newest option');
        await page.click(crawlConfig.selectors.newestOption);
    
        // Wait for the page to load after sorting
        await page.waitForSelector(crawlConfig.selectors.itemList);
        await delay(crawlConfig.rules.rateLimit); // Respect rate limiting

        this.logger.debug('Processing dashboard page - ready');
    }
    
    public getFullInitialUrl(currentPage: number = 1): string {
        return `${crawlConfig.baseUrl}${crawlConfig.endpoints.initPage}?page=${currentPage}&per_page=${crawlConfig.rules.itemsPerPage}`;
    }
}