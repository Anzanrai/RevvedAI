var express = require("express");
var app = express();


var http = require("https").createServer(app)
var io = require("socket.io")(http)


http.listen(3000, function(){
    console.log("Successfully connected Node Server")
    io.on("connection", function(socket){
        console.log("Auth value: "+socket.id);
        socket.on("sendNotification", function(details){
            socket.broadcast.emit("sendNotification",details);

        });
        
    });
});