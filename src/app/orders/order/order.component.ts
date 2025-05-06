import { Component, OnInit } from '@angular/core';
import { OrderService } from '../sharedService/order.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from '../sharedService/customer.service';
import { Customer } from '../models/customer.model';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  customerList!: Customer[];

  constructor(
    public services: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null) {
      this.resetForm();
    }
    else{
      this.services.getOrderById(orderID).subscribe({
        next: (res: any) => {
          this.services.formData = res.order;
          this.services.orderItem = res.order;
        },
        error: (err: any) => {
          console.log("Error loading order", err);
        }
      });
    }

    this.customerService.getAllCustomer().subscribe({
      next: (res) => {
        this.customerList = res as Customer[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    } else {
      this.services.formData = {
        id: '',
        orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
        customerID: '',
        customerName: '',
        payMethod: '',
        gTotal: 0,
        orderItems: [],
      };
      this.services.orderItem = [];
    }
  }

  AddOrEditItems(orderItemIndex: any, OrderID: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog
      .open(OrderItemsComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.updateGTotal();
      });
  }

  onDeleteOrderItems(i: number) {
    this.services.orderItem.splice(i, 1);
    this.updateGTotal();
    this.toastr.error('Item Deleted');
  }

  updateGTotal() {
    this.services.formData.gTotal = this.services.orderItem.reduce(
      (prev, curr) => {
        return prev + curr.gTotal;
      },
      0
    );
    this.services.formData.gTotal = parseFloat(
      this.services.formData.gTotal.toFixed(2)
    );
  }

  onSubmit(form: NgForm) {
    if (!this.customerList || this.customerList.length === 0) {
      alert('Customer list not loaded yet. Please wait.');
      return;
    }

    const customer = this.customerList.find(
      (c) => c.id === this.services.formData.customerID
    );

    if (!customer) {
      alert('Customer not found. Please select a valid customer.');
      return;
    }

    this.services.formData.id = uuidv4();

    this.services.orderItem.forEach((item) => {
      item.id = uuidv4();
      item.orderID = this.services.formData.id;
    });

    this.services.getAllCustomerOrderList(customer).subscribe((res) => {
      this.resetForm();
      this.toastr.success('Order Created Successfully!!', 'Confirmed');
      this.router.navigate(['/orders']);
    });
  }
}




