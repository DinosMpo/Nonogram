//Multiplayer
class NonogramMultiplayer {
	constructor(p1, p2, room) {
		this.player1 = p1;
		this.player2 = p2;
		this.roomId = room;

		this.turn = null;
		this.nonogram = null;
		this.choice = null;
	}
}

let gameRoom;
let multiplayerGame;
let player;
let multiplayerStageIndex;

//-----Events for multiplayer
sock.on('message', (text) => {
	console.log(text);
});

//Found a player
sock.on('multiplayer', (game) => {
	$('#msg').text("Player found!");
	multiplayerGame = new NonogramMultiplayer(game.player1, game.player2, game.room);
	createMultiplayerLevel();
});

sock.on('can play', () => {
	wait = false;
	turn = true;
	$("#waiting-screen").hide();
});

// sock.on('turn', (text) => {
// 	turn = true;
// });

sock.on('correct', () => {
	$('#waiting-screen').hide();
	$("#correct-multiplayer").show();
});

sock.on('end-turn', () => {
	$('#waiting-screen').show();
});

sock.on('room', (room) => {
	gameRoom = 'room-'+room;
});

sock.on('player', (number) => {
	player = number;
});

sock.on('event', function(text) {
	console.log(text);
});

//Client Counter
sock.on('broadcast', (data) => {
	$('#clients-count').text(data.description);
});

sock.on('multiplayer finished', () => {
	$('#waiting-screen').hide();
	$('#multiplayer-finished-popup').show();
});

sock.on('exit-multiplayer', (data) => {
	if($("#waiting-screen").show()) {
		$("#waiting-screen").hide();
	}
	$('#container-tools').hide();
	$('#player-left-info').text(data);
	$('#player-left').show();

});

