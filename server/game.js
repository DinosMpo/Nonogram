class NonogramMultiplayerGame {
	constructor(p1, p2) {
		this._players = [p1, p2];
		this._turn = null;
		this._nonogram = null;
		this._choice = null;

		this._players.forEach( (player, idx) => {

			player.on('turn', () => {
				// this._onTurn(idx, turn); // den to xrhsimopoiw
				this._playerTurn();
			});

			player.on('nonogram', (nonogram) => {
				this._nonogram = nonogram;
				console.log(this._nonogram);
				// this._sendNonogramToPlayer();

			});

			player.on('empty grid', (value) => { //anti gia empty grid na to balw choice
				// console.log(value);
				this._updateNonogram(value);
			});

			player.on('correct', ()=> {
				this._checkProgress();
			});
		});

		this._sendToPlayers("Opponent found!");
		this._playerTurn();
	}

	_sendToPlayers(msg) {
		this._players.forEach( (player) => {
			player.emit('multiplayer', msg);
		});
	}

	_playerTurn() {
		if(this._turn === this._players[0]) {
			//player 2 turn
			this._turn = this._players[1];
			this._turn.emit('turn', 'Turn of player 2');
			this._turn.emit('can play');
		}else{
			//player 1 turn
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