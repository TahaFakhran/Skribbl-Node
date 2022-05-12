const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var socket = require("socket.io");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

var server = app.listen(port, function () {
    console.log('Server is listening on port : ' + port);
});
var io = socket(server);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
var userNum = 0;
var newUsers = [];
io.on('connection', function (socket) {
    newUsers.push(socket);
    console.log('A user has connected');
    userNum++;

    if (userNum > 1) {
        socket.broadcast.emit('get-canvas');
        socket.on('send-canvas', function (imgUrl) {
            for (var i = 0; i < newUsers.length; i++) {
                var thisSocket = newUsers[i];
                thisSocket.emit('receive-canvas', imgUrl);
            }
            newUsers = [];
        });
        console.log(userNum);
    }

    socket.on('disconnect', function () {
        console.log('A user has disconnected');
        userNum--;
    });
    socket.on('first-draw', function (drawObject) {
        socket.broadcast.emit('first-draw', drawObject);
    });
});

