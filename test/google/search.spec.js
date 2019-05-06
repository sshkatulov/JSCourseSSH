const { assert } = require('chai');
const { after, before, describe, it } = require('mocha');
const HomePage = require('../../pages/homePage');
const ResultPage = require('../../pages/resultPage');
const Browser = require('../../framework/browser');
const logger = require('../../utils/log.util');

let homePage;
let resultPage;

describe('Google search', () => {
    let browser;
    before(async () => {
        browser = new Browser();
        await browser.start();
        homePage = new HomePage(browser);
        resultPage = new ResultPage(browser);
    });

    after(async () => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(async () => {
                    await browser.quit();
                    resolve();
                }, 100);
            } catch (error) {
                logger.warning(`Error during closing the browser: ${error}`);
                reject();
            }
        });
    });

    it('should search for "webdriver"', async () => {
        assert.isTrue(await homePage.isOpened(), 'Home Page should be opened');
        await homePage.search('webdriver');
        assert.isTrue(await resultPage.isOpened(), 'Result Page should be opened');
    });

    it('should find more than 100000 results', async () => {
        assert.isTrue(await resultPage.getAmountOfResults() > 100000, 'Result Page should contain more than 100000 results');
    });

    it('should show "https://www.seleniumhq.org/projects/webdriver/" link on the first page', async () => {
        const links = await resultPage.getLinks();
        assert.include(links, 'https://www.seleniumhq.org/projects/webdriver/', 'Result Page should return the link on the first page');
    });
});