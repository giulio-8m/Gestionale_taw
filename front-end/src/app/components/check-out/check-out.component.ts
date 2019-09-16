import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { Table } from 'src/app/models/table';
import { TablesService } from 'src/app/services/tables.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  tableCode:string;
  orders:Array<Order>;
  total:number;
  table:Table;
  waiters:any;
  ordersToUpdate:Array<Order>;

  constructor(private orderService:OrdersService,private tablesService:TablesService,private userService:AuthService,private socketService:SocketService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.ordersToUpdate=new Array();
    console.log(this.ordersToUpdate.length);
    this.total=0;
    this.waiters=[];
    this.tableCode=this.route.snapshot.paramMap.get('id');

    this.getTable(); 
    this.getOrders();
    
  }

  getTable(){
    this.tablesService.getTable(this.tableCode).subscribe(
      (res)=>this.table=res,
      (err)=>console.log(err),
      ()=>{}
    );
  }

  getOrders(){
    this.orderService.getOrders('?table='+this.tableCode).subscribe(
      (res)=>this.orders=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.orders.length;i++){
          if(this.orders[i].status!="checked-out"){
            this.ordersToUpdate.push(this.orders[i]);
            if(!this.waiters[this.orders[i].waiter_id]){
              this.waiters[this.orders[i].waiter_id]=this.orders[i].waiter_id;
            }
            for(let j=0;j<this.orders[i].items.length;j++){
              this.total+=(this.orders[i].items[j].price*this.orders[i].items[j].amount);
            }
          } 
        }
      }
    ); 
  }


  updateOrders(){
    for(let i=0;i<this.ordersToUpdate.length;i++){
        this.ordersToUpdate[i].status="checked-out";
        if(this.ordersToUpdate[i].barOrderNumber){
          this.orderService.updateBarOrder(this.ordersToUpdate[i]).subscribe(
            (res)=>console.log(res),
            (err)=>console.log(err),
            ()=>this.socketService.socket.emit('barOrder')
          );
        }
        if(this.ordersToUpdate[i].kitchenOrderNumber){
          this.orderService.updateKitchenOrder(this.ordersToUpdate[i]).subscribe(
            (res)=>console.log(res),
            (err)=>console.log(err),
            ()=>this.socketService.socket.emit('kitchenOrder')
          );
        }
      }
  }
 
  updateJobs(waiters:any){
    console.log(waiters);
    for(let waiter in waiters){
      console.log(waiter);
      this.userService.updateJobs(waiter,this.table.clientsNumber).subscribe(
        (res)=>console.log(res),
        (err)=>console.log(err),
        ()=>console.log("done")
      );
    }
  } 

  updateTable(){
    this.tablesService.bookTable(this.table.code,0).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>this.socketService.socket.emit('booked_table')
    );
  }


  checkOut(){
    console.log("checkking out");
    this.updateOrders();
    this.updateTable();
    this.updateJobs(this.waiters);
  }





}

  
