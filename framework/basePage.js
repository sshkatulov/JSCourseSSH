class BasePage {
    constructor(browser, locator) {
        this.browser = browser;
        this.locator = locator;
    }

    async isOpened() {
        const page = await this.browser.findElement(this.locator, 'Page locator');
        return page !== undefined;
    }
}

module.exports = BasePage;