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


  constructor(private auth:AuthService,private socketService:SocketService) { }

  ngOnInit() {
    if(this.auth.user==null){
      if( localStorage.getItem('user_token')){
        this.auth.parseToken();
      }
    }
  }

  exit(){
    this.auth.user=null;
    localStorage.removeItem('user_token');
  }


}
