import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
    if(localStorage.getItem('adminlogin') == "true"){
      localStorage.removeItem('adminlogin');
      this.router.navigate(['/admin_login']);
    } else if((localStorage.getItem('UserLoggedin') != '') && (typeof localStorage.getItem('UserLoggedin') == "string")){
        localStorage.removeItem('UserLoggedin');
        this.router.navigate(['/']);
    }
    
  }

}
