import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  readyBarOrders:Array<Order>;
  readyKitchenOrders:Array<Order>;

  constructor(private auth:AuthService,private socketService:SocketService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.readyBarOrders=null;
    this.readyKitchenOrders=null;

    
    if(this.auth.user==null){
      if( localStorage.getItem('user_token')){
        this.auth.parseToken();
      }
    }
    if(this.auth.user && this.auth.user.role=="Cameriere"){

      this.ordersService.getKitchenOrders().subscribe(
        (res)=>{this.readyKitchenOrders=res; console.log(this.readyKitchenOrders)},
        (err)=>console.log(err),
        ()=>console.log("done")
      );

      this.ordersService.getBarOrders().subscribe(
        (res)=>{this.readyBarOrders=res;console.log(this.readyBarOrders)},
        (err)=>console.log(err),
        ()=>console.log("done")
      );


      this.socketService.socket.on('update_readyKitchenOrders',()=>{
        this.ordersService.getKitchenOrders().subscribe(
          (res)=>this.readyKitchenOrders=res,
          (err)=>console.log(err),
          ()=>console.log("done")
        );
      }); 
      this.socketService.socket.on('update_readyBarOrders',()=>{
        this.ordersService.getBarOrders().subscribe(
          (res)=>this.readyBarOrders=res,
          (err)=>console.log(err),
          ()=>console.log("done")
        );
      })
    }


  }

  exit(){
    this.auth.user=null;
    localStorage.removeItem('user_token');
  }


}
