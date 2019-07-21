import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Dish} from 'src/app/models/Dish';
import { Drink } from 'src/app/models/Drink';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dishList:boolean;

  dishes:Array<Dish>;
  drinks:Array<Drink>;
  name:string;
  amount:number;

  constructor(tables:TablesService) { }

  ngOnInit() {
    this.dishList=true;
    this.name=null;
    this.amount=0;
    this.dishes=new Array();
    this.drinks=new Array();
  }

  add(event){
    this.amount+=1;
  }

  remove(event){
    if(this.amount>0)
    this.amount-=1;
  }

  pushDish(event){
    if(this.name!=null && this.amount >=1){
      this.dishes.push(new Dish(this.name,this.amount));
      this.name=null;
      this.amount=0;
    }

  }

  pushDrink(event){
    if(this.name!=null && this.amount >=1){
      this.drinks.push(new Drink(this.name,this.amount));
      this.name=null;
      this.amount=0;
    }
  }

  swap(){
    if(this.dishList){
      this.amount=0;
      this.name=null;
      this.dishList=false; 
    }else{
      this.amount=0;
      this.name=null;
      this.dishList=true;
    }
  }


}
