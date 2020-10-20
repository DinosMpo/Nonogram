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
	let multiplayerGame;
	let game; //Auth h metablhth einai gia na dhmiourgh8ei to game otan bre8ei o 2os paixths kai meta na stalei kai stous duo kai sthn sthn dunexeia na to apo8hkeusoume sto multiPlayerGame 
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
		}

		//When someone joins the waiting lobby
		if(waitingPlayer) { // if there is a player that waits to play
			// start game when 2 users join
			inRoom = roomno; //Dhlwnoume san room to trexon domatio
			sock.leave('all'); //Bgainei apo to domatio all kai
			sock.join('room-'+inRoom); //Mpainei sto domatio pou 8a paiksei multi
			// var game = new NonogramMultiplayerGame(waitingPlayer, sock, inRoom);
			// console.log("Ready to play");
			// io.to("room-"+game._roomId).emit('event', "eee");
			let game = {}; //Dhmiourgoume to game pou exei
			game.player1 = waitingPlayer.id; //player1
			game.player2 = sock.id; //player2
			game.room 	 = inRoom; // kai room
			waitingPlayer.emit('player', 'player1'); //Stelnoume ston waitingPlayer oti einai o player1
			sock.emit('player', 'player2'); //kai ston allon oti einai o player2
			io.to("room-"+inRoom).emit('multiplayer', game); //Stelnoume sto domatio pou einai oi 2 paixtes to multiplayer game
			waitingPlayer = null; //To kanoume null gia na mpei allos paixths na perimenei
			sock.emit('wait'); //Stelnoume ston deutero paixth na perimenei thn seira tou
			sock.to("room-"+inRoom).broadcast.emit('can play'); //Epeidh o prwtos paixths paizei prwtos tou stelnoume mhnuma oti mporei na paiksei
		}else {
			// if(game) {
			// 	game = null;
			// }
			//Enas paixths egine waitingPlayer gia to multiplayer
			inRoom = roomno; //Dhlwnoume san room to trexon domatio
			// console.log(inRoom);
			sock.leave('all'); //Bgainei apo to domatio all kai
			sock.join("room-"+inRoom); //Mpainei sto domatio pou 8a paiksei multi
			//When first user connects
			waitingPlayer = sock;
			waitingPlayer.emit('room', inRoom); //Stelnoume ston waitingPlayer to domatio tou , gia pio logo den 8umamai
			waitingPlayer.emit('message', 'Waiting for an opponent'); //Tou stelnoume mhnuma oti perimenei paixth
		}
	});

	sock.on('multiplayer game', (data)=> {
		multiplayerGame = data;
	})

	sock.on('correct', (data) => {
		io.to("room-"+inRoom).emit('correct');
		// io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
		// io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
		// io.nsps['/'].sockets[data.player1].join('all');
		// io.nsps['/'].sockets[data.player2].join('all');
	});

	//Update the progress of the game to the players
	sock.on('empty grid', (data) => {
		sock.to("room-"+inRoom).broadcast.emit('update', data);
	});

	sock.on('end-turn', () => {
		sock.emit('end-turn');
		sock.to("room-"+inRoom).broadcast.emit('can play');
	});

	sock.on('choice', (data) => {
		// io.to("room-"+inRoom).emit('choice', data);
		// console.log(data);
		// sock.to("room-"+inRoom).broadcast.emit('choice', data);
		io.to("room-"+inRoom).emit('choice', data);
	});
	
	//When the multiplayer game is finished
	sock.on('multiplayer finished', () => {
		sock.to("room-"+inRoom).broadcast.emit('multiplayer finished');
	});

	//When the player press the home button and exits the multiplayer lobby
	sock.on('exit-multiplayer', (data) => {
		io.nsps['/'].sockets[sock.id].leave('room-'+inRoom);
		io.nsps['/'].sockets[sock.id].join('all');
		if(sock.id === data.player1) {
			io.to(data.player2).emit('exit-multiplayer', 'Player 1 left the lobby...');
			io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player2].join('all');
		}else if(sock.id === data.player2) {
			io.to(data.player1).emit('exit-multiplayer','Player 2 left the lobby...');
			io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
			io.nsps['/'].sockets[data.player1].join('all');
		}
		inRoom = 0;
	});

	//When the player exits the waiting lobby of multiplayer
	sock.on('exit multiplayer waiting lobby', () => {
		waitingPlayer = null;
		sock.leave("room-"+inRoom);
		inRoom = 0;
	});

	//When a player left the lobby
	sock.on('player-left', () => {
		iRoom =0;
		io.nsps['/'].sockets[sock.id].leave('room-'+inRoom);
		io.nsps['/'].sockets[sock.id].join('all');
	});

	//When the player close the window or disconnect
	sock.on('disconnect', () => {
		clients --;
	    console.log('user disconnected');
		io.sockets.emit('broadcast', { description: 'Players online: ' + clients });
		if(inRoom != 0) {
			if(multiplayerGame) {
				if(sock.id === multiplayerGame.player1) {
					//Prepei na ta diaxwrhsw ta events kai na mhn kanw kai edw exit multiplayer
					io.to(multiplayerGame.player2).emit('player-left', 'Player 1 left the lobby...');
				}else if(sock.id === multiplayerGame.player2) {
					//Prepei na ta diaxwrhsw ta events kai na mhn kanw kai edw exit multiplayer
					io.to(multiplayerGame.player1).emit('player-left','Player 2 left the lobby...');
				}
			}
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

	//Message to all connected clients
	io.sockets.emit('broadcast', { description: 'Players online: ' + clients });
});

server.on('error', (err) => {
	console.error("Server error : " + err);
});

server.listen(8080, () => {
	console.log("Nonogram Multiplayer game started on 8080");
});