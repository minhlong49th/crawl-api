import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CrawlTask } from './crawl-task.entity';

export enum BackupStatus {
  NEW = 'new',
  BACKUP = 'backup',
  FAILED = 'failed',
}

@Entity()
export class CrawlData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any>;

  @Column({
    type: 'enum',
    enum: BackupStatus,
    default: BackupStatus.NEW,
  })
  status: BackupStatus;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  crawlTaskId: string;

  // @ManyToOne(() => CrawlTask, (task) => task.crawlData)
  // @JoinColumn({ name: 'crawlTaskId' })
  // crawlTask: CrawlTask;
}
