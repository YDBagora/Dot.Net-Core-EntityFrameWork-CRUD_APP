import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getUrl = 'https://localhost:7250/api/User/getAllCustomer'
  constructor() { }

  http = inject(HttpClient);

  getAllCustomer(){
    return this.http.get(this.getUrl);
  }
}
