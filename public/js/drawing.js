$('#c0000ff').click(function () {
    drawColor = "#0000ff";
});
$('#c009fff').click(function () {
    drawColor = "#009fff";
});
$('#c0fffff').click(function () {
    drawColor = "#00ffff";
});
$('#cbfffff').click(function () {
    drawColor = "#bfffff";
});
$('#c000000').click(function () {
    drawColor = "#000000";
});
$('#c333333').click(function () {
    drawColor = "#333333";
});
$('#c666666').click(function () {
    drawColor = "#666666";
});
$('#c999999').click(function () {
    drawColor = "#999999";
});
$('#cffcc66').click(function () {
    drawColor = "#ffcc66";
});
$('#cffcc00').click(function () {
    drawColor = "#ffcc00";
});
$('#cffff00').click(function () {
    drawColor = "#ffff00";
});
$('#cffff99').click(function () {
    drawColor = "#ffff99";
});
$('#c003300').click(function () {
    drawColor = "#003300";
});
$('#c555000').click(function () {
    drawColor = "#555000";
});
$('#c00ff00').click(function () {
    drawColor = "#00ff00";
});
$('#c99ff99').click(function () {
    drawColor = "#99ff99";
});
$('#cf00000').click(function () {
    drawColor = "#f00000";
});
$('#cff6600').click(function () {
    drawColor = "#ff6600";
});
$('#cff9933').click(function () {
    drawColor = "#ff9933";
});
$('#cf5deb3').click(function () {
    drawColor = "#f5deb3";
});
$('#c330000').click(function () {
    drawColor = "#330000";
});
$('#c663300').click(function () {
    drawColor = "#663300";
});
$('#ccc6600').click(function () {
    drawColor = "#cc6600";
});
$('#cdeb887').click(function () {
    drawColor = "#deb887";
});
$('#caa0fff').click(function () {
    drawColor = "#aa0fff";
});
$('#ccc66cc').click(function () {
    drawColor = "#cc66cc";
});
$('#cff66ff').click(function () {
    drawColor = "#ff66ff";
});
$('#cff99ff').click(function () {
    drawColor = "#ff99ff";
});
$('#ce8c4e8').click(function () {
    drawColor = "#e8c4e8";
});
$('#cffffff').click(function () {
    drawColor = "#ffffff";
});
$('#2pixel').click(function () {
    drawWidth = 2;
});
$('#5pixel').click(function () {
    drawWidth = 5;
});
$('#10pixel').click(function () {
    drawWidth = 10;
});
$('#15pixel').click(function () {
    drawWidth = 15;
});
$("#reset").click(function () {
    if (userNumb == userTurn) {
    ctx.clearRect(0, 0, 500, 500);

    var imgUrl = canvas.toDataURL();
    socket.emit('send-canvas', imgUrl);
    }
});