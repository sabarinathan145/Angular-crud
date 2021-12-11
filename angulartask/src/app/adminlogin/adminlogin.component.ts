import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  admindata:any = {};

  constructor(private service : ServiceService,
              private toastr: ToastrService,
              private activatedroute: ActivatedRoute,
              public router: Router,) { }

  ngOnInit(): void {
    if(localStorage.getItem('adminlogin') == "true"){
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/admin_login']);
    }
  }

  adminsubmit(adminloginform:NgForm){
    var path = 'user/loginadmin';
    var carrydata = {
      "name" : this.admindata.name,
      "password" : this.admindata.password
    }
    console.log(carrydata);
    this.service.postData(path,carrydata).subscribe(data => {
      console.log(data);
      if(data.status == 200){
        this.toastr.success('Logged In Successfully',"Success");
        localStorage.setItem('adminlogin',"true");
        this.router.navigate(['/user']);
      } else {
        this.toastr.error(data.message);
      }
    });
  }

}
