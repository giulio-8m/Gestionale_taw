import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  getMenu(){
    return this.http.get<any>('http://localhost:3000/menu');
  }

  getFirstDishes(){
    return this.http.get<any>('http://localhost:3000/menu/first-dishes');
  }

  getSecondDishes(){
    return this.http.get<any>('http://localhost:3000/menu/second-dishes');
  }

  getDrinks(){
    return this.http.get<any>('http://localhost:3000/menu/drinks');
  }

  generateItemMenu(item){
    return this.http.post<any>('http://localhost:3000/menu/generateItem',item);
  }


}

