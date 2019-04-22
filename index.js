var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var socket = require("socket.io")(server);
server.listen(3000);

socket.on("connection", function(soc){
    console.log(111);
});

app.get("/", function(req, res){
    res.render("index");
});