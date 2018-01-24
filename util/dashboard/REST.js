/*
 * File holding all REST API methods for front end dashboard
 */



 function getSometing(foo){

     var xhr = new XMLHttpRequest();
    
     xhr.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
             var response = JSON.parse(xhr.responseText);
         }
     };

     xhr.open("GET", foo, bar);
     xhr.send();
    }
}













































