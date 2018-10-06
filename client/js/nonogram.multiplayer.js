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

//-----Events for multiplayer
sock.on('message', (text) => {
	console.log(text);
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
	$("#correct").show();
});

sock.on('end-turn', () => {
	$('#waiting-screen').show();
});

sock.on('room', (room) => {
	gameRoom = 'room-'+room;
});

sock.on('multiplayer', (game) => {
	$('#msg').text("Player found!");
	multiplayerGame = new NonogramMultiplayer(game.player1, game.player2, game.room);
	createMultiplayerLevel();
});

sock.on('event', function(text) {
	console.log(text);
});

sock.on('broadcast', (data) => {
	$('#clients-count').text(data.description);
});

sock.on('exit-multiplayer', (data) => {
	if($("#waiting-screen").show()) {
		$("#waiting-screen").hide();
	}
	$('#player-left-info').text(data);
	$('#player-left').show();

});

sock.on('update', (data) => {
	console.log('eeeeeee eee eeeee');
	if(data.dataType === "fill cell") {
		if(data.fillCellChoice === "default") {
			nonogram.emptyGrid[data.cell].value = data.value;

			if(nonogram.emptyGrid[data.cell].value === 1) {
				ctx.fillStyle = 'black';
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);
				ctx.fillRect(((nonogram.emptyGrid[data.cell].x - (nonogram.maxRowNumberSize * nonogram.blockSize)) / nonogram.blockSize) * Math.floor(((nonogram.maxRowNumberSize * nonogram.blockSize) / nonogram.correctGrid[0].length)) - 2, 
							 ((nonogram.emptyGrid[data.cell].y - (nonogram.maxColumnNumberSize * nonogram.blockSize)) / nonogram.blockSize) * Math.floor(((nonogram.maxColumnNumberSize * nonogram.blockSize) / nonogram.correctGrid.length)) - 2, 
							 Math.floor((nonogram.maxRowNumberSize * nonogram.blockSize) / nonogram.correctGrid[0].length), 
							 Math.floor((nonogram.maxColumnNumberSize * nonogram.blockSize) / nonogram.correctGrid.length));
			}else if(nonogram.emptyGrid[data.cell].value === 2) {
				ctx.fillStyle = "white";
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);

				ctx.fillRect( (( nonogram.emptyGrid[data.cell].x - (nonogram.maxRowNumberSize * nonogram.blockSize )) / nonogram.blockSize) * Math.floor(((nonogram.maxRowNumberSize * nonogram.blockSize ) / nonogram.correctGrid[0].length)) - 2,
										 (( nonogram.emptyGrid[data.cell].y - (nonogram.maxColumnNumberSize * nonogram.blockSize )) / nonogram.blockSize ) * Math.floor(((nonogram.maxColumnNumberSize * nonogram.blockSize ) / nonogram.correctGrid.length)) - 2, 
										 Math.floor(( nonogram.maxRowNumberSize * nonogram.blockSize ) / nonogram.correctGrid[0].length), 
										 Math.floor(( nonogram.maxColumnNumberSize * nonogram.blockSize ) / nonogram.correctGrid.length));
				
				ctx.beginPath();
				ctx.moveTo(nonogram.emptyGrid[data.cell].x + 4, nonogram.emptyGrid[data.cell].y + 4);
				ctx.lineTo(nonogram.emptyGrid[data.cell].x + nonogram.blockSize - 4, nonogram.emptyGrid[data.cell].y + nonogram.blockSize - 4);
				ctx.moveTo(nonogram.emptyGrid[data.cell].x + nonogram.blockSize - 4, nonogram.emptyGrid[data.cell].y + 4);
				ctx.lineTo(nonogram.emptyGrid[data.cell].x + 4, nonogram.emptyGrid[data.cell].y + nonogram.blockSize - 4);
				ctx.stroke();
				ctx.closePath();
			}else{
				ctx.fillStyle = "white";
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);

				ctx.fillRect( ((nonogram.emptyGrid[data.cell].x - (nonogram.maxRowNumberSize * nonogram.blockSize)) / nonogram.blockSize) * Math.floor(((nonogram.maxRowNumberSize * nonogram.blockSize) / nonogram.correctGrid[0].length)) - 2,
										 ((nonogram.emptyGrid[data.cell].y - (nonogram.maxColumnNumberSize * nonogram.blockSize)) / nonogram.blockSize) * Math.floor(((nonogram.maxColumnNumberSize * nonogram.blockSize) / nonogram.correctGrid.length)) - 2, 
										 Math.floor((nonogram.maxRowNumberSize * nonogram.blockSize) / nonogram.correctGrid[0].length), 
										 Math.floor((nonogram.maxColumnNumberSize * nonogram.blockSize) / nonogram.correctGrid.length));
			}
		}else if(data.fillCellChoice === "black") {
			nonogram.emptyGrid[data.cell].value = data.value;

			if(nonogram.emptyGrid[data.cell].value === 1) {
				ctx.fillStyle = 'black';
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
				nonogram.fillCurrentChoice(nonogram.emptyGrid[data.cell]);
		    }else{
				ctx.fillStyle = "white";
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
				nonogram.fillCurrentChoice(nonogram.emptyGrid[data.cell]);
			}

		}else if(data.fillCellChoice === "x") {
			nonogram.emptyGrid[data.cell].value = data.value;

			if(nonogram.emptyGrid[data.cell].value === 2) {
				ctx.fillStyle = "white";
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);

				ctx.fillRect( (( nonogram.emptyGrid[data.cell].x - (nonogram.maxRowNumberSize * nonogram.blockSize )) / nonogram.blockSize) * Math.floor(((nonogram.maxRowNumberSize * nonogram.blockSize ) / nonogram.correctGrid[0].length)) - 2,
										 (( nonogram.emptyGrid[data.cell].y - (nonogram.maxColumnNumberSize * nonogram.blockSize )) / nonogram.blockSize ) * Math.floor(((nonogram.maxColumnNumberSize * nonogram.blockSize ) / nonogram.correctGrid.length)) - 2, 
										 Math.floor(( nonogram.maxRowNumberSize * nonogram.blockSize ) / nonogram.correctGrid[0].length), 
										 Math.floor(( nonogram.maxColumnNumberSize * nonogram.blockSize ) / nonogram.correctGrid.length));
				
				ctx.beginPath();
				ctx.moveTo(nonogram.emptyGrid[data.cell].x + 4, nonogram.emptyGrid[data.cell].y + 4);
				ctx.lineTo(nonogram.emptyGrid[data.cell].x + nonogram.blockSize - 4, nonogram.emptyGrid[data.cell].y + nonogram.blockSize - 4);
				ctx.moveTo(nonogram.emptyGrid[data.cell].x + nonogram.blockSize - 4, nonogram.emptyGrid[data.cell].y + 4);
				ctx.lineTo(nonogram.emptyGrid[data.cell].x + 4, nonogram.emptyGrid[data.cell].y + nonogram.blockSize - 4);
				ctx.stroke();
				ctx.closePath();
		    }else{
				ctx.fillStyle = "white";
				ctx.fillRect(nonogram.emptyGrid[data.cell].x + 2, nonogram.emptyGrid[data.cell].y + 2, nonogram.emptyGrid[data.cell].w - 3, nonogram.emptyGrid[data.cell].h - 3);
				nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
				nonogram.fillCurrentChoice(nonogram.emptyGrid[data.cell]);
			}

		}
	}else if(data.dataType === "fill cell row numbers grid") {
		nonogram.rowNumbersGrid[data.cell].value = data.value;
		ctx.lineWidth = 3;

		if(nonogram.rowNumbersGrid[data.cell].value === 1) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(nonogram.rowNumbersGrid[data.cell].x+3, (nonogram.rowNumbersGrid[data.cell].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.rowNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[data.cell].y+3);
			ctx.stroke();
			ctx.closePath();
			ctx.strokeStyle = "black";
		}else{
			ctx.fillStyle = "#e0e0d1";
			ctx.fillRect(nonogram.rowNumbersGrid[data.cell].x+2, nonogram.rowNumbersGrid[data.cell].y+2, nonogram.rowNumbersGrid[data.cell].w-3, nonogram.rowNumbersGrid[data.cell].h-3);
			ctx.fillStyle = "black";
			ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
			ctx.fillText(nonogram.rowNumbersGrid[data.cell].number, 
						(nonogram.rowNumbersGrid[data.cell].x) + (nonogram.blockSize / 2) - 7, 
						(nonogram.rowNumbersGrid[data.cell].y) + (nonogram.blockSize / 2)  + 5);
		}
	}else if(data.dataType === "fill cell column numbers grid") {
		nonogram.columnNumbersGrid[data.cell].value = data.value;
		ctx.lineWidth = 3;

		if(nonogram.columnNumbersGrid[data.cell].value === 1) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(nonogram.columnNumbersGrid[data.cell].x+3, (nonogram.columnNumbersGrid[data.cell].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.columnNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[data.cell].y+3);
			ctx.stroke();
			ctx.closePath();
			ctx.strokeStyle = "black";
		}else{
			ctx.fillStyle = "#e0e0d1";
			ctx.fillRect(nonogram.columnNumbersGrid[data.cell].x+2, nonogram.columnNumbersGrid[data.cell].y+2, nonogram.columnNumbersGrid[data.cell].w-3, nonogram.columnNumbersGrid[data.cell].h-3);
			ctx.fillStyle = "black";
			ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
			ctx.fillText(nonogram.columnNumbersGrid[data.cell].number, 
						(nonogram.columnNumbersGrid[data.cell].x) + (nonogram.blockSize / 2) - 7, 
						(nonogram.columnNumbersGrid[data.cell].y) + (nonogram.blockSize / 2)  + 5);
		}
	}
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
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

