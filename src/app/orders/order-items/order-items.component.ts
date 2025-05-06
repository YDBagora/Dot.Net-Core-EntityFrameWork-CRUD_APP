import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { OrderItem } from '../models/orderItem.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../sharedService/items.service';
import { Item } from '../models/item.model';
import { OrderService } from '../sharedService/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-items',
  imports: [FormsModule,CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit{

  formData!: OrderItem;
  itemList!: Item[];
  isValid: boolean = true; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef : MatDialogRef<OrderItemsComponent>,
  private itemService: ItemsService, private orderService: OrderService, private toastr: ToastrService){} 

  ngOnInit(): void {
    this.itemService.getItemList().subscribe({
      next: res => {
        this.itemList = res as Item[];
        console.log(this.itemList);
      },
      error: err => {console.log(err)}
    })

    if(this.data.orderItemIndex == null){
    this.formData = {
      id: '',
      orderID: this.data.OrderID,
      itemID: '',
      name: '',
      price: 0,
      quantity: 0,
      gTotal: 0
    }
  }
  else{
    this.formData = Object.assign({}, this.orderService.orderItem[this.data.orderItemIndex]);
  }
  }

  UpdatePrice(ctrl: any){
    if(ctrl.selectedIndex == 0){
      this.formData.price = 0;
      this.formData.name = '';
    }
    else{
      this.formData.price = this.itemList[ctrl.selectedIndex - 1].price;  
      this.formData.name = this.itemList[ctrl.selectedIndex - 1].name;  
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.gTotal = Number((this.formData.quantity * this.formData.price).toFixed(2));
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItem.push(form.value);
      } else {
        this.orderService.orderItem[this.data.orderItemIndex] = form.value;
      }
      this.closeDialog();
      this.toastr.success("Item Added","Confirmed!")
    } else {
      // alert("Please select an item and set a valid quantity.");
      this.toastr.info("Please select an item and set a valid quantity.");
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.itemID === "") {
      this.isValid = false;
    } else if (formData.quantity <= 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
  
}
