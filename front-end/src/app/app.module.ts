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
import { ToastComponent } from './components/toast/toast.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { OrdersService } from './services/orders.service';
import { TablesService } from './services/tables.service';
import { SocketService } from './services/socket.service';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents,
    ToastComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({positionClass: 'toast-top-right'}) // ToastrModule added
  ],
  providers: [
    AuthService,
    OrdersService,
    TablesService,
    SocketService,
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