Nonogram.prototype.multiplayerFillCels = function(mouseX, mouseY) {
	ctx.lineWidth = 3;
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
			
			if(this.rowNumbersGrid[i].value === 0) {
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
					room: 			gameRoom
				};
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.rowNumbersGrid[i].number, 
							(this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, 
							(this.rowNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
				this.rowNumbersGrid[i].value = 0;

				var gameData = {
					dataType: 		"fill cell row numbers grid",
					cell: 			i,
					value: 			0,
					room: 			gameRoom
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
			if(this.columnNumbersGrid[i].value === 0) {
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
					room: 			gameRoom
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
				ctx.fillText(this.columnNumbersGrid[i].number, 
							(this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, 
							(this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
				this.columnNumbersGrid[i].value = 0;

				var gameData = {
					dataType: 		"fill cell column numbers grid",
					cell: 			i,
					value: 			0,
					room: 			gameRoom
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
			var rowLength = this.correctGrid[0].length;
			var columnLength = this.correctGrid.length;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(value == 0) {
					this.emptyGrid[i].value = 1;
					ctx.fillStyle = 'black';
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);

					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			1,
						room: 			gameRoom
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
			    	ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(x + 4, y + 4);
					ctx.lineTo(x + block - 4, y + block - 4);
					ctx.moveTo(x + block - 4, y + 4);
					ctx.lineTo(x + 4, y + block - 4);
					ctx.stroke();
					ctx.closePath();

					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			2,
						room: 			gameRoom
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

					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			0,
						room: 			gameRoom
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
			var rowLength = this.correctGrid[0].length;
			var columnLength = this.correctGrid.length;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(this.emptyGrid[i].value !== 1) {
					this.emptyGrid[i].value = 1;
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					// this.fillCurrentChoice(this.emptyGrid[i]);
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			1,
						room: 			gameRoom
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
					ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					// this.fillCurrentChoice(this.emptyGrid[i]);
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			0,
						room: 			gameRoom
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
		var columnSize = this.maxColumnNumberSize, columnLength = this.correctGrid.length;
		var rowLength = this.correctGrid[0].length, rowSize = this.maxRowNumberSize;
		
		for(var i=0;i<this.emptyGrid.length;i++) { //psaxnw ola ta kelia sto grid gia na brw pio pathse o xrhsths
			var value = this.emptyGrid[i].value;
			var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
			var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
			var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
			var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

			if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {//elegxo an path8hke to sugkekrimeno keli.An path8hke ti value eixe?
				if(this.emptyGrid[i].value !== 2) {
					this.emptyGrid[i].value = 2;
					//fil the cell x
					//-----------------------------------------------------
					ctx.fillStyle = "white";
					// console.log("eee ooo");
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					this.fillCurrentChoice(this.emptyGrid[i]);
					// this.fillCurrentChoice(this.emptyGrid[i]);
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "x",
						cell: 			i,
						value: 			2,
						room: 			gameRoom
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
					ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					// this.fillCurrentChoice(this.emptyGrid[i]);
					var gameData = {
						dataType: 		"fill cell",
						fillCellChoice: "x",
						cell: 			i,
						value: 			0,
						room: 			gameRoom
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
