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
const io = socketio(server);

// server connection
let waitingPlayer = null;
let clients = 0;
let roomno = 1;

//otan kapoios mpainei sto site
io.on('connection', (sock) => {
	//when a user connects to the server
	let inRoom = 0;
	clients ++;
	console.log('Someone connected');	
	sock.emit('message', 'Hi you are connected'); // i don't used
	
	sock.join('all');

	//i don't used it right now i don't have to
	sock.on('message', (text) => {
		// io.emit('message', text);
		// console.log('Sender ' + sock);
		console.log(text);
		// console.log(io);
	});

	sock.on('multiplayer', (data)=> {
		//An to room uparxei kai exei parapanw apo 1 atoma
		if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
			 roomno++;
			 // console.log(roomno);
		}
		//When someone joins the waiting lobby
		if(waitingPlayer) { // if there is a player that waits to play
			// start game when 2 users join
			inRoom = roomno;
			sock.leave('all');
			sock.join('room-'+inRoom);
			// var game = new NonogramMultiplayerGame(waitingPlayer, sock, inRoom);
			console.log("Ready to play");

			// io.to("room-"+game._roomId).emit('event', "eee");
			let game = {};
			game.player1 = waitingPlayer.id;
			game.player2 = sock.id;
			game.room 	 = inRoom;
			io.to("room-"+inRoom).emit('multiplayer', game);
			waitingPlayer = null;
			sock.emit('wait');
			sock.to("room-"+inRoom).broadcast.emit('can play');
		}else {
			// if(game) {
			// 	game = null;
			// }

			inRoom = roomno;
			console.log(inRoom);

			sock.leave('all');
			sock.join("room-"+inRoom);
			
			//When first user connects
			waitingPlayer = sock;
			waitingPlayer.emit('room', inRoom);
			waitingPlayer.emit('message', 'Waiting for an opponent');
		}
	});

	sock.on('correct', (data) => {
		io.to("room-"+inRoom).emit('correct');
		io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
		io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
		io.nsps['/'].sockets[data.player1].join('all');
		io.nsps['/'].sockets[data.player2].join('all');
	});

	sock.on('empty grid', (data) => {
		sock.to("room-"+inRoom).broadcast.emit('update', data);
	});

	sock.on('end-turn', () => {
		sock.emit('end-turn');
		sock.to("room-"+inRoom).broadcast.emit('can play');
	});

	sock.on('exit-multiplayer', (data) => {
		// console.log("dsdsds");
		// if(sock.id === data.player1) {
		// 	data._player2.emit('exit-multiplayer', "Player 1 left the lobby");
		// 	data._player1.leave('room-'+this._roomId);
		// 	data._player1.join('all');
		// 	data._player2.leave('room-'+this._roomId);
		// 	data._player2.join('all');
		// }else{
		// 	data._player1.emit('exit-multiplayer', "Player 2 left the lobby");
		// 	data._player1.leave('room-'+this._roomId);
		// 	data._player1.join('all');
		// 	data._player2.leave('room-'+this._roomId);
		// 	data._player2.join('all');
		// }

		// console.log(io.nsps['/'].sockets[sock.id].leave('room-'+inRoom));

		io.nsps['/'].sockets[sock.id].leave('room-'+inRoom);

		if(sock.id === data.player1) {
			io.to(data.player2).emit('exit-multiplayer', 'Player 1 left the lobby...');
			// io.to(data.player1).leave('room-'+data.room);
			// io.to(data.player2).leave('room-'+data.room);
			io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player1].join('all');
			io.nsps['/'].sockets[data.player2].join('all');
		}else if(sock.id === data.player2) {
			io.to(data.player1).emit('exit-multiplayer','Player 2 left the lobby...');
			// io.to(data.player2).leave('room-'+data.room);
			// io.to(data.player1).leave('room-'+data.room);
			io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player2].join('all');
			io.nsps['/'].sockets[data.player1].join('all');
		}

	});

	sock.on('exit', () => {
		waitingPlayer = null;
		sock.leave("room-"+inRoom);
	});

	//Message to all connected clients
	io.sockets.emit('broadcast', { description: 'Players online: ' + clients });

	sock.on('disconnect', () => {
		clients --;
	    console.log('user disconnected');
		io.sockets.emit('broadcast', { description: 'Players online: ' + clients });
		if(inRoom != 0) {
			sock.leave("room-"+inRoom);
		}
	});

	sock.on('join', () => { // den xrhsimopoieitai kapou
		//Ama einai hdh se room
		if(inRoom) {
			console.log("Already in room");
		}else{
			inRoom = roomno;
			sock.join("room-"+roomno);
			sock.emit('create', roomno);
		}
		// sock.join("room-"+roomno);
		//Incease roomno 2 clients are present in a room
		// console.log(io.sockets.adapter.rooms['room-1'].sockets[sock.id]);
		// console.log(sock.rooms.indexOf(roomno));
		// if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 0) {
		// 	roomno++;
		// 	sock.join("room-"+roomno);
		// 	sock.emit('create', roomno);
		// 	inRoom = roomno;
		// }
	});

});

server.on('error', (err) => {
	console.error("Server error : " + err);
});

server.listen(8080, () => {
	console.log("Nonogram Multiplayer game started on 8080");
});