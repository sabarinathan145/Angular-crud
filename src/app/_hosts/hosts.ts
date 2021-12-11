var host = window.location.hostname, protocol = window.location.protocol;

var Backend='';

 if(host == 'localhost'){
 	Backend = "http://"+host+":3000/";
 }
  else{
    Backend = "https://ng-back.herokuapp.com/";
 }
 console.log(Backend);
export var BackendHost = Backend;
