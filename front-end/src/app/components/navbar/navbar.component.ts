import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  open = false;


  constructor(private auth:AuthService,private socketService:SocketService) { }

  ngOnInit() {
    if(this.auth.user==null){
      if( localStorage.getItem('user_token')){
        this.auth.parseToken();
      }
    }

    $("body").click(() => {
      this.open = false;
    })
  }

  exit(){
    this.auth.user=null;
    localStorage.removeItem('user_token');
  }

  isChef(){
    if(this.auth.user && this.auth.user.role=="Cuoco"){
      return true;
    }else{
      return false;
    }
  }

  isBarman(){
    if(this.auth.user && this.auth.user.role=="Barista"){
      return true;
    }else{
      return false;
    }
  }
  
  isDesk(){
    if(this.auth.user && this.auth.user.role=="Cassa"){
      return true;
    }else{
      return false;
    }
  }

  isWaiter(){
    if(this.auth.user && this.auth.user.role=="Cameriere"){
      return true;
    }else{
      return false;
    }
  }

}
