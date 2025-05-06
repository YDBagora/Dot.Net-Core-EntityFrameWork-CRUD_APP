import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData!: Order;
  orderItem: OrderItem[] = [];

  baseUrl = 'https://localhost:7250/api/User';
  http = inject(HttpClient);
  customerList: any;
  services: any;

  constructor(){}
 
  
  getAllCustomerOrderList(customer: Customer) {
    const order = {
      ...this.formData,
      customer,
      orderItems: this.orderItem.map(item => ({
        ...item,
        item: {
          id: item.itemID,
          name: item.name,
          price: item.price
        },
        order: {
          id: this.formData.id,
          orderNo: this.formData.orderNo,
          payMethod: this.formData.payMethod,
          gTotal: this.formData.gTotal,
          customerID: this.formData.customerID
        }
      })) 
    };
  
    return this.http.post<Order>(this.baseUrl + '/orderDetails', order);
  }

  getAllOrderNo(){
    return this.http.get<Order>(this.baseUrl + '/getAllOrders');
  }

  getOrderById(id:string):any {
    return this.http.get<Order>(this.baseUrl + '/getOrderById/'+id)
  }

  
  
}