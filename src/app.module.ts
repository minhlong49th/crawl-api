import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
// import { CacheModule } from './cache/cache.module';
import { CrawlerModule } from './crawler/crawler.module';
import { TaskModule } from './task/task.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    // CacheModule,
    CrawlerModule,
    TaskModule,
  ],
})
export class AppModule {}
