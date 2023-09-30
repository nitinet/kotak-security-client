import ValidityType from '../types/ValidityType.js';
import VarietyType from '../types/VarietyType.js';
class Order {
    orderId;
    instrumentToken;
    transactionType;
    quantity;
    price;
    validity = ValidityType.GFD;
    variety = VarietyType.REGULAR;
    disclosedQuantity;
    triggerPrice;
    tag;
    constructor(orderId, instrumentToken, transactionType, quantity, price, tag) {
        this.orderId = orderId;
        this.instrumentToken = instrumentToken;
        this.transactionType = transactionType;
        this.quantity = this.disclosedQuantity = quantity;
        this.price = this.triggerPrice = price;
        this.tag = tag;
    }
}
export default Order;
//# sourceMappingURL=Order.js.map