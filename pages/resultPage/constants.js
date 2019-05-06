const { By } = require('selenium-webdriver');

const locators = {
    pageLocator: By.id('sfcnt'),
    resultsStats: By.id('resultStats'),
    searchResult: By.xpath('//*[@class="g"]//*[@class="r"]/a[1]')
};

module.exports = { locators };