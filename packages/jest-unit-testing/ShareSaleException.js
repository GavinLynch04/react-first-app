export default class ShareSaleException extends Error {
    constructor(message) {
        super(message);
        this.name = "ShareSaleException";
    }
}