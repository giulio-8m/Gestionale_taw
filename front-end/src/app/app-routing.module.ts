import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthguardService } from './services/authguard.service';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [

  {path: '', component: HomeComponent,canActivate:[AuthguardService]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
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
  HomeComponent
];