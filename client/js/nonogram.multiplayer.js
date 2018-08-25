//Multiplayer
sock.on('can play', () => {
	turn = true;
	wait = false;
	$("#waiting-screen").hide();
});

sock.on('correct', () => {
	$("#correct").show();
});

sock.on('end-turn', () => {
	$('#waiting-screen').show();
});

sock.on('update', (data) => {
	// console.log(data);
	
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

				var data = {
					dataType: 		"fill cell row numbers grid",
					cell: 			i,
					value: 			1
				};

				sock.emit('empty grid', data);
				sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				sock.emit('turn');//allagh gurou
				turn = false;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.rowNumbersGrid[i].number, 
							(this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, 
							(this.rowNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
				this.rowNumbersGrid[i].value = 0;

				var data = {
					dataType: 		"fill cell row numbers grid",
					cell: 			i,
					value: 			0
				};

				sock.emit('empty grid', data);
				sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				sock.emit('turn');//allagh gurou
				turn = false;
			}
			break;
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

				var data = {
					dataType: 		"fill cell column numbers grid",
					cell: 			i,
					value: 			1
				};

				sock.emit('empty grid', data);
				sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				sock.emit('turn');//allagh gurou
				turn = false;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.columnNumbersGrid[i].number, 
							(this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, 
							(this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
				this.columnNumbersGrid[i].value = 0;

				var data = {
					dataType: 		"fill cell column numbers grid",
					cell: 			i,
					value: 			0
				};

				sock.emit('empty grid', data);
				sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
				sock.emit('turn');//allagh gurou
				turn = false;
			}
			break;
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

					var data = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			1
					};
					
					sock.emit('empty grid', data);//to empty grid 8a prepei na to kanw update?
					sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					sock.emit('turn');//allagh gurou
					turn = false;
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

					var data = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			2
					};
					
					sock.emit('empty grid', data);
					sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					sock.emit('turn');//allagh gurou
					turn = false;
				}else { //Clear the cell
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);

					var data = {
						dataType: 		"fill cell",
						fillCellChoice: "default",
						cell: 			i,
						value: 			0
					};
					
					sock.emit('empty grid', data);
					sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					sock.emit('turn');//allagh gurou
					turn = false;
				}
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
					var data = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			1
					};
					
					sock.emit('empty grid', data);
					sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					sock.emit('turn');//allagh gurou
					turn = false;
			    }else{
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
					this.drawPreview(this.emptyGrid[i]);
					// this.fillCurrentChoice(this.emptyGrid[i]);
					var data = {
						dataType: 		"fill cell",
						fillCellChoice: "black",
						cell: 			i,
						value: 			0
					};
					
					sock.emit('empty grid', data);
					sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
					sock.emit('turn');//allagh gurou
					turn = false;
				}
			}
		}
	}
}

