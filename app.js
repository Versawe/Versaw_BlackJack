var express = require('express');
var app = express();
var serv = require('http').Server(app);
users = [];
connections = [];

serv.listen(2000);
console.log("Server Started");

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/Versaw_blackJack.html');
});
app.use('/client',express.static(__dirname + '/client'));


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected %s sockets connected', connections.length);

	//disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket),1);
	console.log('Disconneceted %s sockets connected', connections.length);
	});

	//send message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data})
	});
	
});
