import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Dish} from 'src/app/models/Dish';
import { Drink } from 'src/app/models/Drink';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dishList:boolean;

  firstDishes:Array<Dish>;
  secondDishes:Array<Dish>;
  drinks:Array<Drink>;
  name:string;
  amount:number;

  constructor(orders:OrdersService) { }

  ngOnInit() {
    this.dishList=true;
    this.name=null;
    this.amount=0;
    this.firstDishes=new Array();
    this.secondDishes=new Array();
    this.drinks=new Array();
  }

  add(event){
    this.amount+=1;
  }

  remove(event){
    if(this.amount>0)
    this.amount-=1;
  }

  pushDishes(event){
    

  }

  pushDrinks(event){
    
  }


}
