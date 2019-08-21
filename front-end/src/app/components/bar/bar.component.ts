import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MenuItem } from 'src/app/models/menu';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  orders:Array<Order>;

  constructor(private socketService:SocketService,private ordersService:OrdersService) { }

  ngOnInit() {

    this.barOrders();

    this.socketService.socket.on('update_barOrders',()=>{
      console.log("arrivato messaggio bar socket");
      this.barOrders();
    })

  }

  barOrders(){
    this.ordersService.getBarOrders().subscribe(
      (res)=>this.orders=res,
      (err)=>console.log(err),
      ()=>{
        
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
        console.log("heere");

        let value=order.status;
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
    this.ordersService.updateBarOrder(order).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
    this.socketService.socket.emit('barOrder');
  }

  finish(dish:MenuItem,order:Order){

    dish.status="finish";

    let prop:number=100/order.items.length;
    order.status+=prop;
    this.update(order);

    this.ordersService.updateBarOrder(order).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
    this.socketService.socket.emit('barOrder');

  }



}
  