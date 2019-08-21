import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate {
    
  constructor( private router: Router,private auth:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log(route.routeConfig.path);

      if(this.auth.user){
          if(this.auth.user.role=="Barista" && route.routeConfig.path=="bar"){
            return true;
          }
          if(this.auth.user.role=="Cameriere" && route.routeConfig.path=="tables" || route.routeConfig.path=="orders/:id"){
            return true;
          }
          if(this.auth.user.role=="Cuoco" && route.routeConfig.path=="kitchen"){
            return true;
          }

          if(this.auth.user.username=="cane"){
            return true;
          }

          this.router.navigate(['unauthorized']);
          return false;
      }else{
          this.router.navigate(['sign-in']);
          return false;
      }
  }
}
