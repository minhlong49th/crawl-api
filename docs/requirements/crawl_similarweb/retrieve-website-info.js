// Importing the necessary libraries
const puppeteer = require('puppeteer');
const { plugin } = require('puppeteer-with-fingerprints');
const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');


async function getPageContent(url) {

    // Fetching the fingerprints
    const fingerprint = await plugin.fetch('', {
        tags: ['Microsoft Windows', 'Chrome'],
    });

    // Writing the fingerprints to a file
    plugin.useFingerprint(fingerprint);

    const browser = await plugin.launch({
        headless: false, // Run the browser in headless mode
        slowMo: 200, // Slow down Puppeteer operations by 200ms
        args: [
            '--no-sandbox', // Bypass OS security model,
        ],
        userDataDir: "./tmp",
    });

    // Opening a new page in the browser
    const page = (await browser.pages())[0] || await browser.newPage(); 

    await page.setCacheEnabled(false) 
    await page.setUserAgent(getRandomUserAgent());

    // // Navigate to the specified URL
    await page.goto("https://www.similarweb.com/website/" + getDomainFromURL(url) + "/#overview", { waitUntil: 'domcontentloaded' });

    // Waiting for the page to load with timeout 6ms
    await page.waitForSelector('div.app-page-navigation__content');

    // Getting the global rank
    let globalRank = 0;
    try {
        const globalRankSeletor = '::-p-xpath(//*[@id="overview"]/div/div/div/div[3]/div/div[1]/div/p)';
        globalRank = await page.$eval(globalRankSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Global Rank = " + globalRank);

    // Getting the total visits
    let totalVisits = 0;
    const totalVisitsSeletor = '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[1]/p[2])';
    try {
        totalVisits = await page.$eval(totalVisitsSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Total Visits = " + totalVisits);

    // Getting the bounce rate
    const bounceRateSeletor = '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[2]/p[2])';
    let bounceRate = 0;
    try {
        bounceRate = await page.$eval(bounceRateSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Bounce Rate = " + bounceRate);

    // Getting the pages per visit
    let pagesPerVisit = 0;
    const pagesPerVisitSeletor = '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[3]/p[2])';
    try {
        pagesPerVisit = await page.$eval(pagesPerVisitSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Pages Per Visit = " + pagesPerVisit);

    // Getting the avg visit duration
    let avgVisitDuration = '';
    const avgVisitDurationSelector = '::-p-xpath(//*[@id="overview"]/div/div/div/div[4]/div[2]/div[4]/p[2])';
    try {
        avgVisitDuration = await page.$eval(avgVisitDurationSelector, el => el.textContent);
    } catch (error) {}
    // console.log("Avg Visit Duration = " + avgVisitDuration);

    // Getting the traffic sources
    let organicSearch = 0;
    const organicSearchSeletor = "section#traffic-sources div[id^='highcharts'] g:nth-child(3) tspan";
    try {
        organicSearch = await page.$eval(organicSearchSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Organic Search = " + organicSearch);

    // Getting the paid search
    let paidSearch = 0;
    const paidSearchSeletor = "section#traffic-sources div[id^='highcharts'] g:nth-child(4) tspan";
    try {
        paidSearch = await page.$eval(paidSearchSeletor, el => el.textContent)
            .then(value => convertStringToNumber(value));
    } catch (error) {}
    // console.log("Paid Search = " + paidSearch);

    // Getting the top keywords
    let topKeywords = '';
    const topKeywordsSeletor = 'section#keywords div.wa-vectors-list__items span.wa-vectors-list__item-title';
    try {
        topKeywords = await page.$$eval(topKeywordsSeletor, (elements) => elements.map((el) => el.textContent));
    } catch (error) {}
    // console.log("Top Keywords = " + topKeywords);
    
    // Getting the top countries
    let topCountries = '';
    const topCountriesSeletor = 'section#geography div.wa-geography__legend-item div.wa-geography__country-info a.wa-geography__country-name';
    try {
        topCountries = await page.$$eval(topCountriesSeletor, (elements) => elements.map((el) => el.textContent));
    } catch (error) {}
    // console.log("Top Countries = " + topCountries);


    // Screenshot the traffic demographics
    const trafficDemographicsSelector = 'section#demographics div.app-section__container';
    let trafficDemographicsScreenshot = '';
    try {
        await page.setViewport({width: 1920, height: 1080});
        const trafficDemographics = await page.$(trafficDemographicsSelector);
        await trafficDemographics.scrollIntoView();
        trafficDemographicsScreenshot = await trafficDemographics.screenshot({encoding: "base64"}).then(data => {
            let base64Encode = `data:image/png;base64,${data}`;
            return base64Encode;
        });
    } catch (error) {}
    // console.log("Traffic Demographics Screenshot = " + trafficDemographicsScreenshot);
    

    // Closing the browser instance
    await browser.close();

    const output = JSON.stringify({
        globalRank, totalVisits, bounceRate, pagesPerVisit, avgVisitDuration, 
        organicSearch, paidSearch, topKeywords, topCountries, 
        trafficDemographicsScreenshot
    });
    
    // console.log(output);

    return output;
    
}

function getDomainFromURL(url) {
    var regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/img;
    var match = regex.exec(url);
    if (match && match[1]) {
        return match[1];
    } else {
        return url;
    }
}

function delayRandom(min, max) {
    return new Promise(resolve => setTimeout(resolve, getRandomTimeout(min, max)));
}

function getRandomTimeout(min, max) {
    return Math.random() * (max - min) + min;
}

function convertStringToNumber(string) {
    let cleanString = string.replace(/[^0-9.%MKG]/g, ''); // Remove non-numeric and non-decimal characters
    
    if (cleanString.endsWith('%')) {
        cleanString = cleanString.slice(0, -1); // Remove percentage sign if present
    }
    
    let multiplier = 1;
    if (cleanString.endsWith('M')) {
        multiplier = 1000000;
        cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('K')) {
        multiplier = 1000;
        cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('G')) {
        multiplier = 1000000000;
        cleanString = cleanString.slice(0, -1);
    }

    // Convert the cleaned string to a number and apply the multiplier
    let result = parseFloat(cleanString) * multiplier;

    return isNaN(result) ? 0 : result; // Return 0 if result is NaN
}

function getRandomUserAgent() {
    try {
        fs.readFile('user-agents.txt', 'utf8', (err, data) => {
            if (err) {
                return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
            }
        
            const lines = data.split('\n');
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            return randomLine;
        });
    } catch (error) {
        return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
    }
    
}

// Exporting the function as a Google Cloud Function
exports.getPageContent = async function (req, res) {
    // Retrieving the 'url' parameter from the request body or query string
    let url = req.body.url || req.query.url;

    // Setting the response status code to 200 and sending the page content
    res.status(200).send(await getPageContent(url));
}


functions.http('getPageContent', async (req, res) => {
    let url = req.body.url || req.query.url;
    let result = await getPageContent(url);
  
    // Send an HTTP response
    res.status(200).send(result);
  });