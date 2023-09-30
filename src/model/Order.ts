import OrderType from '../types/OrderType.js';
import ValidityType from '../types/ValidityType.js';
import VarietyType from '../types/VarietyType.js';

class Order {
	orderId: string;
	instrumentToken: number;
	transactionType: OrderType;
	quantity: number;
	price: number;
	validity = ValidityType.GFD;
	variety = VarietyType.REGULAR;
	disclosedQuantity: number;
	triggerPrice: number;
	tag: string;

	constructor(orderId: string, instrumentToken: number, transactionType: OrderType, quantity: number, price: number, tag: string) {
		this.orderId = orderId;
		this.instrumentToken = instrumentToken;
		this.transactionType = transactionType;
		this.quantity = this.disclosedQuantity = quantity;
		this.price = this.triggerPrice = price;
		this.tag = tag;
	}
}

export default Order;
