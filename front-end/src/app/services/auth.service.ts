import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User;
  env: any;

  constructor(private http:HttpClient, private router:Router,) { 
    this.user=new User();
  }  

  
  
  signUp(user:User){
    return this.http.post<any>(`${this.env.serverUrl}/api/register`, user)
    .pipe(
      tap((res) => {
        localStorage.setItem('user_token', res.token);
        this.router.navigate(['']);
      })
    ); 
  }

  signIn(user:User){
    return this.http.post<any>(`${this.env.serverUrl}/api/login`, user)
    .pipe(
      tap(res => {
        localStorage.setItem('user_token', res.token);
        this.router.navigate(['']);
      })
    );
  }


  isLogged() {
      return true;
  }

  getToken(){
      if(localStorage.getItem('user_token') !=null){
        return localStorage.getItem('user_token');
      } else {
        return null;
      }
    }

    prova(user:User){
      
    }

}

