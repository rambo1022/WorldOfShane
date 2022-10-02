const toStripeMoney = (amountBare) => {
    return Math.round(toFixedNumber(amountBare) * 100);
};

const toFixedNumber = (amountBare) => {
    return Number(parseFloat(amountBare).toFixed(2));
};

const convertToMoneyString = (val) => {
    let moneyString = '$';
    if (val === 0) {
        return moneyString + val;
    }
    val = val.toString();
    moneyString += val.substring(0, val.length - 2) + '.' + val.substring(val.length - 2, val.length);
    return moneyString;
};

export { toStripeMoney, toFixedNumber, convertToMoneyString };