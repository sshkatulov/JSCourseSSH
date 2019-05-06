const { getRequestString } = require('./helpers');
const { EXCHANGE_API } = require('./constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

class Exchange {
    getRates(method, start= '', end ='', symbols = '', base = '') {
        const request = getRequestString(method, start, end, symbols, base);
        return chai.request(EXCHANGE_API.APP).get(request);
    }
}

module.exports = Exchange;