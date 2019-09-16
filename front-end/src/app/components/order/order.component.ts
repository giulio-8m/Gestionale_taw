import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { MenuItem } from 'src/app/models/menu';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 
  tableCode:string;
  firstDishes:Array<MenuItem>;
  secondDishes:Array<MenuItem>;
  drinks:Array<MenuItem>;

  constructor(private socketService:SocketService,private authService:AuthService,private ordersService:OrdersService,private menuService:MenuService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.tableCode=this.route.snapshot.paramMap.get('id');
    this.menuService.getFirstDishes().subscribe(
      (res)=>{this.firstDishes=res},
      (err)=>console.log(err),
      ()=>{console.log("done");},
    );
    this.menuService.getSecondDishes().subscribe(
      (res)=>{this.secondDishes=res},
      (err)=>console.log(err),
      ()=>console.log("done"),
    );
    this.menuService.getDrinks().subscribe(
      (res)=>{this.drinks=res;
              console.log(this.drinks);
        },
      (err)=>console.log(err),
      ()=>console.log("done"),
    );

  }

  add(item:MenuItem){
    if(item.amount){
      item.amount+=1;
    }else{
      item.amount=0;
      item.amount+=1;
    }
     
  }

  remove(item:MenuItem){
    if(item.amount>0) 
      item.amount-=1;
  }

  sendOrder(){

    let orderFoods:Order=new Order(this.tableCode,this.authService.user.username);

    for(let i=0;i<this.firstDishes.length;i++){
      if(this.firstDishes[i].amount && this.firstDishes[i].amount>0){
        this.firstDishes[i].status="start";
        orderFoods.items.push(this.firstDishes[i]);
      }
    }

    for(let i=0;i<this.secondDishes.length;i++){
      if(this.secondDishes[i].amount && this.secondDishes[i].amount>0){
        this.secondDishes[i].status="start";
        orderFoods.items.push(this.secondDishes[i]);
      }
    }

    let orderDrinks:Order=new Order(this.tableCode,this.authService.user.username);

    for(let i=0;i<this.drinks.length;i++){
      if(this.drinks[i].amount && this.drinks[i].amount>0){
        this.drinks[i].status="start";
        orderDrinks.items.push(this.drinks[i]);
      }
    }

    if(orderFoods.items.length>=1){
      this.ordersService.sendKitchenOrder(orderFoods).subscribe(
        (res)=>console.log(res),
        (err)=>console.log(err),
        ()=>{this.socketService.socket.emit('kitchenOrder');}

      );
      this.socketService.socket.emit('kitchenOrder');
    }
    if(orderDrinks.items.length>=1){
      this.ordersService.sendBarOrder(orderDrinks).subscribe(
        (res)=>console.log(res),
        (err)=>console.log(err),
        ()=>{this.socketService.socket.emit('barOrder');}
      );
    }

  }

  eraseOrder(){
    console.log("erasing");
  }


}
