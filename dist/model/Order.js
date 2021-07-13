import ValidityType from './types/ValidityType.js';
import VarietyType from './types/VarietyType.js';
class Order {
    constructor(instrumentToken, transactionType, quantity, price, validity, variety, disclosedQuantity, triggerPrice, tag) {
        this.orderId = null;
        this.instrumentToken = null;
        this.transactionType = null;
        this.quantity = null;
        this.price = null;
        this.validity = ValidityType.GFD;
        this.variety = VarietyType.REGULAR;
        this.disclosedQuantity = null;
        this.triggerPrice = null;
        this.tag = null;
        this.instrumentToken = instrumentToken;
        this.transactionType = transactionType;
        this.quantity = quantity;
        this.price = price;
        if (validity)
            this.validity = validity;
        if (variety)
            this.variety = variety;
        if (disclosedQuantity)
            this.disclosedQuantity = disclosedQuantity;
        if (triggerPrice)
            this.triggerPrice = triggerPrice;
        if (tag)
            this.tag = tag;
    }
}
export default Order;
//# sourceMappingURL=Order.js.map