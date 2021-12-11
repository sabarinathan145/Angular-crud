import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  
  constructor(private service : ServiceService,
    private router : Router){

}

canActivate() {


  if(localStorage.getItem('adminlogin') == "true") {      
      return true;     
    } else {
      console.log("adminlogin");
      this.router.navigate(['/admin_login']);
    return false;
  }

}  

  
}
