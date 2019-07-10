import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSetService implements HttpInterceptor{

  constructor(private auth:AuthService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var tk=this.auth.getToken();
    if (tk) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${tk}`
            }
        });
    }

    return next.handle(request);
  }

}
