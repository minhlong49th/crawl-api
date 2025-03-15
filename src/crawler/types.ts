import { Page } from 'playwright';

export interface WebsiteConfig {
  name: string;
  type: string;
  version: string;
  baseUrl: string;
  endpoints: {
    initPage: string;
    [key: string]: string;
  };
  selectors: {
    data: {
      [key: string]: string | string[];
    };
  };
  authentication: {
    type: string; //'basic' | 'oauth' | 'none';
    credentials?: {
      [key: string]: string;
    };
  };
  dataMapping: {
    [sourceField: string]: {
      targetField: string;
      transform?: string;
    };
  };
}

export interface MainData {
  name: string;
  website: string;
  description: string;
  categories: string[];
  averageEPS: number;
  payoutRate: string;
  brand_website?: string;
}

export interface OfferData {
  commissionType: string;
  commissionAmount: string;
  commissionRules: string;
  promotionOptions: string[];
  cookie: string;
  targetAudience: string;
  preferredPromoChannels: string[];
  paymentMethods: string[];
  applicationReview: string;
}

export interface WebsiteData {
  mainData: MainData;
  additionalData: {
    offer: OfferData;
  };
}

// export interface BrandData extends MainData {
//   offer: OfferData;
// }

// export interface CrawledData extends BrandData {}

export interface ProxyConfig {
  server: string;
  username?: string;
  password?: string;
}

export interface CrawlerStrategy {
  login(page: Page): Promise<void>;
  navigate(page: Page, url: string): Promise<void>;
  extractData(page: Page, taskId: string): Promise<Record<string, any>[]>;
  validateConfiguration(): Promise<void>;
  stopCrawl() : Promise<void>;
}

// export interface DataExtractor {
//   extractMainData(page: Page): Promise<MainData>;
//   extractAdditionalData(page: Page): Promise<Record<string, any>>;
//   mapToEntity(data: WebsiteData): Promise<CrawledData>;
// }

export interface DataExtractor {
  name: string;
  selector: string;
  type: 'text' | 'attribute' | 'html';
  attribute?: string;
  transform?: (value: string) => any;
}

export class WebsiteCrawlerError extends Error {
  constructor(
    message: string,
    public readonly websiteType: string,
    public readonly context: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'WebsiteCrawlerError';
  }
}
