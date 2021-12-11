import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private service : ServiceService,
                private router : Router){

    }

    canActivate() {
      var check = localStorage.getItem('UserLoggedin');
      if(typeof check == "string"){
        console.log("true");
        return true;
      } else {
        return false;
        console.log("false");
        this.router.navigate(['/']);
      }
    }  
  
}
