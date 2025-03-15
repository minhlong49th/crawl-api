import { Injectable } from '@nestjs/common';
import { Page } from 'playwright';
import { BaseDataExtractor } from '../base-data.extractor';
import {
  DataExtractor,
  // MainData,
  // CrawledData,
  WebsiteConfig,
  // OfferData,
  // WebsiteCrawlerError,
} from '../../types';
import { uppromoteConfig as crawlConfig } from '../../configs/uppromote.config';

@Injectable()
export class UppromoteDataExtractor extends BaseDataExtractor {
  public generalExtractors: DataExtractor[];
  public offersExtractors: DataExtractor[];

  constructor(config: WebsiteConfig) {
    super(config);

    this.generalExtractors = this.getExtractors(
      crawlConfig.selectors.brandDetails.general,
    );

    this.offersExtractors = this.getExtractors(
      crawlConfig.selectors.brandDetails.offerDetails,
    );
  }

  // protected async transformMainData(data: MainData): Promise<MainData> {
  //   return {
  //     ...data,
  //     averageEPS: this.parseNumber(data.averageEPS),
  //     categories: this.parseArray(data.categories),
  //   };
  // }

  // protected async extractWebsiteSpecificData(
  //   page: Page,
  // ): Promise<{ offer: OfferData }> {
  //   try {
  //     await page.click('//div[@data-node-key="offerDetails"]');
  //     await page.waitForSelector('//div[contains(@class, "styles_label")]');

  //     const offer: OfferData = {
  //       commissionType: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Commission type"]/following-sibling::div/span',
  //       ),
  //       commissionAmount: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Commission amount"]/following-sibling::div/span',
  //       ),
  //       commissionRules: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Commission rules"]/following-sibling::div/span',
  //       ),
  //       promotionOptions: await this.extractArray(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Promotion options"]/following-sibling::div/span',
  //       ),
  //       cookie: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Cookie"]/following-sibling::div/span',
  //       ),
  //       targetAudience: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Target audience"]/following-sibling::div/span',
  //       ),
  //       preferredPromoChannels: await this.extractArray(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Preferred promotion channels"]/following-sibling::div/span',
  //       ),
  //       paymentMethods: await this.extractArray(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Payment methods"]/following-sibling::div/span',
  //       ),
  //       applicationReview: await this.extractText(
  //         page,
  //         '//div[contains(@class, "styles_label") and contains(@class, "styles_labelLonger") and text()="Application review"]/following-sibling::div/span',
  //       ),
  //     };

  //     return { offer };
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     throw new WebsiteCrawlerError(
  //       `Failed to extract Uppromote offer data: ${errorMessage}`,
  //       this.config.type,
  //       { originalError: error },
  //     );
  //   }
  // }

  // protected async transformToEntity(
  //   data: Record<string, any>,
  // ): Promise<CrawledData> {
  //   const mainData = data.mainData as MainData;
  //   const additionalData = data.additionalData as { offer: OfferData };

  //   return {
  //     ...mainData,
  //     offer: additionalData.offer,
  //   };
  // }

  private async extractText(page: Page, selector: string): Promise<string> {
    return (await page.textContent(selector)) || '';
  }

  private async extractArray(page: Page, selector: string): Promise<string[]> {
    const text = await this.extractText(page, selector);
    return this.parseArray(text);
  }

  private parseNumber(value: number | string): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }
    return 0;
  }

  private parseArray(value: string | string[]): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  }
}
