import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthguardService } from './services/authguard.service';
import { HomeComponent } from './components/home/home.component';
import { TablesComponent } from './components/tables/tables.component';
import { OrderComponent } from './components/order/order.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { BarComponent } from './components/bar/bar.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';


const routes: Routes = [

  {path: '', component: HomeComponent,canActivate:[AuthguardService]},
  {path: 'bar',component:BarComponent,canActivate:[AuthguardService]},
  {path: 'kitchen',component:KitchenComponent,canActivate:[AuthguardService]},
  {path: 'tables',component:TablesComponent,canActivate:[AuthguardService]},
  {path: 'orders/:id',component:OrderComponent,canActivate:[AuthguardService]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'unauthorized',component:UnauthorizedComponent},
  {path: '**', component: HomeComponent,canActivate:[AuthguardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const RoutingComponents=[
  SignInComponent,
  SignUpComponent,
  HomeComponent,
  TablesComponent,
  OrderComponent,
  KitchenComponent,
  BarComponent,
  UnauthorizedComponent
];