import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  getItemUrl = 'https://localhost:7250/api/User/getAllItems';
  constructor() { }
  
  http = inject(HttpClient);

  getItemList(){
    return this.http.get(this.getItemUrl)
  }
}
