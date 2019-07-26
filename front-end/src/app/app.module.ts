import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { ErrorsService } from './services/errors.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthSetService } from './services/auth-set.service';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { BarComponent } from './components/bar/bar.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents,
    KitchenComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthguardService,
    {
      provide:HTTP_INTERCEPTORS,
        useClass:ErrorsService,
        multi:true 
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthSetService,
      multi:true 
    },,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

