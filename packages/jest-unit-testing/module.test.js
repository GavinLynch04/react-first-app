import Portfolio from "./module.js";
import ShareSaleException from "./ShareSaleException.js";

test('Testing portfolio creation', () => {
    expect(() => new Portfolio()).not.toThrow();
});

test('Testing isEmpty', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBe(true);
});

test('Testing countUnique', () => {
    const portfolio = new Portfolio(["GME", "XPS"], [5, 7]);
    expect(portfolio.countUnique()).toBe(2);
});

test('Testing purchaseShares', () => {
    const portfolio = new Portfolio();
    portfolio.purchaseShares('GME', 5);
    expect(portfolio.countUnique()).toBe(1);
    expect(portfolio.isEmpty()).toBe(false);
});

test('Testing sellShares', () => {
    const portfolio = new Portfolio();
    portfolio.purchaseShares('GME', 10);
    portfolio.sellShares('GME', 5);
    const index = portfolio.stockNameList.indexOf('GME');
    expect(portfolio.stockCountList[index]).toBe(5);
});

test('Testing shareCount', () => {
    const portfolio = new Portfolio();
    portfolio.purchaseShares('GME', 10);
    expect(portfolio.shareCount('GME')).toBe(10);
});

test('Testing selling all shares', () => {
    const portfolio = new Portfolio(["GME"], [10]);
    portfolio.sellShares('GME', 10);
    expect(portfolio.isEmpty()).toBe(true);
});

test('Selling too many shares', () => {
    const portfolio = new Portfolio(["GME"], [10]);
    expect(() => portfolio.sellShares('GME', 12)).toThrow(ShareSaleException);
});