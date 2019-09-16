import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  messages:Array<any>;

  constructor(private toastr: ToastrService,private socketService:SocketService,private userService:AuthService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.messages=null;

    if(this.userService.user && this.userService.user.role=="Cameriere"){
      console.log(" tost cameriere");
      this.getKitchenMessages();
      this.getBarMessages();
      this.socketService.socket.on('update_kitchenMessages',()=>{
        this.getKitchenMessages();
      });
      this.socketService.socket.on('update_barMessages',()=>{
        this.getBarMessages();
      })
    }
  }

  getKitchenMessages(){
    this.ordersService.getKitchenOrders('?waiter='+this.userService.user.username).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{
        console.log("toaasasstiss");
        console.log(this.messages);
        for(let i=0;i<this.messages.length;i++){
          console.log(this.messages[i]);
          if(this.messages[i].status=="completed" ){
            this.pop(this.messages[i],"Kitchen");
          }
        }
      }
    );
  }

  getBarMessages(){
    this.ordersService.getBarOrders('?waiter='+this.userService.user.username).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{
        console.log("toaasasstiss");
        console.log(this.messages);
        for(let i=0;i<this.messages.length;i++){
          console.log(this.messages[i]);
          if(this.messages[i].status=="completed" ){
            this.pop(this.messages[i],"Bar");
          }
        }
      }
    );
  }

  pop(order:Order,type:string){
    let orderNumber:number;
    if(type=="Kitchen"){
      orderNumber=order.kitchenOrderNumber;
    }else{
      orderNumber=order.barOrderNumber;
    }
    this.toastr.success('Table : '+order.table, 'Order '+ orderNumber+ ' from '+type+' ready',{
      disableTimeOut: true
    }).onTap.subscribe(
      ()=>{
        if(type=="Kitchen"){
          order.status="delivered";
          this.ordersService.updateKitchenOrder(order).subscribe(
            (res)=>console.log(res),
            (err)=>console.log(err),
            ()=>console.log("done")
          );
        }else{
          order.status="delivered";
          this.ordersService.updateBarOrder(order).subscribe(
            (res)=>console.log(res),
            (err)=>console.log(err),
            ()=>console.log("done")
          );
        }
      }
    );
  }


}
