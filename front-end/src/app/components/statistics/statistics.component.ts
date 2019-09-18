import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import * as Chart from 'chart.js';
import { ReciptsService } from 'src/app/services/recipts.service';
import { Recipt } from 'src/app/models/recipt';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  ordersKitchen:Array<Order>;
  ordersBar:Array<Order>;
  recipts:Array<Recipt>;
  stats=[];
  statsRecipts=[];
  chartOrders;
  chartRecipts;
  date:string;
  constructor(private socketService:SocketService,private ordersService:OrdersService,private reciptsService:ReciptsService) { }

  ngOnInit() {

    let dateS=new Date();
    this.date=dateS.getDate()+'/'+dateS.getMonth()+'/'+dateS.getFullYear();
    this.stats=[0,0];
    console.log("staats",this.stats);
    this.initChartOrders();
    this.initChartRecipts();

    this.getKitchenOrders(this.date);
    this.getBarOrders(this.date);
      this.socketService.socket.on('update_kitchenOrders',()=>{
        this.getKitchenOrders(this.date);
      })

      this.socketService.socket.on('update_barOrders',()=>{
        this.getBarOrders(this.date);
      })

  }

  getKitchenOrders(date:string){
    this.ordersService.getKitchenOrders('?date='+date).subscribe(
      (res)=>this.ordersKitchen=res,
      (err)=>console.log(err),
      ()=>{
        this.stats[0]=this.ordersKitchen.length;
        console.log(this.ordersKitchen)
        console.log("done");
        console.log(this.stats);
        this.chartOrders.update();
        this.chartRecipts.update();
      }
    );
  }

  getBarOrders(date:string){
    this.ordersService.getBarOrders('?date='+date).subscribe(
      (res)=>this.ordersBar=res,
      (err)=>console.log(err),
      ()=>{
        console.log(this.ordersBar)
        this.stats[1]=this.ordersBar.length;
        console.log("done");
        console.log(this.stats);
        this.chartOrders.update();
        this.chartRecipts.update();

      }
    );
  }


  getRecipts(){

    this.reciptsService.getRecipts('?date'+this.date).subscribe(
      (res)=>this.recipts=res,
      (err)=>console.log(err),
      ()=>{
        this.statsRecipts=[0,0];
        for(let i=0;i<this.recipts.length;i++){
          this.statsRecipts[0]+=this.recipts[i].totalKitchen;
          this.statsRecipts[1]+=this.recipts[i].totalBar;
        }
      }
    )
  }

  initChartOrders(){
  
    this.chartOrders = new Chart(<HTMLCanvasElement>document.getElementById("statsOrders"), {
    type: 'doughnut',
    data: {
      labels: ["Cucina", "Bar"],
      datasets:[
        {
          backgroundColor: ["#ffcc00", "#3e95cd"],
          data: this.stats
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Quantità ordini',
        fontSize:35
      },
      scales:{
        scaleLabel:{
          fontSize:50
        }
      } 
    }
  });
}


initChartRecipts(){
  
  this.chartRecipts = new Chart(<HTMLCanvasElement>document.getElementById("statsRecipts"), {
  type: 'doughnut',
  data: {
    labels: ["Euro cucina", "Euro bar"],
    datasets:[
      {
        backgroundColor: ["#ffcc00", "#3e95cd"],
        data: this.statsRecipts
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Guadagni',
      fontSize:35
    },
    scales:{
      scaleLabel:{
        fontSize:50
      }
    } 
  }
});
}

}
