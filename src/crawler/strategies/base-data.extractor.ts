import { Injectable } from '@nestjs/common';
// import { Page } from 'playwright';
import {
  DataExtractor,
  WebsiteConfig,
  // WebsiteData,
  // MainData,
  // CrawledData,
  // WebsiteCrawlerError,
} from '../types';
import { Logger } from '@nestjs/common';

// type MainDataKey = keyof MainData;

@Injectable()
export abstract class BaseDataExtractor {
  private readonly logger = new Logger(BaseDataExtractor.name);
  protected constructor(protected readonly config: WebsiteConfig) {}

  getExtractors(customSelectors?: Record<string, string>): DataExtractor[] {
    if (!customSelectors) return [];

    const selectors = customSelectors;

    if (!selectors || typeof selectors !== 'object') {
      this.logger.debug('Invalid selectors configuration');
      throw new Error('Invalid selectors configuration');
    }

    return Object.entries(selectors).map(([key, selector]) => ({
      name: key,
      selector: selector,
      type: 'text',
    }));
  }

  // async extractMainData(page: Page): Promise<MainData> {
  //   try {
  //     const mainData: MainData = {
  //       name: '',
  //       website: '',
  //       description: '',
  //       categories: [],
  //       averageEPS: 0,
  //       payoutRate: '',
  //     };

  //     const selectors = this.config.selectors.data;

  //     for (const [field, selector] of Object.entries(selectors)) {
  //       if (this.isMainDataKey(field)) {
  //         if (field === 'categories' && Array.isArray(selector)) {
  //           const values = await this.extractArrayValue(page, selector);
  //           if (values.length > 0) {
  //             mainData.categories = values;
  //           }
  //         } else if (typeof selector === 'string') {
  //           const value = await this.extractSingleValue(page, selector);
  //           if (value) {
  //             this.setMainDataField(mainData, field, value);
  //           }
  //         }
  //       }
  //     }

  //     return this.transformMainData(mainData);
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     throw new WebsiteCrawlerError(
  //       `Failed to extract main data: ${errorMessage}`,
  //       this.config.type,
  //       { originalError: error },
  //     );
  //   }
  // }

  // async extractAdditionalData(page: Page): Promise<Record<string, any>> {
  //   try {
  //     return this.extractWebsiteSpecificData(page);
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     throw new WebsiteCrawlerError(
  //       `Failed to extract additional data: ${errorMessage}`,
  //       this.config.type,
  //       { originalError: error },
  //     );
  //   }
  // }

  // async mapToEntity(data: WebsiteData): Promise<CrawledData> {
  //   try {
  //     const mappedData = this.applyDataMapping(data);
  //     return await this.transformToEntity(mappedData);
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     throw new WebsiteCrawlerError(
  //       `Failed to map data to entity: ${errorMessage}`,
  //       this.config.type,
  //       { originalError: error },
  //     );
  //   }
  // }

  // protected async extractSingleValue(
  //   page: Page,
  //   selector: string,
  // ): Promise<string | null> {
  //   try {
  //     const element = await page.$(selector);
  //     return element ? (await element.textContent()) || null : null;
  //   } catch {
  //     return null;
  //   }
  // }

  // protected async extractArrayValue(
  //   page: Page,
  //   selectors: string[],
  // ): Promise<string[]> {
  //   const values: string[] = [];
  //   for (const selector of selectors) {
  //     const value = await this.extractSingleValue(page, selector);
  //     if (value) {
  //       values.push(value);
  //     }
  //   }
  //   return values;
  // }

  // protected applyDataMapping(data: WebsiteData): Record<string, any> {
  //   const result: Record<string, any> = {};
  //   const mapping = this.config.dataMapping;

  //   for (const [sourceField, config] of Object.entries(mapping)) {
  //     if (this.isMainDataKey(sourceField)) {
  //       const value = data.mainData[sourceField];
  //       if (value !== undefined) {
  //         result[config.targetField] = value;
  //       }
  //     }
  //   }

  //   return result;
  // }

  // private setMainDataField(
  //   mainData: MainData,
  //   field: MainDataKey,
  //   value: string,
  // ): void {
  //   switch (field) {
  //     case 'averageEPS':
  //       mainData[field] = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  //       break;
  //     case 'categories':
  //       mainData[field] = [value];
  //       break;
  //     case 'name':
  //     case 'website':
  //     case 'description':
  //     case 'payoutRate':
  //       mainData[field] = value;
  //       break;
  //   }
  // }

  // private isMainDataKey(key: string): key is MainDataKey {
  //   return key in this.getMainDataTemplate();
  // }

  // private getMainDataTemplate(): MainData {
  //   return {
  //     name: '',
  //     website: '',
  //     description: '',
  //     categories: [],
  //     averageEPS: 0,
  //     payoutRate: '',
  //   };
  // }

  // protected abstract transformMainData(data: MainData): Promise<MainData>;

  // protected abstract extractWebsiteSpecificData(
  //   page: Page,
  // ): Promise<Record<string, any>>;

  // protected abstract transformToEntity(
  //   data: Record<string, any>,
  // ): Promise<CrawledData>;
}
