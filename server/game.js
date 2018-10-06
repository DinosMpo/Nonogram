class NonogramMultiplayerGame {
	constructor(p1, p2,room) {
		this._players = [p1, p2];
		this._turn = null;
		this._nonogram = null;
		this._choice = null;
		this._roomId = room;

		this._players.forEach( (player, idx) => {
			// console.log(player.id);
			player.on('turn', () => {
				this._playerTurn();
			});

			player.on('empty grid', (value) => { //anti gia empty grid na to balw choice
				this._updateNonogram(value);
			});

			player.on('nonogram', (nonogram) => {
				this._nonogram = nonogram;
				// this._sendNonogramToPlayer();

			});

			player.on('correct', ()=> {
				this._checkProgress();
			});

			// player.on('end-turn', () => {
			// 	if(this._turn === this._players[0]) {
			// 		console.log('Player 2 wait');
			// 		this._players[1].emit('end-turn');
			// 	}else{
			// 		console.log('Player 1 wait');
			// 		this._players[0].emit('end-turn');
			// 	}
			// });

			// player.on('disconnect', () => {
			// 	console.log('i left the lobby');
			// });

			// player.on('exit-multiplayer', () => {
			// 	// console.log(player.id);
			// 	if(player.id === this._players[0].id) {
			// 		this._players[0].leave('room-'+this._roomId);
			// 		this._players[0].join('all');
			// 		this._players[1].leave('room-'+this._roomId);
			// 		this._players[1].join('all');
			// 		this._players[1].in("room-"+inRoom).emit('exit-multiplayer', "Player 1 left the lobby");
			// 	}else{
			// 		this._players[0].leave('room-'+this._roomId);
			// 		this._players[0].join('all');
			// 		this._players[1].leave('room-'+this._roomId);
			// 		this._players[1].join('all');
			// 		this._players[0].emit('exit-multiplayer', "Player 2 left the lobby");
			// 	}
			// });

		});

		// this._sendToPlayers("Opponent found!");
		this._playerTurn();
	}

	//oi sunarthseis gia thn diaxeirish tou paixnidiou
	_sendToPlayers(msg) {
		this._players.forEach( (player) => {
			player.emit('multiplayer', msg);
		});
	}

	_playerTurn() {
		if(this._turn === this._players[0]) { // an einai o guros tou prwtou paixth, tote o 2os paizei
			//player 2 turn
			this._turn.emit('wait');
			this._turn = this._players[1];
			this._turn.emit('turn', 'Turn of player 2');
			this._turn.emit('can play');
			console.log("Turn of player 2 player 1 must wait");
		}else{
			//player 1 turn
			this._players[1].emit('wait');
			this._turn = this._players[0];
			this._turn.emit('turn', 'Turn of player 1');
			this._turn.emit('can play');
			console.log("Turn of player 1 player 2 must wait");
		}
	}

	_sendNonogramToPlayer() {
		if(this._turn === this._players[0]) {
			this._players[1].emit('nonogram', this._nonogram);
			// console.log(this._nonogram);
		}else{
			this._players[0].emit('nonogram', this._nonogram);
			// console.log(this._nonogram);
		}
	}

	_updateNonogram(data) {
		if(this._turn === this._players[0]) {
			this._players[1].emit('update', data);
		}else{
			this._players[0].emit('update', data);
		}
	}

	_checkProgress() {
		// if(this._turn === this._players[0]) {
		// 	this._players[1].emit('correct');
		// }else{
		// 	this._players[0].emit('correct');
		// }
		this._players.forEach( (player) => {
			player.emit('correct');
		});
	}
}

module.exports = NonogramMultiplayerGame;