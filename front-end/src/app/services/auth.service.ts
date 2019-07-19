import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User;

  constructor(private http:HttpClient, private router:Router,) { 
    this.user=new User();
  }  

  
  signUp(user:User){    
    return this.http.post<any>(`http://localhost:3000/users/sign-up`, user)
    .pipe(
      tap(res => {
        localStorage.setItem('user_token', res);

        this.parseToken();
        this.router.navigate(['']);
      })
    );
  }

  signIn(user:User){    
    return this.http.post<any>(`http://localhost:3000/users/sign-in`, user)
    .pipe(
      tap(res => {
      localStorage.setItem('user_token', res);
        this.parseToken();
        this.router.navigate(['']);
      })
    );
  }

  isLogged() {
      return true;
  }

  getUsers(){
    return this.http.get<any>('http://localhost:3000/users/all');
  }

  getToken(){
    if(localStorage.getItem('user_token') !=null){
      return localStorage.getItem('user_token');
    } else {
      return null;
    }
  }

  
  parseToken(){
    let token=this.getToken();
    if(token){
      var decoded = jwt_decode(token);
      console.log(decoded);
    }
  }

}

