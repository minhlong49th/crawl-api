import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrawlerService } from '../crawler/crawler.service';
import { CrawlTask, TaskStatus } from '../entities/crawl-task.entity';
import { CrawlData } from '../entities/crawl-data.entity';
import { RunTaskDto } from './dto/run-task.dto';
import { TaskStatusResponseDto } from './dto/task-status.dto';
import { BrowserService } from '../crawler/browser.service';
import { MoreThan } from 'typeorm';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(CrawlTask)
    private readonly taskRepository: Repository<CrawlTask>,
    @InjectRepository(CrawlData)
    private readonly crawlDataRepository: Repository<CrawlData>,

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

    //Get lastStatusCheck value from database
    const lastStatusCheck = await this.taskRepository.findOne({
      where: { id: taskId },
      select: ['lastStatusCheck'],
    });
    this.logger.debug(`Last status check for task ${taskId}: ${lastStatusCheck?.lastStatusCheck ? lastStatusCheck.lastStatusCheck : undefined}`);

    const now = new Date();

    //count items of task which crawled and save to crawl data table in duration time from lastStatusCheck time to now
    const crawledItems = await this.crawlDataRepository.countBy({
      crawlTaskId: taskId,
      createdAt: lastStatusCheck?.lastStatusCheck ? MoreThan(lastStatusCheck.lastStatusCheck) : undefined,
    });
    this.logger.debug(`Crawled items for task ${taskId}: ${crawledItems}`);

    //update lastStatusCheck time to  now
    await this.taskRepository.update(taskId, {
      lastStatusCheck: now,
    });

    return {
      status: task.status,
      error: task.error,
      data: [{
        items: crawledItems ? crawledItems : 0,
      }],
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

      await this.crawlerService.crawlDetails(page, task);

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
      await this.crawlerService.stopCrawl(task);
  
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
      
      return {
        status: TaskStatus.FAILED,
        error: error.message,
        data: [],
      };
      
    }
  }
}

