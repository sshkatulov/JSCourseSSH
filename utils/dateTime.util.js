class DateTimeUtil {
    today(){
        return Date.now();
    }

    setYear(date, year){
        return date.setFullYear(year);
    }

    daysDifference(dateLeft, dateRight){
        return dateLeft.getFullYear() - dateRight.getFullYear();
    }
}

module.exports = new DateTimeUtil();