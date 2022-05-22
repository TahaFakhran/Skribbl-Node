const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socket = require("socket.io");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// demarrer le serveur
var server = app.listen(port, function () {
    console.log('Server is listening on port : ' + port);
});

var io = socket(server);

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

var userNum = 0;
var newUsers = [];

//chat connection avec mongo

mongoose.connect('mongodb://localhost:27017/chatDB', { useUnifiedTopology: true, useNewUrlParser: true });
console.log('MongoDB connected...');

var Schema = mongoose.Schema;

// creation Schema du JSON Object
var chatSchema = new Schema({
    user: String,
    message: String,
    //date : { type : Date, default : Date.now } 
});

var ChatModel = mongoose.model('chat', chatSchema);

// Quand un user connect
io.on('connection', function (socket) {
    newUsers.push(socket);
    console.log('A user has connected');
    userNum++;
    //user turn
    // var randUser = Math.ceil(Math.random() * (userNum));

    // Donner les roles aux users (qui dessine et qui devine) 
    // La 1ere personne qui se connecte est celle qui dessine
    for (var i = 0; i < newUsers.length; i++) {
        socket.emit('userNumb', newUsers[i].id);
        socket.emit('userTurn', newUsers[0].id);
    }

    // Renvoyer le dessin aux restes des users
    if (userNum >= 1) {
        socket.broadcast.emit('get-canvas');
        socket.on('send-canvas', function (imgUrl) {
            for (var i = 0; i < newUsers.length; i++) {
                var thisSocket = newUsers[i];
                thisSocket.emit('receive-canvas', imgUrl);
            }
            // newUsers = [];
        });
        console.log(userNum);
    }

    // Quand un user se deconnecte
    socket.on('disconnect', function () {
        console.log('A user has disconnected');
        userNum--;

        // si tout les users sont deconnecte, on vide la liste newUsers pour redemarrer le jeux
        if (userNum == 0) {
            newUsers = [];
        }
    });

    // Quand un user dessine on envoie le canvas au reste 
    socket.on('first-draw', function (drawObject) {
        socket.broadcast.emit('first-draw', drawObject);
    });

    // chercher les messages de la base de donnees et les placer dans la section chat
    ChatModel.find({}, function (err, res) {
        //ChatModel.find({}).sort({'user': 1}).limit(10).exec(function (err, res) { });  //sorting par ordre croissant //res length 10
        //ChatModel.find({}).sort({ 'user': -1 }).limit(10).exec(function (err, res) { }); //sorting par ordre decroissant //res length 10
        if (err) {
            throw err;
        }
        socket.emit('output', res);
    });

    // Pour sauvgarder les messages dans la base de donnees
    socket.on('input', function (data) {
        ChatModel.create(data, function () {
            io.emit('output', data);
        });
    });

    // envoyer le mot guess
    socket.on('guess', (data) => {
        io.emit('guess', data);
    });
});
