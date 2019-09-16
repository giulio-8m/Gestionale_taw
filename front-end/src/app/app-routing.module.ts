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
import { DeskComponent } from './components/desk/desk.component';
import { TablesDeskComponent } from './components/tables-desk/tables-desk.component';
import { OrdersDeskComponent } from './components/orders-desk/orders-desk.component';
import { UsersComponent } from './components/users/users.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { StatisticsComponent } from './components/statistics/statistics.component'


const routes: Routes = [
  {path: '', component: HomeComponent,canActivate:[AuthguardService]},
  {path: 'bar',component:BarComponent,canActivate:[AuthguardService]},
  {path: 'kitchen',component:KitchenComponent,canActivate:[AuthguardService]},
  {path: 'tables',component:TablesComponent,canActivate:[AuthguardService]},
  {path: 'orders/:id',component:OrderComponent,canActivate:[AuthguardService]},
  {path: 'desk',component:DeskComponent,canActivate:[AuthguardService]},
  {path: 'tables-desk',component:TablesDeskComponent,canActivate:[AuthguardService]},
  {path: 'orders-desk',component:OrdersDeskComponent,canActivate:[AuthguardService]},
  {path: 'orders-desk/:id',component:OrdersDeskComponent,canActivate:[AuthguardService]},
  {path: 'users',component:UsersComponent,canActivate:[AuthguardService]},
  {path: 'check-out/:id',component:CheckOutComponent,canActivate:[AuthguardService]},
  {path: 'statistics',component:StatisticsComponent,canActivate:[AuthguardService]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent,canActivate:[AuthguardService]},
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
  UnauthorizedComponent,
  DeskComponent,
  TablesDeskComponent,
  OrdersDeskComponent,
  UsersComponent,
  CheckOutComponent,
  StatisticsComponent
];