const logger = require('./log.util');

let count = 0;

const doWait = (action, interval, expected) => {
    return new Promise((resolve, reject) => {
        if (action() === expected){
            setTimeout(() => resolve(), interval);
        }
        setTimeout(() => reject(), interval);
    })
}

const retrier = (action, maxCount, interval, expected) => {
    count++;
    logger.info(`[${count}] wait for ${expected}`);
    return doWait(action, interval, expected).then(() => {
        logger.info('was able to reach expected condition');
        count = 0;
        return expected;
    }, () => {
        if (maxCount <= count) {
            logger.warning('was not able to reach expected condition');
            count = 0;
            return !expected;
        } else {
            logger.error(`Expected: ${expected} | Got: ${action}`);
            if (expected){
                return new Wait().forTrue(action, maxCount, interval, expected);
            }
            return new Wait().forFalse(action, maxCount, interval, expected);
        }
    })
}

class Wait {
    forTrue(action, maxCount, interval, expected) {
        return retrier(action, maxCount, interval, expected);
    }

    forFalse(action, maxCount, interval, expected) {
        return retrier(action, maxCount, interval, expected);
    }
}

module.exports = Wait;