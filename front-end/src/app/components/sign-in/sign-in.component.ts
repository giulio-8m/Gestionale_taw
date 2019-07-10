import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user:User;

  constructor() { }

  ngOnInit() {
    this.user=new User();
    console.log(this.user.username+" "+
                this.user.password+" "+
                this.user.role+" "+
                this.user.admin);
    this.user.canta();
  }

  public submit(){
    console.log(this.user.username+" "+
                this.user.password+" "+
                this.user.role+" "+
                this.user.admin);
  }


}
