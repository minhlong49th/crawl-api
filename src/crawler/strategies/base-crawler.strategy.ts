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

  // async login(page: Page): Promise<void> {
  //   try {
  //     if (this.config.authentication.type === 'none') {
  //       return;
  //     }

  //     if (!this.config.selectors.login) {
  //       throw new WebsiteCrawlerError(
  //         'Login selectors not configured',
  //         this.config.type,
  //         { config: this.config },
  //       );
  //     }

  //     const { emailInput, passwordInput, submitButton } =
  //       this.config.selectors.login;
  //     const credentials = this.config.authentication.credentials;

  //     if (!credentials?.email || !credentials?.password) {
  //       throw new WebsiteCrawlerError(
  //         'Login credentials not provided',
  //         this.config.type,
  //         { authType: this.config.authentication.type },
  //       );
  //     }

  //     await page.fill(emailInput, credentials.email);
  //     await page.fill(passwordInput, credentials.password);
  //     await page.click(submitButton);
  //     await page.waitForNavigation();
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     throw new WebsiteCrawlerError(
  //       `Login failed: ${errorMessage}`,
  //       this.config.type,
  //       { originalError: error },
  //     );
  //   }
  // }

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
