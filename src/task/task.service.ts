import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
// import { Inject } from '@nestjs/common';
import { CrawlerService } from '../crawler/crawler.service';
import { CrawlTask, TaskStatus } from '../entities/crawl-task.entity';
import { RunTaskDto } from './dto/run-task.dto';
import { TaskStatusResponseDto } from './dto/task-status.dto';
import { BrowserService } from '../crawler/browser.service';
// import { BrandData, WebsiteData } from '../crawler/types';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(CrawlTask)
    private readonly taskRepository: Repository<CrawlTask>,
    // @InjectRepository(Brand)
    // private readonly brandRepository: Repository<Brand>,
    // @InjectRepository(BrandOffer)
    // private readonly brandOfferRepository: Repository<BrandOffer>,
    // @Inject(CACHE_MANAGER)
    // private readonly cacheManager: Cache,
    private readonly crawlerService: CrawlerService,
    private readonly browserService: BrowserService,
  ) {}

  async runTask(dto: RunTaskDto): Promise<string> {
    await this.crawlerService.validateWebsiteConfiguration(dto.websiteType);

    const task = this.taskRepository.create({
      website: dto.url,
      websiteType: dto.websiteType,
      status: TaskStatus.PENDING,
      configuration: { proxy: dto.proxy },
    });

    await this.taskRepository.save(task);
    this.logger.log(`Created new task with ID: ${task.id}`);

    this.startCrawling(task).catch((error) => {
      this.logger.error(`Task ${task.id} failed:`, error);
    });

    return task.id;
  }

  async getTaskStatus(taskId: string): Promise<TaskStatusResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    // const cachedData = await this.cacheManager.get<WebsiteData[]>(
    //   `task:${taskId}:data`,
    // );
    // await this.cacheManager.del(`task:${taskId}:data`);

    // const data: BrandData[] = cachedData
    //   ? cachedData.map((item) => ({
    //       ...item.mainData,
    //       offer: item.additionalData.offer,
    //     }))
    //   : task.brands?.map((brand) => ({
    //       name: brand.name,
    //       website: brand.website,
    //       description: brand.description,
    //       categories: brand.categories,
    //       averageEPS: brand.averageEPS,
    //       payoutRate: brand.payoutRate,
    //       brand_website: brand.brand_website,
    //       offer: {
    //         commissionType: brand.offer.commissionType,
    //         commissionAmount: brand.offer.commissionAmount,
    //         commissionRules: brand.offer.commissionRules,
    //         promotionOptions: brand.offer.promotionOptions,
    //         cookie: brand.offer.cookie,
    //         targetAudience: brand.offer.targetAudience,
    //         preferredPromoChannels: brand.offer.preferredPromoChannels,
    //         paymentMethods: brand.offer.paymentMethods,
    //         applicationReview: brand.offer.applicationReview,
    //       },
    //     })) || [];

    return {
      status: task.status,
      error: task.error,
      data: [],
    };
  }

  private async startCrawling(task: CrawlTask): Promise<void> {
    try {
      this.logger.debug(`Starting crawling for task ${task.id}`);

      await this.taskRepository.update(task.id, { status: TaskStatus.RUNNING });

      const browser = await this.browserService.getBrowser();
      const page = await browser.newPage();

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

      // await this.crawlerService.navigateToPage(
      //   page,
      //   task.website,
      //   task.websiteType,
      // );

      await this.crawlerService.crawlDetails(page, task);

      // let hasNextPage = true;
      // while (hasNextPage) {
      //   const items = await page.$$(
      //     'div[contains(@class, "styles_offerItemGroup")]/div[contains(@class, "styles_findOfferItemContainer")]',
      //   );

      //   for (let i = 0; i < items.length; i++) {
      //     const websiteData = (await this.crawlerService.crawlBrandDetails(
      //       page,
      //       task.websiteType,
      //     )) as WebsiteData;

      //     const brand = this.brandRepository.create({
      //       name: websiteData.mainData.name,
      //       website: websiteData.mainData.website,
      //       description: websiteData.mainData.description,
      //       categories: websiteData.mainData.categories,
      //       averageEPS: websiteData.mainData.averageEPS,
      //       payoutRate: websiteData.mainData.payoutRate,
      //       brand_website: websiteData.mainData.brand_website,
      //       crawlTaskId: task.id,
      //     });

      //     const offer = websiteData.additionalData.offer;
      //     const brandOffer = this.brandOfferRepository.create({
      //       commissionType: offer.commissionType,
      //       commissionAmount: offer.commissionAmount,
      //       commissionRules: offer.commissionRules,
      //       promotionOptions: offer.promotionOptions,
      //       cookie: offer.cookie,
      //       targetAudience: offer.targetAudience,
      //       preferredPromoChannels: offer.preferredPromoChannels,
      //       paymentMethods: offer.paymentMethods,
      //       applicationReview: offer.applicationReview,
      //     });

      //     brand.offer = brandOffer;
      //     await this.brandRepository.save(brand);

      //     // await this.cacheManager.set(
      //     //   `task:${task.id}:data`,
      //     //   [websiteData],
      //     //   60 * 60 * 24,
      //     // );
      //   }

      //   const nextButton = await page.$(
      //     'button[contains(@class, "styles_nextButton")]',
      //   );
      //   if (nextButton) {
      //     await nextButton.click();
      //     await page.waitForLoadState('networkidle');
      //   } else {
      //     hasNextPage = false;
      //   }
      // }

      await this.taskRepository.update(task.id, {
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
      });

      await page.close();
    } catch (error) {
      await this.taskRepository.update(task.id, {
        status: TaskStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }
  
  async stopTask(taskId: string): Promise<TaskStatusResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });
  
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
  
    if (task.status !== TaskStatus.RUNNING) {
      throw new Error(`Task with ID ${taskId} is not running`);
    }
  
    try {
      // Call API to stop the crawl progress
      await this.crawlerService.stopCrawl(taskId);
  
      // Update task status in the repository
      await this.taskRepository.update(taskId, { status: TaskStatus.STOPPED });
      this.logger.log(`Stopped task with ID: ${taskId}`);
  
      return {
        status: TaskStatus.STOPPED,
        error: '',
        data: [],
      };
    } catch (error) {
      this.logger.error(`Failed to stop task with ID: ${taskId}`, error.stack);
      throw new Error(`Failed to stop task with ID ${taskId}: ${error.message}`);
    }
  }
}
