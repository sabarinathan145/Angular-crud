import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  editedvalue:any = {};
  passid:any = {};
  modalRef: BsModalRef;

  constructor(private service : ServiceService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private activatedroute: ActivatedRoute,
              public router: Router,) { }

  ngOnInit(): void {

    this.passid = localStorage.getItem('UserLoggedin' || '');

    var datapath = 'user/getonedata/' + JSON.parse(this.passid);
    this.service.postData(datapath,{}).subscribe(data => {
      this.editedvalue = data.data;
    });
  }

  editdatasubmit(editform:NgForm){
    
    var r = confirm("Are you sure want to update?");
    if(r == true){
    if(editform.valid){
      var path = 'user/updatedata/' + JSON.parse(this.passid);
      var carrydata = {
        "name" : this.editedvalue.name,
        "password" : this.editedvalue.password,
        "state" : this.editedvalue.state,
        "city" : this.editedvalue.city,
        "address" : this.editedvalue.address,
        "phonenumber" : this.editedvalue.phonenumber
      };
      this.service.postData(path,carrydata).subscribe(data => {
        console.log(data);
        if(data.status == 200){
          this.toastr.success("Your Details Updated Successfully","Success");
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
