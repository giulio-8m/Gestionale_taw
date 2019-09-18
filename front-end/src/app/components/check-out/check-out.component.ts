import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { Table } from 'src/app/models/table';
import { TablesService } from 'src/app/services/tables.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { MenuItem } from 'src/app/models/menu';
import { Recipt } from 'src/app/models/recipt';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  tableCode:string;
  orders:Array<Order>;
  barOrders:Array<Order>;
  kitchenOrders:Array<Order>;
  total:number;
  table:Table;
  waiters:any;
  ordersToUpdate:Array<Order>;
  cane="checked-out";
  recipt:Recipt;

  constructor(private orderService:OrdersService,private tablesService:TablesService,private userService:AuthService,private socketService:SocketService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.ordersToUpdate=new Array();
    console.log(this.ordersToUpdate.length);
    this.total=0;
    this.waiters=[];
    this.tableCode=this.route.snapshot.paramMap.get('id');
    this.recipt=new Recipt(this.tableCode,new Array(),new Array(),0,0,0);
    this.getTable(); 
    this.getBarOrders();
    this.getKitchenOrders();
    
  }

  getTable(){
    this.tablesService.getTable(this.tableCode).subscribe(
      (res)=>this.table=res,
      (err)=>console.log(err),
      ()=>{}
    );
  }

  getBarOrders(){
    this.orderService.getBarOrders('/checkout/'+this.tableCode).subscribe(
      (res)=>this.barOrders=res,
      (err)=>console.log(err),
      ()=>{
        let total:number;
        for (let  order of this.kitchenOrders){
          this.recipt.ordersBarItems.concat(order.items);
          total = order.items.reduce(function(prev, cur) {
            return prev + cur.price;
          }, 0);
        } 
        this.recipt.totalBar=total;
      }
    )
  }

  getKitchenOrders(){
    this.orderService.getKitchenOrders('/checkout/'+this.tableCode).subscribe(
      (res)=>this.kitchenOrders=res,
      (err)=>console.log(err),
      ()=>{   
        let total:number;
        for (let  order of this.kitchenOrders){
          this.recipt.ordersKitchenItems.concat(order.items);
            total = order.items.reduce(function(prev, cur) {
            return prev + cur.price;
          }, 0);
        } 
        this.recipt.totalKitchen=total;
      }
    )
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







}

  
