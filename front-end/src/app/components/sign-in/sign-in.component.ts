import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user:User;
  public errorMessage:string;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.user=new User(null,null,null,null,null);
    this.errorMessage=null;
  }

  public submit(){
    this.auth.signIn(this.user).subscribe(
      (res) => { /* Nothing to do */ },
      (error) => {
        this.errorMessage=error.statusText;
        console.log(this.errorMessage);
      },
    );

  }


}
