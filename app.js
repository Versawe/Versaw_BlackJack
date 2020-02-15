// app.js is the Server. This sets up the server using express, http app, and sockets.io
var express = require('express');
var app = express();
var serv = require('http').Server(app);
users = [];
connections = [];

//The main variables are made in server then sent to all clients
var variable1 = '';
var variable2 = 0;
var variable3 = false;
var variable4 = false;
var variable5 = false;
var variable6 = false;
var variable7 = true;
var variable8 = false;
var variable9 = 0;
var variable10 = 0;
var variable11 = true;
var variable12 = false;
var variable13 = 500;
var variable14 = 0;
var variable15 = false;
var variable16 = false;
var variable17 = false;
var variable18 = false;

//listen to port connections
serv.listen(process.env.PORT || 2000);
console.log("Server Started");

//searching files for html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/Versaw_blackJack.html');
});
app.use('/client',express.static(__dirname + '/client'));

//getting sockets.io and an event listener for connections
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
		serverSend();
	});

	//new user
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
		//serverSend();
	});

	//listening for clients asking for variables and then serverSend() immedietely distributes it to all connected sockets/clients
	socket.on('client request',function(){
		serverSend();
		console.log("anything?");
	});

	
	//receiving variable data from client
	socket.on('update variable 1', function(data){
			variable1 = data.var1;
			console.log(variable1);
	});
	socket.on('update variable 2', function(data){
			variable2 = data.var2;
			console.log(variable2);
	});
	socket.on('update variable 3', function(data){
			variable3 = data.var3;
			console.log(variable3);
	});
	socket.on('update variable 4', function(data){
			variable4 = data.var4;
			console.log(variable4);
	});
	socket.on('update variable 5', function(data){
			variable5 = data.var5;
			console.log(variable5);
	});
	socket.on('update variable 6', function(data){
			variable6 = data.var6;
			console.log(variable6);
	});
	socket.on('update variable 7', function(data){
			variable7 = data.var7;
			console.log(variable7);
	});
	socket.on('update variable 8', function(data){
			variable8 = data.var8;
			console.log(variable8);
	});
	socket.on('update variable 9', function(data){
			variable9 = data.var9;
			console.log(variable9);
	});
	socket.on('update variable 10', function(data){
			variable10 = data.var10;
			console.log(variable10);
	});
	socket.on('update variable 11', function(data){
			variable11 = data.var11;
			console.log(variable11);
	});
	socket.on('update variable 12', function(data){
			variable12 = data.var12;
			console.log(variable12);
	});
	socket.on('update variable 13', function(data){
			variable13 = data.var13;
			console.log(variable13);
	});
	socket.on('update variable 14', function(data){
			variable14 = data.var14;
			console.log(variable14);
	});
	socket.on('update variable 15', function(data){
			variable15 = data.var15;
			console.log(variable15);
	});
	socket.on('update variable 16', function(data){
			variable16 = data.var16;
			console.log(variable16);
	});
	socket.on('update variable 17', function(data){
			variable17 = data.var17;
			console.log(variable17);
	});
	socket.on('update variable 18', function(data){
			variable18 = data.var18;
			console.log(variable18);
	});

	serverSend();


	function serverSend(){
		//sending variable data to other clients
	io.sockets.emit('server to client 1',{
		toclient1: variable1
	});
	io.sockets.emit('server to client 2',{
		toclient2: variable2
	});
	io.sockets.emit('server to client 3',{
		toclient3: variable3
	});
	io.sockets.emit('server to client 4',{
		toclient4: variable4
	});
	io.sockets.emit('server to client 5',{
		toclient5: variable5
	});
	io.sockets.emit('server to client 6',{
		toclient6: variable6
	});
	io.sockets.emit('server to client 7',{
		toclient7: variable7
	});
	io.sockets.emit('server to client 8',{
		toclient8: variable8
	});
	io.sockets.emit('server to client 9',{
		toclient9: variable9
	});
	io.sockets.emit('server to client 10',{
		toclient10: variable10
	});
	io.sockets.emit('server to client 11',{
		toclient11: variable11
	});
	io.sockets.emit('server to client 12',{
		toclient12: variable12
	});
	io.sockets.emit('server to client 13',{
		toclient13: variable13
	});
	io.sockets.emit('server to client 14',{
		toclient14: variable14
	});
	io.sockets.emit('server to client 15',{
		toclient15: variable15
	});
	io.sockets.emit('server to client 16',{
		toclient16: variable16
	});
	io.sockets.emit('server to client 17',{
		toclient17: variable17
	});
	io.sockets.emit('server to client 18',{
		toclient18: variable18
	});

	io.sockets.emit('text update',{

	});
	}
	
	//updates usernames for all clients when someone joins
	function updateUsernames(){
		io.sockets.emit('get users', users);
	}

});
