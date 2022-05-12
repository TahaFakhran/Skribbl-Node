//var socket = io.connect(); // par defaut c'est le serveur d'ou la page est chargee sinon : 
var socket = io.connect('http://localhost:5000');

var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');

btn.addEventListener('click', function() {
    socket.emit('input', {
        user: user.value,
        message: message.value
    });
});
socket.on('output', function(data) {
    console.log(data);
    if (data.length > 1) {
        for (var i = 0; i < data.length; i++)
            output.innerHTML += '<p  class="light"><strong class="light">' + data[i].user + '</strong> : ' + data[i].message + '</p>';
    } else {
        if (data != '')
            output.innerHTML += '<p><strong>' + data.user + '</strong> : ' + data.message + '</p>';
    }
});