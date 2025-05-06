import { Component, OnInit } from '@angular/core';
import { OrderService } from './sharedService/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orderList!: any;

  constructor(private service: OrderService, private router: Router){}

 ngOnInit(): void {
   this.service.getAllOrderNo().subscribe({
    next: res => {
      this.orderList = res;
    },
    error: err => {console.log(err)}
   })
 }

 openForEdit(id: string){
  this.router.navigate(['/order/edit/'+id]);
  console.log(id);
 }
}
