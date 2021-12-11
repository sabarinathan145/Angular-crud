import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerData:any = {};

  constructor(private service : ServiceService,
              private toastr: ToastrService,
              private activatedroute: ActivatedRoute,
              public router: Router,) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserLoggedin') != ''){
      this.router.navigate(['/edit_user']);
    } else {
      this.router.navigate(['/']);
    }
  }

  registerSubmit(registerform:NgForm){
    var path = 'user/loginuser';
    var carrydata = {
      "name" : this.registerData.username,
      "password" : this.registerData.password
    }
    this.service.postData(path,carrydata).subscribe(data => {
      console.log(data);
      if(data.status == 200){
        this.toastr.success("Login Successful","Success");
        localStorage.setItem("UserLoggedin",JSON.stringify(data.data._id));
        this.router.navigate(['/edit_user']);
      } else {
        this.toastr.error(data.message);
      }
    });
  }

}
