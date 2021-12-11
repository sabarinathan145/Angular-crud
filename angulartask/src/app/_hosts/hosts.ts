var host = window.location.hostname, protocol = window.location.protocol;

var Backend='';

 if(host == 'localhost'){
 	Backend = "http://"+host+":3000/";
 } else{
    Backend = "http://"+host+":3000/";
 }
 console.log(Backend);
export var BackendHost = Backend;