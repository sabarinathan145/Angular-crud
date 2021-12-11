import { Injectable,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest,HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { BackendHost } from './_hosts/hosts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';   


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private router: Router, 
    private toastr:ToastrService) { 
}
url = BackendHost;

private extractData(res: Response) {
let body = res;
return body || {};
}
private handleError(error: any) {
/*console.log(error)*/
let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
/*console.log(errMsg);*/
return Observable.throw(errMsg);
}
/*  Post data to backend server */
postData(modelroute, details): Observable < any > {
var postdata = this.http.post(this.url + modelroute, details).map(this.extractData).catch(this.handleError);
return postdata;
}

/*  Get data from backend server */
getData(domain): Observable < any > {
var returndata = this.http.get(this.url + domain).map(this.extractData).catch(this.handleError);
return returndata;
}
/* Put / update data to backend server */
putData(modelroute, details): Observable < any > {
var updatedata = this.http.put(this.url + modelroute, details).map(this.extractData).catch(this.handleError);
return updatedata;
}
/* Delete data from backend server*/
delData(modelroute, details): Observable < any > {
var deletedata = this.http.delete(this.url + modelroute, details);
return deletedata;
}


checkLoginadmin(){
  if(localStorage.getItem('adminlogin') == "true"){
      return true;
  }
    else {
        return false;
        this.router.navigate(['/admin_login']);
    } 
}

startLoader():void{
this.ngxService.start(); 
}
stopLoader(){
this.ngxService.stop(); 
}

}
