const logger = require('./log.util');

const doWait = (action, expected, interval) => {
    return new Promise((resolve, reject) => {
        const actionResult = action();
        if (actionResult === expected){
            setTimeout(() => resolve(), interval);
        }
        setTimeout(() => reject(actionResult), interval);
    });
};

const retrier = (action, expected, maxCount, interval, count) => {
    count++;
    logger.info(`[${count}] wait for ${expected}`);
    return doWait(action, expected, interval).then(() => {
        logger.info('was able to reach expected condition');
        return true;
    }, (actionResult) => {
        if (maxCount <= count) {
            logger.warning(`was not able to reach expected condition! Last value is '${actionResult}'`);
            return false;
        } else {
            return retrier(action, expected, maxCount, interval, count);
        }
    });
};

const retrierAwait = async (action, expected, maxCount, interval, count) => {
    count++;
    logger.info(`[${count}] wait for ${expected}`);
    try {
        await doWait(action, expected, interval);
        logger.info('was able to reach expected condition');
        return true;
    } catch (actionResult) {
        if (maxCount <= count) {
            logger.warning(`was not able to reach expected condition! Last value is '${actionResult}'`);
            return false;
        } else {
            return retrier(action, expected, maxCount, interval, count);
        }
    }
};

class Wait {
    forTrue(action, maxCount, interval) {
        return retrierAwait(action, true, maxCount, interval, 0);
    }

    forFalse(action, maxCount, interval) {
        return retrierAwait(action, false, maxCount, interval, 0);
    }
}

module.exports = Wait;