import { WebsiteConfig } from '../types';

export const similarwebConfig: WebsiteConfig = {
  name: 'Similarweb',
  type: 'similarweb',
  version: '1.0.0',
  baseUrl: 'https://www.similarweb.com',
  endpoints: {
    initPage: '/website/{domain}/#overview'
  },
  selectors: {
    data: {
      // Overview metrics
      globalRank: '::-p-xpath(//*[@id="overview"]/div/div/div/div[3]/div/div[1]/div/p)',
      totalVisits: '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[1]/p[2])',
      bounceRate: '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[2]/p[2])',
      pagesPerVisit: '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[3]/p[2])',
      avgVisitDuration: '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[4]/p[2])',
      
      // Traffic sources
      organicSearch: 'section#traffic-sources div[id^="highcharts"] g:nth-child(3) tspan',
      paidSearch: 'section#traffic-sources div[id^="highcharts"] g:nth-child(4) tspan',
      
      // Keywords and countries
      topKeywords: 'section#keywords div.wa-vectors-list__items span.wa-vectors-list__item-title',
      topCountries: 'section#geography div.wa-geography__legend-item div.wa-geography__country-info a.wa-geography__country-name',
      
      // Demographics section for screenshot
      trafficDemographics: 'section#demographics div.app-section__container'
    }
  },
  authentication: {
    type: 'none'
  },
  dataMapping: {
    globalRank: {
      targetField: 'globalRank',
      transform: 'convertStringToNumber'
    },
    totalVisits: {
      targetField: 'totalVisits',
      transform: 'convertStringToNumber'
    },
    bounceRate: {
      targetField: 'bounceRate',
      transform: 'convertStringToNumber'
    },
    pagesPerVisit: {
      targetField: 'pagesPerVisit',
      transform: 'convertStringToNumber'
    },
    avgVisitDuration: {
      targetField: 'avgVisitDuration'
    },
    organicSearch: {
      targetField: 'organicSearch',
      transform: 'convertStringToNumber'
    },
    paidSearch: {
      targetField: 'paidSearch',
      transform: 'convertStringToNumber'
    },
    topKeywords: {
      targetField: 'topKeywords'
    },
    topCountries: {
      targetField: 'topCountries'
    },
    trafficDemographics: {
      targetField: 'trafficDemographicsScreenshot',
      transform: 'screenshot'
    }
  }
};