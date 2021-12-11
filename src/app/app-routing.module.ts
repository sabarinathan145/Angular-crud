import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminguardGuard } from './adminguard.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'user', component : UsersComponent,  canActivate:[AdminguardGuard] },
  {path : 'admin_login', component : AdminloginComponent},
  {path : 'edit_user', component : EdituserComponent, canActivate: [AuthGuard]},
  {path : 'add_user', component : AdduserComponent, canActivate:[AdminguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
