const { By } = require('selenium-webdriver');

const locators = {
    pageLocator: By.id('lga'),
    searchInput: By.name('q')
};

module.exports = { locators };