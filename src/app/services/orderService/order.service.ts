import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderPost } from 'src/app/models/OrderPost';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  makeOrder(order:OrderPost){
    return this.http.post("http://localhost:3006/order",order)
  }
}
