import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  addedvalue:any = {};
  passid:any = {};

  constructor(private service : ServiceService,
              private toastr: ToastrService,
              private activatedroute: ActivatedRoute,
              public router: Router,) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('adminlogin') == "true"){

    } else {
      this.toastr.error("Please Login to continue", "Warning");
      this.router.navigate(['/']);
    } 

  }

  add_datasubmit(addform:NgForm){
    
    var r = confirm("Are you sure want to Add?");
    if(r == true){
    if(addform.valid){
      var path = 'user/adduser';
      var carrydata = {
        "name" : this.addedvalue.name,
        "password" : this.addedvalue.password,
        "state" : this.addedvalue.state,
        "city" : this.addedvalue.city,
        "address" : this.addedvalue.address,
        "phonenumber" : this.addedvalue.phonenumber
      };
      this.service.postData(path,carrydata).subscribe(data => {
        console.log(data);
        if(data.status == 200){
          this.toastr.success("User Added Successfully","Success");
          addform.reset();
          this.router.navigate(['/user']);
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.toastr.error('Invalid Form', "Warning");
    }
  } else {
    
  } 
  }

}
