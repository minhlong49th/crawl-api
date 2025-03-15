import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerModule } from '../crawler/crawler.module';
// import { CacheModule } from '../cache/cache.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CrawlTask } from '../entities/crawl-task.entity';
import { CrawlData } from 'src/entities/crawl-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CrawlTask, CrawlData]),
    CrawlerModule,
    // CacheModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
