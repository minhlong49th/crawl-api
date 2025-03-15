import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SimilarwebData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column('float', { nullable: true })
  globalRank: number;

  @Column('float', { nullable: true })
  totalVisits: number;

  @Column('float', { nullable: true })
  bounceRate: number;

  @Column('float', { nullable: true })
  pagesPerVisit: number;

  @Column({ nullable: true })
  avgVisitDuration: string;

  @Column('float', { nullable: true })
  organicSearch: number;

  @Column('float', { nullable: true })
  paidSearch: number;

  @Column('simple-array', { nullable: true })
  topKeywords: string[];

  @Column('simple-array', { nullable: true })
  topCountries: string[];

  @Column('text', { nullable: true })
  trafficDemographicsScreenshot: string;

  @Column()
  taskId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}