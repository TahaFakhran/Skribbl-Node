//var socket = io.connect(); // par defaut c'est le serveur d'ou la page est chargee sinon : 
var socket = io.connect('http://localhost:5000');

var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var guess;

// sur le boutton on click
btn.addEventListener('click', function () {

    socket.emit('input', {
        user: user.value,
        message: message.value
    });

    if (message.value == guess) {
        output.innerHTML += '<p  class="correct"><strong class="correct">' + user.value + '</strong> : ' + 'guessed it right !' + '</p>';
    }

    message.value = '';

});

// pour afficher les messages
socket.on('output', function (data) {
    if (data.length > 1) {
        for (var i = 0; i < data.length; i++)
            output.innerHTML += '<p  class="light"><strong class="light">' + data[i].user + '</strong> : ' + data[i].message + '</p>';
    } else {
        if (data != '')
            output.innerHTML += '<p><strong>' + data.user + '</strong> : ' + data.message + '</p>';
    }

});

// chercher le mot guess
socket.on('guess', (data) => {
    guess = data;
});