// import { WebsiteConfig } from '../types';

export const uppromoteConfig = {
  name: 'Uppromote',
  type: 'uppromote',
  version: '1.0.0',
  baseUrl: 'https://marketplace.uppromote.com',
  apiUrl: 'https://mkp-api.uppromote.com/api/v1/marketplace-offer',
  endpoints: {
    login: '/login',
    initPage: '/offers/find-offers',
    dashboard: '/dashboard',
    findOffers: '/find-offer/datatable/data',
    brandDetail: '/offer-detail/'
  },
  rules: {
    itemsPerPage: 40,
    rateLimit: 2000,
    maxRetries: 3,
    timeout: 30000,
  },
  selectors: {
    sortSelect: "//div[button/div/span[text()='Sort']]/button[@type='button']",
    newestOption: "//div[text()='Newest']",
    nextButton: "//div[contains(@class, 'styles_footerRight')]/div[3]",
    itemList:
      "//div[contains(@class, 'styles_offerItemGroup')]/div[contains(@class, 'styles_findOfferItemContainer')]",
    login: {
      emailInput: "//input[@placeholder='Enter your email']",
      passwordInput: "//input[@placeholder='Enter your password']",
      submitButton: "//button[@type='button']",
    },
    navigation: {
      mainContent: '//div[contains(@class, "styles_offerItemGroup")]',
      // nextButton: '//button[contains(@class, "styles_nextButton")]',
      nextButton: '//div[contains(@class, "styles_titleWrapper")]/button',
      itemContainer: '//div[contains(@class, "styles_findOfferItemContainer")]',
    },
    item: {
      about_this_brand_button: "//button[span[text()='About this brand']]",
      view_brand_dialog:
        "//div[@role='dialog' and contains(@class, 'styles_modalViewBrand')]",
      view_brand_button: "//button[span[text()='View brand details']]",
      title: "//div[contains(@class, 'styles_title')]"
    },
    brandDetails: {
      brandContainer: "//div[contains(@class, 'styles_brandContain')]",
      website:
        "//div[contains(@class, 'styles_brandName')]//a[contains(@class, 'styles_url')]",
      general: {
        name: "//div[contains(@class, 'styles_brandNameTitle')]",
        description:
          "//div[contains(@class, 'styles_label') and text()='Description']/following-sibling::div//span",
        categories:
          "//div[contains(@class, 'styles_label') and text()='Categories']/following-sibling::div/span",
        averageEPS:
          "//div[contains(@class, 'styles_label') and text()='Average EPS']/following-sibling::div/span",
        payoutRate:
          "//div[contains(@class, 'styles_label') and text()='Payout rate']/following-sibling::div/span",
      },
      offerDetailsTab: "//div[@id='rc-tabs-0-tab-offerDetails']",
      offerDetails: {
        commisisonType:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission type']/following-sibling::div/span",
        commissionAmount:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission amount']/following-sibling::div/span",
        commissionRules:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission rules']/following-sibling::div/span",
        promotionOptions:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Promotion options']/following-sibling::div/span",
        cookie:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Cookie']/following-sibling::div/span",
        targetAudience:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Target audience']/following-sibling::div/span",
        preferredPromoChannels:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Preferred promotion channels']/following-sibling::div/span",
        paymentMethods:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Payment methods']/following-sibling::div/span",
        applicationReview:
          "//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Application review']/following-sibling::div/span",
      },
      backButton: "//button[contains(@class, 'styles_backButton')]",
    },
    data: {
      name: '//button[span[text()="View brand details"]]',
      website:
        '//div[contains(@class, "styles_brandName")]//a[contains(@class, "styles_url")]',
      description:
        '//div[contains(@class, "styles_label") and text()="Description"]/following-sibling::div//span',
      categories:
        '//div[contains(@class, "styles_label") and text()="Categories"]/following-sibling::div/span',
      averageEPS:
        '//div[contains(@class, "styles_label") and text()="Average EPS"]/following-sibling::div/span',
      payoutRate:
        '//div[contains(@class, "styles_label") and text()="Payout rate"]/following-sibling::div/span',
      brandButton: '//button[span[text()="About this brand"]]',
      brandDetails:
        '//div[@role="dialog" and contains(@class, "styles_modalViewBrand")]',
      offerDetails: '//div[@data-node-key="offerDetails"]',
    },
  },
  authentication: {
    type: 'basic',
    credentials: {
      email: 'minhlong49th@gmail.com',
      password: 'd>Tj:d0Y5(2y',
    },
  },
  dataMapping: {
    name: {
      targetField: 'name',
      transform: 'string',
    },
    website: {
      targetField: 'website',
      transform: 'string',
    },
    description: {
      targetField: 'description',
      transform: 'string',
    },
    categories: {
      targetField: 'categories',
      transform: 'array',
    },
    averageEPS: {
      targetField: 'averageEPS',
      transform: 'number',
    },
    payoutRate: {
      targetField: 'payoutRate',
      transform: 'string',
    },
  },
};
