import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  passwordConfirmation:string;
  roba:string="canedidio";

  constructor() { }

  ngOnInit() {
    this.user=new User();
    this.passwordConfirmation=null;

    console.log(this.user.username+" "+
    this.user.password+" "+
    this.user.role+" "+
    this.user.admin);
  }

  public submit(){
      console.log(this.user.username+" "+
                  this.user.password+" "+
                  this.user.role+" "+
                  this.user.admin);
  }

  passwordMatching():boolean{
  
    return this.user.password === this.passwordConfirmation;
  }


}
