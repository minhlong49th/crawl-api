import { Page } from 'playwright';
import { Injectable } from '@nestjs/common';
import {
  CrawlerStrategy,
  WebsiteConfig,
  // WebsiteData,
  WebsiteCrawlerError,
} from '../types';

@Injectable()
export abstract class BaseCrawlerStrategy implements CrawlerStrategy {
  protected constructor(protected readonly config: WebsiteConfig) {}

  async navigate(page: Page, url: string): Promise<void> {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await this.handleNavigation(page);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new WebsiteCrawlerError(
        `Navigation failed: ${errorMessage}`,
        this.config.type,
        { url, originalError: error },
      );
    }
  }

  abstract extractData(
    page: Page,
    taskId: string,
  ): Promise<Record<string, any>[]>;

  abstract login(page: Page): Promise<void>;
  abstract stopCrawl(): Promise<void> 

  async validateConfiguration(): Promise<void> {
    if (!this.config) {
      throw new WebsiteCrawlerError(
        'Website configuration is required',
        'unknown',
        {},
      );
    }

    const requiredFields = [
      'name',
      'type',
      'version',
      'selectors',
      'authentication',
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in this.config),
    );

    if (missingFields.length > 0) {
      throw new WebsiteCrawlerError(
        `Missing required configuration fields: ${missingFields.join(', ')}`,
        this.config.type,
        { missingFields },
      );
    }

    await this.validateWebsiteSpecificConfig();
  }

  protected abstract validateWebsiteSpecificConfig(): Promise<void>;

  protected abstract handleNavigation(page: Page): Promise<void>;

  getConfig(): WebsiteConfig {
    return this.config;
  }
}
