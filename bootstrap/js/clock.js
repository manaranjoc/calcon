var main = function(){    
var f = new Date();
   
    if(f.getHours() < 10 || f.getMinutes() < 10 || f.getSeconds() < 10){
    var h;
    var m;
    var s;
    if(f.getHours() < 10){
      h = ("0" + f.getHours());
    }else{
      h = f.getHours();   
    }
    if(f.getMinutes() < 10){
      m = ("0" + f.getMinutes());              
    }else{
      m = f.getMinutes();   
    }
    if(f.getSeconds() < 10){
      s = ("0" + f.getSeconds());     
    }else{
      s = f.getSeconds();   
    }
    $("#change").html(h + ":" + m + ":" + s);
    setTimeout(main, 1000);
    }else{
      $("#change").html(f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
      setTimeout(main, 1000);
    } 
};
main();
var main2 = function(){
var f = new Date();
       $("#change2").html(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()); 
 setTimeout(main2, 10);
};
main2();