import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DataTablesModule } from "angular-datatables";
import { BackendHost } from './_hosts/hosts';
import { ServiceService } from './service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './header/header.component';
import { AdduserComponent } from './adduser/adduser.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {  
  fgsType: SPINNER.rectangleBounce, // background spinner type
  fgsColor: "#1271A0"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    AdminloginComponent,
    EdituserComponent,
    HeaderComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataTablesModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss:true,
      maxOpened:1,
      progressBar: true
    }),
    ModalModule.forRoot(),
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
