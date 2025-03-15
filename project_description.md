# Crawling API server

## Project Description
This is a api server support crawl data of specifically website

## Main Technologies Used
1. Nest.js Framework
2. playwright
3. Docker composer (to setup environment)
4. postgresql (like database)
5. Redis (like cache server)
6. Nest.js mMdular Technology (to separate the crawl progress of each website)
7. playwright-extra library (https://www.npmjs.com/package/playwright-extra) to setup the stealth plugin to avoid anti-bot systems
8. fingerprint-injector library (https://www.npmjs.com/package/fingerprint-injector) to generate the browser fingerprint for playwright

## Main Functions
1. The run task api 
    - To start crawl progress for a specifically website, the crawl code is definited before
    - Return a id using to check the status of the crawl progress
    - If the crawl progres is complexity like to crawl the item info in the item list page then save cache the each item info to database
2. The check status api 
    - Using check status of the crawl progress by id which provided by the run task api
    - It will return the current status of progress and
        - If the cralw progress is cached data for the complexity crawl progress then return the cached data in duration from the last check status to the current check status
        - Else will return data one time when status is finish

## Crawl Progress for website https://marketplace.uppromote.com/
1. Go to https://marketplace.uppromote.com/offers/find-offers?page=1&per_page=40
2. If it redirect to https://marketplace.uppromote.com/login then do login with 
    - email address (x-path: `input[@placeholder='Enter your email']`) with value `minhlong49th@gmail.com`
    - password (x-path: `input[@placeholder='Enter your password']`)  with value `d>Tj:d0Y5(2y`
    - after login is sucessfully then go to https://marketplace.uppromote.com/offers/find-offers?page=1&per_page=40
3. Locate and click on the Sort seclection (x-path: `div[button/div/span[text()='Sort']]/button[@type='button']`) and click on the Newest option (x-path: `div[text()='Newest']`)
4. Get all items in the page (x-path: `div[contains(@class, 'styles_offerItemGroup')]/div[contains(@class, 'styles_findOfferItemContainer')]`)
5. With each item in the page wil follow the below actions:
    1. Locate item and scroll to it if necessary
    2. Locate and click on the 'About this brand' button (x-path: `//button[span[text()='About this brand']]`), after wait the view brand dialog (x-path: `//div[@role='dialog' and contains(@class, 'styles_modalViewBrand')]`) appear 
    3. In the view brand dialog, locate and click on the view brand button (x-path: `//button[span[text()='View brand details']]`), after that, wait for redirect to the brand detail page
    4. Collection the general data of the brand
        - brand_website is url of the brand detail page
        - name (x-path: `//button[span[text()='View brand details']]`)
        - website (x-path: `//div[contains(@class, 'styles_brandName')]//a[contains(@class, 'styles_url')]/@href`)
        - description (x-path: `//div[contains(@class, 'styles_label') and text()='Description']/following-sibling::div//span`)
        - categories (x-path: `//div[contains(@class, 'styles_label') and text()='Categories']/following-sibling::div/span`)
        - averageEPS (x-path: `//div[contains(@class, 'styles_label') and text()='Average EPS']/following-sibling::div/span`)
        - payoutRate (x-path: `//div[contains(@class, 'styles_label') and text()='Payout rate']/following-sibling::div/span`)
    5. Locate and click on the offer details tab (x-path: `//div[@data-node-key='offerDetails`) 
    6. Collection the offer detail data of brand
        - commisisonType (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission type']/following-sibling::div/span`)
        - commissionAmount (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission amount']/following-sibling::div/span`)
        - commissionRules (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Commission rules']/following-sibling::div/span`)
        - promotionOptions: (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Promotion options']/following-sibling::div/span`),
        - cookie: (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Cookie']/following-sibling::div/span`),
        - targetAudience: (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Target audience']/following-sibling::div/span`),
        - preferredPromoChannels": (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Preferred promotion channels']/following-sibling::div/span`),
        - paymentMethods: (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Payment methods']/following-sibling::div/span`),
        - applicationReview: (x-path: `//div[contains(@class, 'styles_label') and contains(@class, 'styles_labelLonger') and text()='Application review']/following-sibling::div/span`)
    7. Save the crawled data to database
6. Locate and click on the back button (x-path: ``) to go back to the previous page
7. Repeat the step 5 and 6 for all items in the page
8. Scroll to bottom page and locate the next button, click on 
6. Wait the next loaded, and repeat step 4 to 7 until the last page
8. Return the list items in JSON format

## Note
1. Support proxy
2. Support to use the local browser and local browser's profile