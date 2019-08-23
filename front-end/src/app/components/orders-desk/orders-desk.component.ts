import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SocketService } from 'src/app/services/socket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItem } from 'src/app/models/menu';
import * as $ from 'jquery';

@Component({
  selector: 'app-orders-desk',
  templateUrl: './orders-desk.component.html',
  styleUrls: ['./orders-desk.component.css']
})
export class OrdersDeskComponent implements OnInit {

  orders:Array<Order>;

  constructor(private socketService:SocketService,private ordersService:OrdersService,private usersService:AuthService) { }

  ngOnInit() {

    this.getOrders();
    this.socketService.socket.on('update_kitchenOrders',()=>{
      this.getOrders();
    })

    this.socketService.socket.on('update_barOrders',()=>{
      this.getOrders();
    })

  }

  getOrders(){
    this.ordersService.getOrders().subscribe(
      (res)=>this.orders=res,
      (err)=>console.log(err),
      ()=>{
        console.log(this.orders);
      }
    );
  }

  

  ngAfterViewChecked(){
    if(this.orders)
      for(let i=0;i<this.orders.length;i++){
        this.update(this.orders[i]);
        this.orders[i].items.sort( function(a:MenuItem,b:MenuItem){
          if(a.preparationTime>b.preparationTime){    
            return -1;
          }
          else if(a.preparationTime==b.preparationTime){
            return 0;
          }
          else{
            return 1;
          }
        });
      }
  }


  update(order:Order){
    let progressBar:string='#'+order._id;
    console.log(progressBar);
      $(progressBar).find(".progress").each(function() {
        console.log("heeeree");
        let value=order.progress;
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');
    
          if (value <= 50) {
            right.css('transform', 'rotate(' + (value / 100 * 360) + 'deg)')
          } else {
            right.css('transform', 'rotate(180deg)')
            left.css('transform', 'rotate(' + ((value-50) / 100 * 360) + 'deg)')
          }
        });
  }


  statusCheck(dish:MenuItem){
    if(dish.status=="start"){
      return 1;
    }else if(dish.status=="cooking"){
      return 2;
    }
    else{
      return 3;
    }

  }

  start(dish:MenuItem,order:Order){
    dish.status="cooking";
    this.ordersService.updateKitchenOrder(order).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
    this.socketService.socket.emit('kitchenOrder');
  }

  finish(dish:MenuItem,order:Order){

    dish.status="finish";
    let prop:number=100/order.items.length;
    order.progress+=prop;
    this.update(order);
    this.ordersService.updateKitchenOrder(order).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.usersService.updateJobs(this.usersService.user.username,1).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.socketService.socket.emit('kitchenOrder');

    if(order.progress>99.9){
      this.socketService.socket.emit('kitchenOrderReady');
    }

  }



}