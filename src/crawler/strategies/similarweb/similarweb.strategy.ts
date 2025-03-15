import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page, ElementHandle } from 'playwright';
import { BaseCrawlerStrategy } from '../base-crawler.strategy';
import { similarwebConfig } from '../../configs/similarweb.config';
import { SimilarwebData } from '../../../entities/similarweb-data.entity';
import { WebsiteCrawlerError } from '../../types';
import { ApiService } from '../../services/api.service';

@Injectable()
export class SimilarwebStrategy extends BaseCrawlerStrategy {
  private readonly logger = new Logger(SimilarwebStrategy.name);

  constructor(
    @InjectRepository(SimilarwebData)
    private readonly dataRepository: Repository<SimilarwebData>,
    private readonly apiService: ApiService,
  ) {
    super(similarwebConfig);
  }

  async login(): Promise<void> {
    // No login required for Similarweb
    return;
  }

  protected async validateWebsiteSpecificConfig(): Promise<void> {
    const requiredSelectors = [
      'globalRank',
      'totalVisits',
      'bounceRate',
      'pagesPerVisit',
      'avgVisitDuration',
      'organicSearch',
      'paidSearch',
      'topKeywords',
      'topCountries',
      'trafficDemographics',
    ];

    const missingSelectors = requiredSelectors.filter(
      (selector) => !this.config.selectors.data[selector],
    );

    if (missingSelectors.length > 0) {
      throw new WebsiteCrawlerError(
        `Missing required selectors: ${missingSelectors.join(', ')}`,
        this.config.type,
        { missingSelectors },
      );
    }
  }

  protected async handleNavigation(page: Page): Promise<void> {
    try {
      // Wait for the main content to load
      await page.waitForSelector('div.app-page-navigation__content', {
        timeout: 30000,
      });
    } catch (error) {
      throw new WebsiteCrawlerError(
        'Failed to load Similarweb page content',
        this.config.type,
        { originalError: error },
      );
    }
  }

  private getDomainFromURL(url: string): string {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/img;
    const match = regex.exec(url);
    return match && match[1] ? match[1] : url;
  }

  private convertStringToNumber(value: string): number {
    if (!value) return 0;
    
    let cleanString = value.replace(/[^0-9.%MKG]/g, '');
    
    if (cleanString.endsWith('%')) {
      cleanString = cleanString.slice(0, -1);
    }
    
    let multiplier = 1;
    if (cleanString.endsWith('M')) {
      multiplier = 1000000;
      cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('K')) {
      multiplier = 1000;
      cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('G')) {
      multiplier = 1000000000;
      cleanString = cleanString.slice(0, -1);
    }

    const result = parseFloat(cleanString) * multiplier;
    return isNaN(result) ? 0 : result;
  }

  private async extractTextContent(page: Page, selector: string): Promise<string> {
    try {
      const element = await page.locator(selector).first();
      return (await element.textContent()) || '';
    } catch {
      return '';
    }
  }

  private async extractNumber(page: Page, selector: string): Promise<number> {
    const text = await this.extractTextContent(page, selector);
    return this.convertStringToNumber(text);
  }

  private async extractArray(page: Page, selector: string): Promise<string[]> {
    try {
      const elements = await page.locator(selector).all();
      const texts = await Promise.all(
        elements.map(async (element) => (await element.textContent()) || '')
      );
      return texts.filter(text => text.length > 0);
    } catch {
      return [];
    }
  }

  async extractData(page: Page, taskId: string): Promise<Record<string, any>[]> {
    try {
      const selectors = this.config.selectors.data;
      const url = await page.url();
      
      // Extract numeric data
      const globalRank = await this.extractNumber(page, selectors.globalRank as string);
      const totalVisits = await this.extractNumber(page, selectors.totalVisits as string);
      const bounceRate = await this.extractNumber(page, selectors.bounceRate as string);
      const pagesPerVisit = await this.extractNumber(page, selectors.pagesPerVisit as string);
      const avgVisitDuration = await this.extractTextContent(page, selectors.avgVisitDuration as string);
      const organicSearch = await this.extractNumber(page, selectors.organicSearch as string);
      const paidSearch = await this.extractNumber(page, selectors.paidSearch as string);

      // Extract array data
      const topKeywords = await this.extractArray(page, selectors.topKeywords as string);
      const topCountries = await this.extractArray(page, selectors.topCountries as string);

      // Take screenshot of demographics section
      let trafficDemographicsScreenshot = '';
      try {
        const viewport = { width: 1920, height: 1080 };
        await page.setViewportSize(viewport);
        
        const demographicsLocator = page.locator(selectors.trafficDemographics as string);
        await demographicsLocator.scrollIntoViewIfNeeded();
        
        const buffer = await demographicsLocator.screenshot();
        trafficDemographicsScreenshot = `data:image/png;base64,${buffer.toString('base64')}`;
      } catch (error) {
        this.logger.warn('Failed to capture demographics screenshot:', error);
      }

      // Create and save the data entity
      const similarwebData = this.dataRepository.create({
        url,
        globalRank,
        totalVisits,
        bounceRate,
        pagesPerVisit,
        avgVisitDuration,
        organicSearch,
        paidSearch,
        topKeywords,
        topCountries,
        trafficDemographicsScreenshot,
        taskId,
      });

      await this.dataRepository.save(similarwebData);
      
      return [similarwebData];
    } catch (error) {
      throw new WebsiteCrawlerError(
        'Failed to extract Similarweb data',
        this.config.type,
        { originalError: error },
      );
    }
  }
}