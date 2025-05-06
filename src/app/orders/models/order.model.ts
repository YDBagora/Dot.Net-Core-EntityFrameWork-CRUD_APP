import { OrderItem } from "./orderItem.model";

export class Order {
    id!: string; // was number
    orderNo!: string;
    customerID!: string; // was number'
    customerName!: string;
    payMethod!: string;
    gTotal!: number;
  orderItems!: OrderItem[];
  }