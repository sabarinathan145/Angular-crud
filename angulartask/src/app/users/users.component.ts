import { Component, OnInit, ViewChild,Renderer2 ,OnDestroy,AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  table_data:any = {};
  datatable:any = [];
  constructor(private service:ServiceService,
              private http: HttpClient, 
              private renderer: Renderer2, 
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {

  $(document).off('click','.delClass');
  $(document).on('click','.delClass',(data:any)=>{
    if(data.target['id']){
      this.faqdelete(data.target['id']);

      var FaqName = $('#'+'F'+data.target['id']).text();

    }
  });


    var _this = this;
    this.dtOptions = {
      columns: [{
        title: 'S.No',
      },{
        title: 'Name',
      },{
        title: 'Phone Number'
      },{
        title: 'Address',
      },{
        title: 'City'
      },{
        title: 'State'
      },{
        title: 'Action',
      }],
    // dom:'Bftrip',
    // buttons:[
    // 'csv'
    // ]
    };

    this.service.startLoader();
        var path = 'user/getuserdetails';
	      this.service.getData(path).subscribe(data=>{
	        console.log(data,"getalluserdetails");
	        if(data != undefined){
	          if(data.status == 200){
	            data = data.Data;
	            this.table_data = data;
              console.log(this.table_data,"this.table_Data");
              for(let i=0; i<this.table_data.length;i++){
                if(this.table_data[i].name === "Admin"){
                } else {
                  this.datatable.push(this.table_data[i]);
                }
              }
              console.log(this.table_data);
	            this.service.stopLoader();
	            this.rerender();
	          }else{
	            this.service.stopLoader();
	            console.log("Error");
	          }
	        } else {
	          this.service.stopLoader();
	        }
	      });

  }

  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  
  faqdelete(id){
    
    if(id != ''){
      var data = {
        "_id":id
      };
      var r = confirm("Are you sure want to Delete?");
      if(r == true){
      var path = 'user/deleteuser/' + id;
      this.service.startLoader();
      this.service.postData(path,data).subscribe(data=>{
        if(data.status == 200){
           this.service.stopLoader();
          this.toastr.success("Data Deleted Successfully");
          this.ngOnInit();
        }else{
           this.service.stopLoader();
          this.toastr.error("Failed to delete data");
        }
      });
    }else{
      this.service.stopLoader();
    }
  } else {
    this.service.stopLoader();
      this.toastr.error("Invalid ID")
  }
  }


}
