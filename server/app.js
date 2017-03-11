var express = require('express');
var http = require('http');
var SocketIo = require('socket.io');

var app = express();
var server = http.Server(app);
var io = SocketIo(server);

var port = 9080;

app.get('/', function (req, res) {
    res.send('Welcome to Server');
});

// 监听
io.on('connection', function (socket) {
    console.log('有新链接');
});

// 启动
server.listen(port, function () {
    console.log('listening on ' + port);
});
