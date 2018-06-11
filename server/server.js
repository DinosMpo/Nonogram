// modules
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const NonogramMultiplayerGame = require('./game');

const app = express();

const clientPath = __dirname + '/../client';
console.log('Serving static from ' + clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server); // auto elegxei tis sundeseis pou ginontai ston server

let waitingPlayer = null;



io.on('connection', (sock) => {
	//when a user connects to the server
	console.log('Someone connected');
	sock.emit('message', 'Hi you are connected');

	//i don't used it right now i don't have to
	sock.on('message', (text) => {
		// io.emit('message', text);
		// console.log('Sender ' + sock);
		console.log(text);
		// console.log(io);
	});

	sock.on('exit', () => {
		waitingPlayer = null;
	});

	sock.on('multiplayer', (data)=> {
		//When someone joins the waiting lobby
		// console.log(data);
		if(waitingPlayer) {
			// start game when 2 users join
			new NonogramMultiplayerGame(waitingPlayer, sock);
			console.log("Ready to play");
			waitingPlayer = null;
		}else {
			//When first user connects
			waitingPlayer = sock;
			waitingPlayer.emit('message', 'Waiting for an opponent');
		}
	});
});


server.on('error', (err) => {
	console.error("Server error : " + err);
});

server.listen(8080, () => {
	console.log("Nonogram Multiplayer game started on 8080");
});