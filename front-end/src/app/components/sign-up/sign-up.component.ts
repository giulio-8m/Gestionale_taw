import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  passwordConfirmation:string;
  errorMessage:string;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.user=new User();
    this.passwordConfirmation=null;

  }

  public submit(){
    this.auth.signUp(this.user).subscribe(
      (res) => { /* Nothing to do */ },
      (error) => {
        this.errorMessage=error.statusText;
        console.log(this.errorMessage);
      },
    );
  }

  passwordMatching():boolean{
  
    return this.user.password === this.passwordConfirmation;
  }


}
