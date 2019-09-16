import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SocketService } from 'src/app/services/socket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItem } from 'src/app/models/menu';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-desk',
  templateUrl: './orders-desk.component.html',
  styleUrls: ['./orders-desk.component.css']
})
export class OrdersDeskComponent implements OnInit {

  tableCode:String;
  orders:Array<Order>;

  constructor(private socketService:SocketService,private ordersService:OrdersService,private usersService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.tableCode=this.route.snapshot.paramMap.get('id');
    if(this.tableCode){
      this.getOrdersByTable();
      this.socketService.socket.on('update_kitchenOrders',()=>{
        this.getOrdersByTable();
      })

      this.socketService.socket.on('update_barOrders',()=>{
        this.getOrdersByTable();
      })
    }else{
      this.getOrders();
      this.socketService.socket.on('update_kitchenOrders',()=>{
        this.getOrders();
      })

      this.socketService.socket.on('update_barOrders',()=>{
        this.getOrders();
      })
    }

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

  getOrdersByTable(){
    this.ordersService.getOrders('?table='+this.tableCode).subscribe(
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
    $(progressBar).find(".progress").each(function() {
      console.log("heeeree");
      let value=order.progress;
      let left = $(this).find('.progress-left .progress-bar');
      let right = $(this).find('.progress-right .progress-bar');
  
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


}