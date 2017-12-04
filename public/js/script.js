$(document).ready(function(){
    console.log(":D"); 
    $("#reg").on('click', function(){
        
        
        if ($("#password").val() === $("#password_2").val()){
            console.log("registered");
        }else{
            console.log("the passwords not match "); 
        }
    });
    
    $("a.close_error_email").on('click', function(){
        $(".close_error_email").empty(); 
        
    }); 
});