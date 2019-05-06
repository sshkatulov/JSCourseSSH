const { locators } = require('./constants');
const BasePage = require('../../framework/basePage');
const logger = require('../../utils/log.util');

class ResultPage extends BasePage {
    constructor(browser) {
        super(browser, locators.pageLocator);
    }

    async getAmountOfResults() {
        const stats = await this.browser.findElement(locators.resultsStats, 'Result Stats');
        const statsTxt = await stats.getText();
        const result = Number(statsTxt.slice(statsTxt.search(/[0-9]/g), statsTxt.indexOf('(')).replace(/ /g, ''));
        logger.info(`Found ${result} results`);
        return result;
    }

    async getLinks() {
        const searchResults = await this.browser.findElements(locators.searchResult, 'Search Result');
        let links = [];
        for (let i = 0; i < searchResults.length; i++){
            links.push(await searchResults[i].getAttribute('href'));
        }
        logger.info(`Found links: ${links}`);
        return links;
    }
}

module.exports = ResultPage;