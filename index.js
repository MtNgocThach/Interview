var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var socket = require("socket.io")(server);
server.listen(3000);

var arrUser = new Array();

socket.on("connection", function(soc){
    // console.log(111);
    socket.on("client_send_user", function(user){
        if (arrUser.indexOf(user) >= 0) {
            socket.emit("user_exist");
        } else {
            arrUser.push(user);
            socket.emit("login_success", user);
        }
    });
});


app.get("/", function(req, res){
    res.render("index");
});