var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var socket = require("socket.io")(server);
server.listen(3000);

var arrUser = [];

socket.on("connection", function (soc) {
    soc.on("client_send_user", function (user) {
        if (arrUser.indexOf(user) >= 0) {
            soc.emit("login_false");
        } else {
            arrUser.push(user);
            soc.userName = user;
            soc.emit("login_success", user);
            socket.sockets.emit("server_list_user", arrUser);
        }
    });

    soc.on("user_send_mess", function (mess) {
        socket.sockets.emit("server_send_chat", { user: soc.userName, mess: mess });
    });
});


app.get("/", function (req, res) {
    res.render("index");
});