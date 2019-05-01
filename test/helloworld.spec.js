const { describe, it } = require('mocha');
const { assert } = require('chai');
const logger = require('../utils/log.util');
const dateTime = require('../utils/dateTime.util');

describe('Hello World TestSuite', () => {
    it('should write "Hello World"', () => {
        logger.info('Hello World');
    });
});

describe('DateTime TestSuite', () => {
    it('today() should return valid date', () => {
        assert.equal(dateTime.today(), Date.now());
    });
    it('setYear() should return valid date', () => {
        assert.equal(dateTime.setYear(new Date("2019-04-22"), 2007), new Date("2007-04-22").getTime());
    });
    it('daysDifference() should return valid amount of days', () => {
        assert.equal(dateTime.daysDifference(new Date("2019-04-22"), new Date("2007-04-10")), 12);
    });
});