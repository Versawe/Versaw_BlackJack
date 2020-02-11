var express = require('express');
var app = express();
var serv = require('http').Server(app);
users = [];
connections = [];

serv.listen(process.env.PORT || 2000);
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
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconneceted %s sockets connected', connections.length);
	});

	//send message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, user: socket.username})
	});

	//new user
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('get users', users);
	}

});
