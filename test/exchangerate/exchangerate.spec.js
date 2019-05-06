const { describe, it } = require('mocha');
const Exchange = require('../../pages/exchangerate/index');
const {EXCHANGE_API, CURRNCY} = require('../../pages/exchangerate/constants');
const { get10DaysRatesBeforeToday } = require('../../pages/exchangerate/helpers');
const dateTime = require('../../utils/dateTime.util');

describe('Exchange rates api test', () => {
    it('exchangerate should return a response', async () => {
        const exchange = new Exchange();
        const result = await exchange.getRates(EXCHANGE_API.HISTORY, 
            dateTime.todayMinus10(), 
            dateTime.today(),
            CURRNCY.RUB,
            CURRNCY.USD);
        /* eslint-disable no-console */
        console.log(`I want to see if rate on my currency is growing compare to 10 days before today`);
        console.log(get10DaysRatesBeforeToday(result.text));
        console.log(`√ ${CURRNCY.RUB}'s per 1 ${CURRNCY.USD}`);
        /* eslint-enable no-console */
    });
});