import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// import { Brand } from './brand.entity';
import { CrawlData } from './crawl-data.entity';

export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  STOPPED = 'stopped',
}

@Entity()
export class CrawlTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  website: string;

  @Column()
  websiteType: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'jsonb', nullable: true })
  configuration: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  error: string;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  lastStatusCheck: Date; // New field

  // @OneToMany(() => Brand, (brand) => brand.crawlTask)
  // brands: Brand[];

  // @OneToMany(() => CrawlData, (crawlData) => crawlData.crawlTask)
  // crawlData: CrawlData[];
}
