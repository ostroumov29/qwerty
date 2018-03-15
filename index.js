var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function(req,res){
    res.sendFile(__dirname+'/style.css');
});
app.get('/socket.io.js', function(req,res){
    res.sendFile(__dirname+'/socket.io.js');
});
app.get('/jquery-1.11.1.js', function(req,res){
    res.sendFile(__dirname+'/jquery-1.11.1.js');
});

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(3000, function(){
    console.log('localhost:3000');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg, id, now_string){
        io.sockets.emit('chat message', msg, id, now_string);
    });
});