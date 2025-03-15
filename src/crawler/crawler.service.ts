import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrawlTask, TaskStatus } from '../entities/crawl-task.entity';
import { ConfigService } from '@nestjs/config';
import { Page } from 'playwright';
import { BrowserService } from './browser.service';
import { CrawlerStrategy, WebsiteCrawlerError } from './types';
import { UppromoteStrategy } from './strategies/uppromote/uppromote.strategy';
import { SimilarwebStrategy } from './strategies/similarweb/similarweb.strategy';
import { CrawlData } from '../entities/crawl-data.entity';
import { ApiService } from './services/api.service';
import { uppromoteConfig } from './configs/uppromote.config';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  private activeCrawlingTasks: Map<string, Page> = new Map();

  async stopCrawl(task: CrawlTask): Promise<void> {
    this.logger.log(`Stopping crawl for task ID: ${task.id}`);
    
    const strategy = this.getStrategy(task.websiteType);
    if (strategy) {
      await strategy.stopCrawl();
    }

    const page = this.activeCrawlingTasks.get(task.id);
    if (page) {
      try {
        
        await page.close();
        this.activeCrawlingTasks.delete(task.id);
        this.logger.log(`Successfully stopped crawl for task ID: ${task.id}`);

      } catch (error: unknown) {
        
        this.logger.error(`Failed to stop crawl for task ID: ${task.id}`, error instanceof Error ? error.stack : 'Unknown error' );
        throw new Error(`Failed to stop crawl for task ID ${task.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      }
    } else {
      this.logger.warn(`No active crawling task found for task ID: ${task.id}`);
    }
  }

  async startCrawling(task: CrawlTask): Promise<void> {
    try {
      this.logger.debug(`Starting crawling for task ${task.id}`);
      await this.taskRepository.update(task.id, { status: TaskStatus.RUNNING });

      const browser = await this.browserService.getBrowser();
      const page = await browser.newPage();
      this.activeCrawlingTasks.set(task.id, page);

      if (task.configuration?.proxy) {
        this.logger.debug(`Using proxy: ${task.configuration.proxy}`);
        const context = browser.contexts()[0];
        await context.route('**/*', (route) => {
          const proxyUrl = new URL(task.configuration.proxy);
          route.continue({
            headers: {
              'Proxy-Authorization': `Basic ${Buffer.from(
                `${proxyUrl.username}:${proxyUrl.password}`,
              ).toString('base64')}`,
            },
          });
        });
      }

      await this.crawlDetails(page, task);

      await this.taskRepository.update(task.id, {
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
      });

      await page.close();
      this.activeCrawlingTasks.delete(task.id);
    } catch (error) {
      await this.taskRepository.update(task.id, {
        status: TaskStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private readonly strategies: Map<string, CrawlerStrategy> = new Map();

  constructor(
    private readonly browserService: BrowserService,
    private readonly configService: ConfigService,
    @InjectRepository(CrawlData)
    private readonly crawlDataRepository: Repository<CrawlData>,
    private readonly apiService: ApiService,
    @InjectRepository(CrawlTask)
    private readonly taskRepository: Repository<CrawlTask>,
    private readonly similarwebStrategy: SimilarwebStrategy,
  ) {
    this.initializeStrategies();
  }

  private initializeStrategies(): void {
    // Initialize Uppromote strategy
    const uppromoteStrategy = new UppromoteStrategy(
      this.crawlDataRepository,
      {
        ...uppromoteConfig,
        authentication: uppromoteConfig.authentication,
      },
      this.apiService,
    );
    this.strategies.set('uppromote', uppromoteStrategy);
    this.logger.debug('Uppromote strategy initialized');

    // Initialize Similarweb strategy
    this.strategies.set('similarweb', this.similarwebStrategy);
    this.logger.debug('Similarweb strategy initialized');
  }

  private getStrategy(websiteType: string): CrawlerStrategy {
    const strategy = this.strategies.get(websiteType.toLowerCase());
    if (!strategy) {
      throw new WebsiteCrawlerError(
        `No crawler strategy found for website type: ${websiteType}`,
        websiteType,
        { availableTypes: Array.from(this.strategies.keys()) },
      );
    }
    this.logger.debug(`Using strategy for website type: ${websiteType}`);
    return strategy;
  }

  async crawlDetails(
    page: Page,
    task: CrawlTask,
  ): Promise<Record<string, any>> {
    const strategy = this.getStrategy(task.websiteType);
    try {
      return await strategy.extractData(page, task.id);
    } catch (error) {
      this.logger.error('Failed to crawl details:', error);
      throw error;
    }
  }

  async validateWebsiteConfiguration(websiteType: string): Promise<void> {
    const strategy = this.getStrategy(websiteType);
    try {
      await strategy.validateConfiguration();
    } catch (error) {
      this.logger.error('Failed to validate website configuration:', error);
      throw error;
    }
  }

  getAvailableWebsiteTypes(): string[] {
    return Array.from(this.strategies.keys());
  }
}
