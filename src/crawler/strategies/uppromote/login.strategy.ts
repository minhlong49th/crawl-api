import { Injectable, Logger } from '@nestjs/common';
import { uppromoteConfig as crawlConfig } from '../../configs/uppromote.config';
import { Page } from 'playwright';
import {
    WebsiteConfig,
    WebsiteCrawlerError,
  } from '../../types';

@Injectable()
export class UppromoteLoginStrategy {
    private readonly logger = new Logger(UppromoteLoginStrategy.name);
    private readonly config: WebsiteConfig;
    protected taskId: string;

    constructor(config: WebsiteConfig) {
        this.config = config;
    }

    public async login(page: Page): Promise<void> {
        this.logger.debug('Starting login process');

        try {
          const { emailInput, passwordInput, submitButton } =
            crawlConfig.selectors.login;
          const credentials = crawlConfig.authentication.credentials;
    
          this.logger.debug(
            `Logging in with ${credentials.email} & ${credentials.password}`,
          );
          if (!credentials?.email || !credentials?.password) {
            throw new WebsiteCrawlerError(
              'Login credentials not provided',
              crawlConfig.type,
              { authType: crawlConfig.authentication.type },
            );
          }
    
          await page.fill(emailInput, credentials.email);
          await page.fill(passwordInput, credentials.password);
          await page.click(submitButton);
          await page.waitForURL(
            crawlConfig.baseUrl + crawlConfig.endpoints.dashboard,
            { waitUntil: 'networkidle' },
          );
    
          this.logger.debug('Logged in successfully');
          
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          throw new WebsiteCrawlerError(
            `Login failed: ${errorMessage}`,
            this.config.type,
            { originalError: error },
          );
        }
      }
}