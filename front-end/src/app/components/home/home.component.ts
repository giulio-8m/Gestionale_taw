import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TablesService } from 'src/app/services/tables.service';
import { MenuItem } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cane="diocane";

  name:string;
  price:number;
  preparationTime:number;
  type:string;

  menu:MenuItem;
  
  constructor(private auth:AuthService,private tables:TablesService,private menus:MenuService,private orders:OrdersService) { }

  ngOnInit() {
    this.orders.getBarOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.orders.getKitchenOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }

  getUsers(){
    this.auth.getUsers().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err)
    );
  }

  generateTable(){
    this.tables.generateTable().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }

  generateItem(){
    this.menu=new MenuItem(this.type,this.name,this.price,this.preparationTime);
    console.log(this.menu);
    this.menus.generateItemMenu(this.menu).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>{
          console.log("done");
          this.menu=null;
          this.name=null;
          this.price=null;
          this.preparationTime=null;
          this.type=null;

        }
    );
  }

  getBarOrders(){
    this.orders.getBarOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }

  getKitchenOrders(){
    this.orders.getKitchenOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }

  deleteKitchenOrders(){
    this.orders.deleteKitchenOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    )
  }

  deleteBarOrders(){
    this.orders.deleteBarOrders().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    )
  }
  

}
