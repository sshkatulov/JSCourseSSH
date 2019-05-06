const moment = require('moment');
const YYYY_MM_DD = 'YYYY-MM-DD';

class DateTimeUtil {
    today(){
        return moment().format(YYYY_MM_DD);
    }

    setYear(date, year){
        return date.setFullYear(year);
    }

    daysDifference(dateLeft, dateRight){
        return dateLeft.getFullYear() - dateRight.getFullYear();
    }

    todayMinus10(){
        return moment().add(-10, 'days').format(YYYY_MM_DD);
    }
}

module.exports = new DateTimeUtil();