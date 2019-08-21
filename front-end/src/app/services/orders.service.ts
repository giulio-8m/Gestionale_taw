import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }


  sendBarOrder(order:Order){
    return this.http.post<any>('http://localhost:3000/orders/bar',order);
  }

  sendKitchenOrder(order:Order){
    return this.http.post<any>('http://localhost:3000/orders/kitchen',order);
  }

  getBarOrders(){
    return this.http.get<any>('http://localhost:3000/orders/bar');
  }

  getKitchenOrders(){
    return this.http.get<any>('http://localhost:3000/orders/kitchen');
  } 

  updateKitchenOrder(order:Order){
    return this.http.put<any>(`http://localhost:3000/orders/kitchen/${order._id}`,order);
  } 

  updateBarOrder(order:Order){
    return this.http.put<any>(`http://localhost:3000/orders/bar/${order._id}`,order);
  }

  deleteBarOrders(){
    return this.http.delete<any>('http://localhost:3000/orders/bar',{});

  }

  deleteKitchenOrders(){
    return this.http.delete<any>('http://localhost:3000/orders/kitchen',{});
  }

  getReadyKitchenOrders(waiter:string){
    return this.http.get<any>(`http://localhost:3000/orders/kitchen/ready/${waiter}`);
  }

  getReadyBarOrders(waiter:string){
    return this.http.get<any>(`http://localhost:3000/orders/bar/ready/${waiter}`);
  }


}
