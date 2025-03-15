import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CrawlerService } from './crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlData } from '../entities/crawl-data.entity';
import { BrowserService } from './browser.service';
import { CrawlTask } from '../entities/crawl-task.entity';
import { ApiService } from './services/api.service';
import { SimilarwebData } from '../entities/similarweb-data.entity';
import { SimilarwebStrategy } from './strategies/similarweb/similarweb.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CrawlData, CrawlTask, SimilarwebData])
  ],
  providers: [
    CrawlerService,
    BrowserService,
    ApiService,
    SimilarwebStrategy
  ],
  exports: [CrawlerService, BrowserService],
})
export class CrawlerModule {}
