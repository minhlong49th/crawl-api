import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../entities/crawl-task.entity';

export class TaskStatusResponseDto {
  @ApiProperty({
    enum: TaskStatus,
    description: 'Current status of the task',
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Error message if the task failed',
    required: false,
  })
  error?: string;

  @ApiProperty({
    description: 'Crawled data',
    type: 'array',
    items: {
      properties: {
        name: { type: 'string' },
        website: { type: 'string' },
        description: { type: 'string' },
        categories: { type: 'string' },
        averageEPS: { type: 'string' },
        payoutRate: { type: 'string' },
        offer: {
          type: 'object',
          properties: {
            commissionType: { type: 'string' },
            commissionAmount: { type: 'string' },
            commissionRules: { type: 'string' },
            promotionOptions: { type: 'string' },
            cookie: { type: 'string' },
            targetAudience: { type: 'string' },
            preferredPromoChannels: { type: 'string' },
            paymentMethods: { type: 'string' },
            applicationReview: { type: 'string' },
          },
        },
      },
    },
  })
  // data: Array<BrandData & { offer: OfferData }>;
  data: [];
}
