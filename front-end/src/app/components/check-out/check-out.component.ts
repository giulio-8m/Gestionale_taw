import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  tableCode:string;
  kitchenOrders:Array<Order>;
  barOrders:Array<Order>;
  constructor(private orderService:OrdersService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.tableCode=this.route.snapshot.paramMap.get('id');
    this.orderService.getKitchenOrders('?table='+this.tableCode).subscribe(
      (res)=>this.kitchenOrders=res,
      (err)=>console.log(err),
      ()=>console.log("done")
    );
    this.orderService.getBarOrders('?table='+this.tableCode).subscribe(
      (res)=>this.barOrders=res,
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }


}
