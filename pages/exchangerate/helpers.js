function get10DaysRatesBeforeToday(input) {
    const json = JSON.parse(input);
    const keys = Object.keys(json.rates).sort();
    const symbols = Object.keys(json.rates[keys[0]])[0];
    const output = [];
    for (let i = 0; i < keys.length; i++){
        output.push(json.rates[keys[i]][symbols].toString());
        if (output[i - 1] !== undefined) {
            output[i] = Number(output[i]) > getNumber(output[i - 1]) ? `+ ${output[i]}` : output[i];
            output[i] = Number(output[i]) < getNumber(output[i - 1]) ? `- ${output[i]}` : output[i];
        }
    }
    return output;
}

function getNumber(str) {
    return Number(str.replace('- ', '').replace('+ ', ''));
}

function getRequestString(method, start, end, symbols, base) {
    start = (start === '') ? '' : `start_at=${start}&`;
    end = (end === '') ? '' : `end_at=${end}&`;
    symbols = (symbols === '') ? '' : `symbols=${symbols}&`;
    base = (base === '') ? '' : `base=${base}`;
    return `${method}?${start}${end}${symbols}${base}`;
}

module.exports = {
    get10DaysRatesBeforeToday,
    getRequestString,
};
