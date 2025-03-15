import { Injectable, Logger } from '@nestjs/common';
import { UppromoteDataExtractor } from './uppromote.extractor';
import { uppromoteConfig as crawlConfig } from '../../configs/uppromote.config';
import { delay, retry } from '../../../utils/helpers';
import { ElementHandle } from 'playwright';
import { Repository } from 'typeorm';
import { CrawlData } from 'src/entities/crawl-data.entity';
import { Page } from 'playwright';
import {
    WebsiteConfig,
    WebsiteCrawlerError,
  } from '../../types';

@Injectable()
export class UppromoteBrandDetailStrategy {
    private readonly logger = new Logger(UppromoteBrandDetailStrategy.name);
    private readonly dataExtractor: UppromoteDataExtractor;

    constructor(
        private readonly crawlDataRepository: Repository<CrawlData>,
        config: WebsiteConfig,
    ) {
        this.dataExtractor = new UppromoteDataExtractor(config);
    }

    public async extractItemData(
        item: ElementHandle<SVGElement | HTMLElement>,
        page: Page,
        taskId: string,
      ): Promise<Record<string, any>> {
        this.logger.debug('Extracted Brand Detail Info');

        if (!page) {
            this.logger.debug('Page element is not available');
            throw new Error('Page element is not available');
        }

        const itemData = {};
    
        //Get url of the brand details page
        itemData['url'] = page.url();
        this.logger.debug(`Extracted Brand Detail URL: ${itemData['url']}`);
    
        //Locate the visit website a tag
        const visitWebsite = await page.$(
          crawlConfig.selectors.brandDetails.website,
        );
        if (visitWebsite) {
          const href = await visitWebsite.getAttribute('href');
          itemData['website'] = href;
          this.logger.debug(`Extracted Website URL: ${href}`);
        } else {
          itemData['website'] = null;
          this.logger.debug('Website URL not found');
        }
    
        //Extract general data
        for (const extractor of this.dataExtractor.generalExtractors) {
          try {
            retry(async () => {
                const element = await page.$(extractor.selector);
                if (element) {
                  const text = await element.textContent();
                  itemData[extractor.name] = text?.trim() || null;
                  this.logger.debug(`Extracted ${extractor.name}: ${text}`);
                }
            }, crawlConfig.rules.rateLimit);
          } catch (error) {
            console.warn(
              `Failed to extract ${extractor.name}:`,
              error instanceof Error ? error.message : 'Unknown error',
            );
            itemData[extractor.name] = null;
          }
        }
    
        retry(async () => {
            //Locate the "Offer Details" tab
            const offerDetailsTab = await page.$(
                crawlConfig.selectors.brandDetails.offerDetailsTab,
            );
            if (!offerDetailsTab) {
                this.logger.debug('Offer details tab not found');
                return itemData;
            }
        
            //Click on the "Offer Details" tab
            this.logger.debug('Clicking on Offer Details tab');
            await offerDetailsTab.click();
        });
        
    
        //Extract offer data
        for (const extractor of this.dataExtractor.offersExtractors) {
          try {
            retry(async () => {
                const element = await page.$(extractor.selector);
                if (element) {
                const text = await element.textContent();
                itemData[extractor.name] = text?.trim() || null;
                this.logger.debug(`Extracted ${extractor.name}: ${text}`);
                }
            }, crawlConfig.rules.rateLimit);
            
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error';
            console.warn(`Failed to extract ${extractor.name}:`, errorMessage);
            this.logger.debug(
              `Failed to extract ${extractor.name}: ${errorMessage}`,
            );
            itemData[extractor.name] = null;
          }
        }
    
        const crawlData = this.crawlDataRepository.create({
          source: 'uppromote',
          name: itemData['name'] as string,
          data: itemData,
          crawlTaskId: taskId,
        });
    
        await this.crawlDataRepository.save(crawlData);
    
        this.logger.debug('Extracted Brand Detail Info - ready');

        return itemData;
      }
}