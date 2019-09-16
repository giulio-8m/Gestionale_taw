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

  chart:any;
  stats=[];


  constructor(private usersService:AuthService,private socketService:SocketService) { }

  ngOnInit() {
    this.totalServices=0;
    this.totalDishes=0;
    this.totalDrinks=0;
    
    this.getWaiters();
    this.getBarMans();
    this.getChefs();
    this.getDesks();


    this.socketService.socket.on('update_users',()=>{
      this.getWaiters();
      this.getBarMans();
      this.getChefs();
      this.getDesks();
    });
    
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (res)=>this.users=res,
      (err)=>console.log(err),
      ()=>{
        console.log(this.users);
        for(let i=0;i<this.users.length;i++){
          if(this.users[i].role=="Cameriere"){
            this.totalServices+=this.users[i].completedjobs;
          }else if(this.users[i].role=="Cuoco"){
            this.totalDishes+=this.users[i].completedjobs;
          }else if(this.users[i].role=="Barista"){
            this.totalDrinks+=this.users[i].completedjobs;
          }else{
            console.log("cassa");
          }
        }
      }
    );
  }


  getWaiters(){
    this.usersService.getUsers('?role=Cameriere').subscribe(
      (res)=>this.waiters=res,
      (err)=>console.log(err),
      ()=>console.log("done")
    )
  }

  getChefs(){
    this.usersService.getUsers('?role=Cuoco').subscribe(
      (res)=>this.chefs=res,
      (err)=>console.log(err),
      ()=>console.log("done")
    )
  }

  getBarMans(){
    this.usersService.getUsers('?role=Barista').subscribe(
      (res)=>this.barMans=res,
      (err)=>console.log(err),
      ()=>console.log("done")
    )
  }


  getDesks(){
    this.usersService.getUsers('?role=Cassa').subscribe(
      (res)=>this.desks=res,
      (err)=>console.log(err),
      ()=>console.log("done")
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
      console.log("Cassa");
    }
  }

  initChart(id:string,role:string,completedjobs:number){
      console.log(id+" "+completedjobs);
      this.stats=[completedjobs+10,100];

      this.chart = new Chart(<HTMLCanvasElement>document.getElementById(id), {
      type: 'doughnut',
      data: {
        labels: ["User", "Total"],
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
      this.getUsers();}
    );

    
  }

}
