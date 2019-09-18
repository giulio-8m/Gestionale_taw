import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import {Chart} from 'chart.js';
import { timeout } from 'q';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Array<User>;
  waiters:Array<User>;
  chefs:Array<User>;
  barMans:Array<User>;
  desks:Array<User>;

  totalServices:number;

  totalDrinks:number;

  totalDishes:number; 
  totalCashed:number;

  chart:any;
  stats=[];


  constructor(private usersService:AuthService,private socketService:SocketService) { }

  ngOnInit() {
    this.totalServices=1;
    this.totalDishes=1;
    this.totalDrinks=1;
    this.totalCashed=1;
    
    this.getWaiters();
    this.getBarMans();
    this.getChefs();
    this.getDesks();


    this.socketService.socket.on('update_users',()=>{
      this.totalServices=0;
      this.totalDishes=0;
      this.totalDrinks=0;
      this.totalCashed=0;
      this.getWaiters();
      this.getBarMans();
      this.getChefs();
      this.getDesks();
    });
    
  }

  getWaiters(){
    this.usersService.getUsers('?role=Cameriere').subscribe(
      (res)=>this.waiters=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.waiters.length;i++){
          this.totalServices+=this.waiters[i].completedjobs;
        }
        console.log("camerieri"+this.totalServices)
      }
    )
  }

  getChefs(){
    this.usersService.getUsers('?role=Cuoco').subscribe(
      (res)=>this.chefs=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.chefs.length;i++){
          this.totalDishes+=this.chefs[i].completedjobs;
        }
        console.log("chefs"+this.totalDishes)
      }

    )
  }

  getBarMans(){
    this.usersService.getUsers('?role=Barista').subscribe(
      (res)=>this.barMans=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.barMans.length;i++){
          this.totalDrinks+=this.barMans[i].completedjobs;
        }
        console.log("baristi"+this.totalDrinks)
      }
    )
  }


  getDesks(){
    this.usersService.getUsers('?role=Cassa').subscribe(
      (res)=>this.desks=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.desks.length;i++){
          this.totalCashed+=this.desks[i].completedjobs;
        }
        console.log("cassieri"+this.totalCashed)
      }
    )
  }

  set(role:string){
    if(role=="Cameriere"){
      console.log(this.totalServices);
      return this.totalServices;
    }else if(role=="Cuoco"){
      return this.totalDishes;
    }else if(role=="Barista"){
      return this.totalDrinks;
    }else{
      return this.totalCashed;
    }
  }

  initChart(id:string,role:string,completedjobs:number){
  
      console.log(id+" "+completedjobs);
      this.stats=[];
      this.stats[0]=completedjobs;
      this.stats[1]=(this.set(role)-completedjobs);

      this.chart = new Chart(<HTMLCanvasElement>document.getElementById(id), {
      type: 'doughnut',
      data: {
        labels: ["User", "Others"],
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: this.stats
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'job completati ',
          fontSize:20
        },
        scales:{
          scaleLabel:{
            fontSize:50
          }
        } 
      }
    });
  }

  deleteUser(user:string){
    this.usersService.deleteUser(user).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>{this.socketService.socket.emit('deleted_user');
      ;}
    );

    
  }

}
