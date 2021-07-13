import OrderType from './types/OrderType.js';
import ValidityType from './types/ValidityType.js';
import VarietyType from './types/VarietyType.js';

class Order {
	orderId: string = null;
	instrumentToken: number = null;
	transactionType: OrderType = null;
	quantity: number = null;
	price: number = null;
	validity = ValidityType.GFD;
	variety = VarietyType.REGULAR;
	disclosedQuantity: number = null;
	triggerPrice: number = null;
	tag: string = null;

	constructor(instrumentToken: number, transactionType: OrderType, quantity: number, price: number,
		validity?: ValidityType, variety?: VarietyType, disclosedQuantity?: number, triggerPrice?: number, tag?: string) {
		this.instrumentToken = instrumentToken;
		this.transactionType = transactionType;
		this.quantity = quantity;
		this.price = price;
		if (validity) this.validity = validity;
		if (variety) this.variety = variety;
		if (disclosedQuantity) this.disclosedQuantity = disclosedQuantity;
		if (triggerPrice) this.triggerPrice = triggerPrice;
		if (tag) this.tag = tag;
	}
}

export default Order;
