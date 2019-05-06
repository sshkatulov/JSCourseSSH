const { describe, it } = require('mocha');
const HomePage = require('../../pages/homepage');
const Browser = require('../../framework/browser');

describe('Google search', () => {
    let browser;
    before(async () => {
        browser = new Browser();
        await browser.start();
    })

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
        
    })

    it('should search for "webdriver"', async () => {
        const homePage = new HomePage(browser);
        homePage.search('webdriver');
    });
});