sock.on('update', (data) => {
	// console.log('eeeeeee eee eeeee');
	// origninX = data.originX;
	// origninY = data.originY;
	// scaleFactor = data.scaleFactor;
	ctx.save();
	ctx.translate(originX,originY);
	ctx.scale(scaleFactor,scaleFactor);
	if(data.dataType === "fill cell") {
		if(data.fillCellChoice === "default") {
			nonogram.emptyGrid[data.cell].value = data.value;
			if(nonogram.emptyGrid[data.cell].value === 1) {
				nonogram.drawBlackCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
			}else if(nonogram.emptyGrid[data.cell].value === 2) {
				nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
				nonogram.drawXCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
			}else{
				nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
			}
		}else if(data.fillCellChoice === "black") {
			nonogram.emptyGrid[data.cell].value = data.value;
			if(nonogram.emptyGrid[data.cell].value === 1) {
				nonogram.drawBlackCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
		    }else{
				nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
			}
		}else if(data.fillCellChoice === "x") {
			nonogram.emptyGrid[data.cell].value = data.value;
			if(nonogram.emptyGrid[data.cell].value === 2) {
				nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
				nonogram.drawXCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
		    }else{
				nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
				// nonogram.strokeCurrentChoice(nonogram.emptyGrid[data.cell]);
				nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
			}

		}
	}else if(data.dataType === "fill cell row numbers grid") {
		nonogram.rowNumbersGrid[data.cell].value = data.value;
		// console.log("nonogram.rowNumbersGrid[data.cell].value: " + nonogram.rowNumbersGrid[data.cell].value);
		ctx.lineWidth = 3;
		ctx.beginPath();
		if(nonogram.rowNumbersGrid[data.cell].value == 1) {		
			ctx.strokeStyle = "red";
			ctx.moveTo(nonogram.rowNumbersGrid[data.cell].x+3, (nonogram.rowNumbersGrid[data.cell].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.rowNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[data.cell].y+3);
		}else{
			ctx.fillStyle = "#e0e0d1";
			ctx.fillRect(nonogram.rowNumbersGrid[data.cell].x+2, nonogram.rowNumbersGrid[data.cell].y+2, nonogram.rowNumbersGrid[data.cell].w-3, nonogram.rowNumbersGrid[data.cell].h-3);
			ctx.fillStyle = "black";
			ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
			ctx.fillText(nonogram.rowNumbersGrid[data.cell].number, (nonogram.rowNumbersGrid[data.cell].x) + (nonogram.blockSize/3), (nonogram.rowNumbersGrid[data.cell].y) + ((nonogram.blockSize+8)/2));
		}
		ctx.stroke();
		ctx.closePath();
	}else if(data.dataType === "fill cell column numbers grid") {
		nonogram.columnNumbersGrid[data.cell].value = data.value;
		ctx.lineWidth = 3;
		ctx.beginPath();
		if(nonogram.columnNumbersGrid[data.cell].value === 1) {
			ctx.strokeStyle = "red";
			ctx.moveTo(nonogram.columnNumbersGrid[data.cell].x+3, (nonogram.columnNumbersGrid[data.cell].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.columnNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[data.cell].y+3);

		}else{
			ctx.fillStyle = "#e0e0d1";
			ctx.fillRect(nonogram.columnNumbersGrid[data.cell].x+2, nonogram.columnNumbersGrid[data.cell].y+2, nonogram.columnNumbersGrid[data.cell].w-3, nonogram.columnNumbersGrid[data.cell].h-3);
			ctx.fillStyle = "black";
			ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
			ctx.fillText(nonogram.columnNumbersGrid[data.cell].number, (nonogram.columnNumbersGrid[data.cell].x) + (nonogram.blockSize/3), (nonogram.columnNumbersGrid[data.cell].y) + ((nonogram.blockSize+8)/2));
		}
		ctx.stroke();
		ctx.closePath();
	}
	ctx.restore();

	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
});

let player1Choice;
let player2Choice;
sock.on('choice', (data) => {
	if(data.player == "player1") {
		player1Choice = data.choice;
		if(player1Choice == 'yes') {
			$('#player1-choice').addClass('choice-yes');
		}else if(player1Choice == 'no') {
			$('#player1-choice').addClass('choice-no');
		}
	}else if(data.player == "player2") {
		player2Choice = data.choice;
		if(player2Choice == 'yes') {
			$('#player2-choice').addClass('choice-yes');
		}else if(player2Choice == 'no') {
			$('#player2-choice').addClass('choice-no');
		}
	}

	if(player1Choice == 'yes' && player2Choice == 'yes') {
		$('#correct-multiplayer').hide();
		multiplayerStageIndex++;
		createNextMultiplayerStage();
		// console.log('Create next stage');
		// sock.emit('next-stage', () => {
			
		// });
		$('#player1-choice').removeClass('choice-yes');
		$('#player2-choice').removeClass('choice-yes');
		player1Choice = "";
		player2Choice = "";

	}
});

$('#exit-to-menu').click( () => {
	$("#player-left").hide();
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#menu").show();
	$("#clients-count").show();
});

//Next stage vote yes
$('#yes').click(function() {
	$('#'+ player +'-choice').addClass('choice-yes');
	let data = {
		player: player,
		choice: 'yes'
	};
	if(player == 'player1') {
		player1Choice = 'yes';
	}else if(player == 'player2Choice') {
		player2Choice = 'yes';
	}
	sock.emit('choice', data);
});

//Next stage vote no
$('#no').click(function() {
	$('#'+ player +'-choice').addClass('choice-no');
	let data = {
		player: player,
		choice: 'no'
	};
	if(player == 'player1') {
		player1Choice = 'no';
	}else if(player == 'player2Choice') {
		player2Choice = 'no';
	}
	sock.emit('choice', data);
});

Nonogram.prototype.multiplayerFillCels = function(mouseX, mouseY) {
	ctx.lineWidth = 3;
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
			if(this.rowNumbersGrid[i].value == 0) {
				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
				ctx.stroke();
				ctx.closePath();
				ctx.strokeStyle = "black";
				this.rowNumbersGrid[i].value = 1;

				var gameData = {
					dataType: 		"fill cell row numbers grid",
					cell: 			i,
					value: 			1,
					room: 			gameRoom,
					originX: 		originX,
					originY: 		originY,
					scaleFactor: 	scaleFactor
				};
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
				this.rowNumbersGrid[i].value = 0;

				var gameData = {
					dataType: 		"fill cell row numbers grid",
					cell: 			i,
					value: 			0,
					room: 			gameRoom,
					originX: 		originX,
					originY: 		originY,
					scaleFactor: 	scaleFactor
				};
				// io.to(gameData.room).emit('empty grid', gameData);
				// // sock.emit('empty grid', gameData);
				// io.to(gameData.room).emit('nonogram', nonogram);
				// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				// io.to(gameData.room).emit('turn');
				// // sock.emit('turn');//allagh gurou
				// turn = false;
			}
			return gameData;
			// break;
		}
	}

	for(var i=0; i<this.columnNumbersGrid.length; i++) {
		if(mouseX >= this.columnNumbersGrid[i].x && mouseY >= this.columnNumbersGrid[i].y && mouseX <= (this.columnNumbersGrid[i].x + this.blockSize) && mouseY <= (this.columnNumbersGrid[i].y + this.blockSize)) {
			if(this.columnNumbersGrid[i].value == 0) {
				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
				ctx.stroke();
				ctx.closePath();
				ctx.strokeStyle = "black";
				this.columnNumbersGrid[i].value = 1;

				var gameData = {
					dataType: 		"fill cell column numbers grid",
					cell: 			i,
					value: 			1,
					room: 			gameRoom,
					originX: 		originX,
					originY: 		originY,
					scaleFactor: 	scaleFactor
				};

				// io.to(gameData.room).emit('empty grid', gameData);
				// // sock.emit('empty grid', gameData);
				// io.to(gameData.room).emit('nonogram', nonogram);
				// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				// io.to(gameData.room).emit('turn');
				// // sock.emit('turn');//allagh gurou
				// turn = false;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
				this.columnNumbersGrid[i].value = 0;

				var gameData = {
					dataType: 		"fill cell column numbers grid",
					cell: 			i,
					value: 			0,
					room: 			gameRoom,
					originX: 		originX,
					originY: 		originY,
					scaleFactor: 	scaleFactor
				};

				// io.to(gameData.room).emit('empty grid', gameData);
				// // sock.emit('empty grid', gameData);
				// io.to(gameData.room).emit('nonogram', nonogram);
				// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				// io.to(gameData.room).emit('turn');
				// // sock.emit('turn');//allagh gurou
				// turn = false;
			}
			return gameData;
			// break;
		}
	}

	if(this.fillCellChoice == "default") {
		for(var i=0;i<this.emptyGrid.length;i++) { //psaxnw ola ta kelia sto grid gia na brw pio pathse o xrhsths
			var x = this.emptyGrid[i].x;
			var y = this.emptyGrid[i].y;
			var block = this.blockSize;
			var value = this.emptyGrid[i].value;
			var width = this.emptyGrid[i].w;
			var height = this.emptyGrid[i].h;
			var rowSize = this.maxRowNumberSize;
			var columnSize = this.maxColumnNumberSize;
			var rowLength = this.levelGrid[0].length;
			var columnLength = this.levelGrid.length;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(value == 0) {
					this.emptyGrid[i].value = 1;
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			1,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
			    }else if(value == 1) { //fill the cell with a X
			    	this.emptyGrid[i].value = 2;
			    	this.drawWhiteCell(this.emptyGrid[i]);
			    	this.drawXCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			2,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
				}else { //Clear the cell
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			0,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};			
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
				}
				return gameData;
			}
		}
	}else if(this.fillCellChoice == "black") {
		for(var i=0;i<this.emptyGrid.length;i++) { //psaxnw ola ta kelia sto grid gia na brw pio pathse o xrhsths
			var x = this.emptyGrid[i].x;
			var y = this.emptyGrid[i].y;
			var block = this.blockSize;
			var value = this.emptyGrid[i].value;
			var width = this.emptyGrid[i].w;
			var height = this.emptyGrid[i].h;
			var rowSize = this.maxRowNumberSize;
			var columnSize = this.maxColumnNumberSize;
			var rowLength = this.levelGrid[0].length;
			var columnLength = this.levelGrid.length;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(this.emptyGrid[i].value !== 1) {
					this.emptyGrid[i].value = 1;
					//fil the cell black
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			1,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
			    }else{
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					// this.strokeCurrentChoice(this.emptyGrid[i]);
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			0,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
				}
				return gameData;
			}
		}
	}else if(this.fillCellChoice == "x") {

		var block = this.blockSize;
		var columnSize = this.maxColumnNumberSize, columnLength = this.levelGrid.length;
		var rowLength = this.levelGrid[0].length, rowSize = this.maxRowNumberSize;
		
		for(var i=0;i<this.emptyGrid.length;i++) { //psaxnw ola ta kelia sto grid gia na brw pio pathse o xrhsths
			var value = this.emptyGrid[i].value;
			var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
			var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(this.emptyGrid[i].value !== 2) {
					this.emptyGrid[i].value = 2;
					this.drawWhiteCell(this.emptyGrid[i]);
			    	this.drawXCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "x",
						cell: 			i,
						value: 			2,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
			    }else{
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "x",
						cell: 			i,
						value: 			0,
						room: 			gameRoom,
						originX: 		originX,
						originY: 		originY,
						scaleFactor: 	scaleFactor
					};
					// io.to(gameData.room).emit('empty grid', gameData);
					// // sock.emit('empty grid', gameData);
					// io.to(gameData.room).emit('nonogram', nonogram);
					// // sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					// io.to(gameData.room).emit('turn');
					// // sock.emit('turn');//allagh gurou
					// turn = false;
				}
				return gameData;
			}
		}
	}
}