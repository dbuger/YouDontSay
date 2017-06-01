var config = require('./config');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);

server.listen(config.serverport, config.serverip, function() {
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});

console.log("Server running @ http://" + config.serverip + ":" + config.serverport);


app.get('/',function(req , res) {
    res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('join', function (msg) {
        io.sockets.emit('message',msg);
    });

    socket.on('message', function (msg) {
        io.sockets.emit('message',msg);
    });
});

io.sockets.on('disconnect',function(socket){
    io.sockets.emit('message',"disconnected.");
});
