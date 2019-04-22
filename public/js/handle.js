var socket = io("http://localhost:3000");
$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnSubmit").click(function(){
        socket.emit("client_send_user", $("#txt_user"));
    });
});

socket.on("login_success", function(data){
    $("#current_name").html(data);
    $("#loginForm").hide();
    $("#chatForm").show();
});