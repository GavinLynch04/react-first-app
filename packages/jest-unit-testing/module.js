import ShareSaleException from "./ShareSaleException.js";

export default class Portfolio {
    constructor(stockNameList = [], stockCountList = []) {
        this.stockNameList = stockNameList;
        this.stockCountList = stockCountList;
    }

    isEmpty() {
        return this.stockNameList.length === 0;
    }

    countUnique() {
        return this.stockNameList.length;
    }

    purchaseShares(stockName, stockAmount) {
        this.stockNameList.push(stockName);
        this.stockCountList.push(stockAmount);
    }

    sellShares(stockName, stockAmount) {
        const index = this.stockNameList.indexOf(stockName);
        if(stockAmount > this.stockCountList[index]) {
            throw new ShareSaleException("Cannot sell more shares than owned.");
        } else if (stockAmount === this.stockCountList[index]) {
            this.stockNameList.splice(index, 1);
            this.stockCountList.splice(index, 1);
        } else {
            this.stockCountList[index] -= stockAmount;
        }
    }

    shareCount(stockName) {
        return this.stockCountList[this.stockNameList.indexOf(stockName)];
    }
}