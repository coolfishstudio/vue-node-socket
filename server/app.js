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


// 在线人数
var onlineUserList = [];
// 当前在线人数
var onlineUserCount = 0;

// 监听
io.on('connection', function (socket) {
    console.log('有新链接');
    // 监听新用户进入
    socket.on('login', function (obj) {
        socket.socketId = obj.userId;
        var sign = false;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (obj.userId === onlineUserList[i].userId) {
                sign = true;
                onlineUserCount++;
                break;
            }
        }
        if (!sign) {
            onlineUserList.push(obj);
        }
        // 通知其他用户有新用户加入
        this.broadcast.emit('login', {
            onlineUserList: onlineUserList,
            onlineUserCount: onlineUserCount,
            msgUser: obj
        });
        this.emit('loginSuccess', {
            onlineUserList: onlineUserList,
            sign: 1
        });
        console.log('[加入]' + obj.userName + '加入了群聊');
    });
    // 监听用户退出
    socket.on('disconnect', function () {
        // 处理退出的用户
        var exitObj = {};
        var sign = false;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].userId === socket.socketId) {
                onlineUserList[i].userId = -1;
                exitObj = onlineUserList[i];
                sign = true;
                onlineUserCount--;
                break;
            }
        }
        if (sign) {
            onlineUserList = onlineUserList.filter(function (item) {
                return item.userId !== -1;
            });
            // 通知所有人用户退出
            this.broadcast.emit('logout', {
                onlineUserList: onlineUserList,
                onlineUserCount: onlineUserCount,
                msgUser: exitObj
            });
            console.log('[离开]' + exitObj.userName + '离开了群聊');
        }
    });
    // 监听用户发布聊天内容
    socket.on('message', function (obj) {
        obj.onlineUserList = onlineUserList;
        this.broadcast.emit('message', obj);
        console.log('[发言]' + obj.user.userName + '说 ' + obj.msg);
    });
});

// 启动
server.listen(port, function () {
    console.log('listening on ' + port);
});
