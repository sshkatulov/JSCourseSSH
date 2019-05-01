const { describe, it } = require('mocha');
const { assert } = require('chai');
const Wait = require('../utils/wait.util');

describe('Wait test', () => {
    it('forTrue should wait for true "true"', async () => {
        const wait = new Wait();
        const result = await wait.forTrue(() => true, 5, 1000);
        return assert.isTrue(result);
    });
    it('forTrue should wait for true "false"', async () => {
        const wait = new Wait();
        const result = await wait.forTrue(() => false, 5, 1000);
        return assert.isFalse(result);
    });
    it('forFalse should wait for false "true"', async () => {
        const wait = new Wait();
        const result = await wait.forFalse(() => false, 5, 1000);
        return assert.isTrue(result);
    });
    it('forFalse should wait for false "false"', async () => {
        const wait = new Wait();
        const result = await wait.forFalse(() => true, 5, 1000);
        return assert.isFalse(result);
    });
    it('should wait for multiple false', async () => {
        const wait = new Wait();
        const result = await Promise.all([
            wait.forFalse(() => true, 5, 1000),
            wait.forFalse(() => false, 5, 1000)
        ]);
        assert.isFalse(result[0]);
        assert.isTrue(result[1]);
    });
});