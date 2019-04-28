var socket = io("http://localhost:3000");
var name_chat = '';
$(document).ready(function () {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnSubmit").click(function () {
        socket.emit("client_send_user", $("#user_login").val());
    });

    $("#btn_chat").click(function () {
        socket.emit("user_send_mess", $("#txt_chat").val());
        $("#txt_chat").val("");
    });

    if(name_chat != ''){
        $("#loginForm").html('');
    }
});

socket.on("login_success", function (data) {
    $("#current_user").html(data);
    name_chat = data;
    $("#form-inline").hide();
    $("#chatForm").show();
});

socket.on("login_false", function (data) {
    alert("User name have used in chatbox");
});

socket.on("server_list_user", function (data) {
    $(".list_user").html("");
    data.forEach(function (element) {
        $(".list_user").append("<li class='user_in_list'>" + element + "</li>");
    });
});

socket.on("server_send_chat", function (data) {
    if (name_chat == data.user) {
        $("#main_chat").append("<div class='w-100 text-right pl-2 pr-2 chat_contain text-white'>" + data.user + ": " + data.mess + "</div>");
    } else {
        $("#main_chat").append("<div class='w-100 text-left pl-2 pr-2 chat_contain'>" + data.user + ": " + data.mess + "</div>");
    }
});