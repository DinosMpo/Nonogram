//Draw the grid
Nonogram.prototype.drawGrid = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);

	ctx.beginPath();
	ctx.fillStyle = "#e0e0d1";
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height);
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width, this.maxColumnNumberSize * this.blockSize);
	ctx.fillStyle = "black";
	ctx.closePath();

	for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(this.width,i);
		ctx.stroke(); // Mporei na mhn xreiazetai
	}

	for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		ctx.beginPath(); // Auth h grammh nomizw den xreiazetai giati xrhsimopoiei thn apo panw
		ctx.moveTo(y,0);
		ctx.lineTo(y, this.height);
		ctx.stroke();
	}

	for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0)); // bazw ena koutakh gia ka8e koutakh ston pinaka
		}
	}

	for ( let i = 0; i < this.maxColumnNumberSize; i++ ) { //Gia ka8e grammh
		ctx.beginPath();
		ctx.moveTo((this.maxRowNumberSize ) * this.blockSize ,(i+1)*this.blockSize);
		ctx.lineTo(this.width, (i+1)*this.blockSize);
		ctx.stroke();
		ctx.closePath();
		//this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0));
	}

	for ( let i = 0; i < this.maxRowNumberSize; i++ ) { //Gia ka8e sthlh
		ctx.beginPath();
		ctx.moveTo( (i+1)*this.blockSize , (this.maxColumnNumberSize ) * this.blockSize);
		ctx.lineTo( (i+1)*this.blockSize , this.height);
		ctx.stroke();
		ctx.closePath();
	}
}

Nonogram.prototype.fillCurrentChoice = function(cell) {
	//for the current and previous choice
	if(this.previousChoice.active) {
		if(this.previousChoice.cell.value === 1) {
			ctx.fillStyle = 'black';
			ctx.fillRect(this.previousChoice.cell.x+2, this.previousChoice.cell.y+2, this.previousChoice.cell.w-3, this.previousChoice.cell.h-3);
		}else if(this.previousChoice.cell.value === 2) {
			ctx.fillStyle = "white";
			ctx.fillRect(this.previousChoice.cell.x + 2, this.previousChoice.cell.y + 2, this.previousChoice.cell.w - 3, this.previousChoice.cell.h - 3);
			ctx.beginPath();
			ctx.moveTo(this.previousChoice.cell.x + 4, this.previousChoice.cell.y + 4);
			ctx.lineTo(this.previousChoice.cell.x + this.blockSize - 4, this.previousChoice.cell.y + this.blockSize - 4);
			ctx.moveTo(this.previousChoice.cell.x + this.blockSize - 4, this.previousChoice.cell.y + 4);
			ctx.lineTo(this.previousChoice.cell.x + 4, this.previousChoice.cell.y + this.blockSize - 4);
			ctx.stroke();
			ctx.closePath();
		}else{
			ctx.fillStyle = "white";
			ctx.fillRect(this.previousChoice.cell.x + 2, this.previousChoice.cell.y + 2, this.previousChoice.cell.w - 3, this.previousChoice.cell.h - 3);
		}
	}

	this.currentChoice.cell = cell;
	this.previousChoice.cell = cell;
	this.previousChoice.active = true;

	ctx.strokeStyle = "red";
	ctx.lineWidth   = 4;
	ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
	ctx.strokeStyle = "black";
}

Nonogram.prototype.drawPreview = function(cell) {
	let x = ((cell.x - (this.maxRowNumberSize * this.blockSize )) / this.blockSize) * Math.floor(((this.maxRowNumberSize * this.blockSize) / this.correctGrid[0].length)) - 2;
	let y = ((cell.y - (this.maxColumnNumberSize * this.blockSize)) / this.blockSize) * Math.floor(((this.maxColumnNumberSize * this.blockSize) / this.correctGrid.length)) - 2;
	let width = Math.floor((this.maxRowNumberSize * this.blockSize) / this.correctGrid[0].length);
	let height = Math.floor((this.maxColumnNumberSize * this.blockSize) / this.correctGrid.length);

	ctx.fillRect(x, y, width, height);
}

//Gemisma twn keliwn
Nonogram.prototype.fillCels = function(mouseX, mouseY) { //prepei na balw thn epilogh tou cell edw
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
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.rowNumbersGrid[i].number, 
							(this.rowNumbersGrid[i].x)+(this.blockSize/2)-7, 
							(this.rowNumbersGrid[i].y)+(this.blockSize/2)+5);
				this.rowNumbersGrid[i].value = 0;
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
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.columnNumbersGrid[i].number, 
							(this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, 
							(this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
				this.columnNumbersGrid[i].value = 0;
			}
			break;
		}
	}

	if(this.fillCellChoice == "default") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value == 0) {
					this.emptyGrid[i].value = 1;
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
		    	}else if(this.emptyGrid[i].value == 1) { //fill the cell with a X
			    	this.emptyGrid[i].value = 2;
			    	ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					this.fillCurrentChoice(this.emptyGrid[i]);
				}else { //Clear the cell
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
				}
			}
		}
	}else if(this.fillCellChoice == "black"){
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 1) {
					this.emptyGrid[i].value = 1;
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
			    }else{
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
				}
			}
		}
	}else if(this.fillCellChoice == "x") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 2) {
					this.emptyGrid[i].value = 2;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					this.fillCurrentChoice(this.emptyGrid[i]);
		    	}else{
		    		this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
		    	}
	  		}
		}
	}else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 0) {
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
			    }
		 	}
		}
	}
}

Nonogram.prototype.fillMultiCells = function(mouseX, mouseY, startPointMouseX, startPointMouseY) {
	var startCellValue = 0;
	var x = 0;
	var y = 0;

	for(var i=0;i<this.emptyGrid.length;i++) { // briskw to arxiko keli
		if(startPointMouseX >= this.emptyGrid[i].x && startPointMouseY >= this.emptyGrid[i].y && startPointMouseX <= (this.emptyGrid[i].x + this.blockSize) && startPointMouseY <= (this.emptyGrid[i].y + this.blockSize)) {
			startCellValue = this.emptyGrid[i].value;
			x = this.emptyGrid[i].x;
			y = this.emptyGrid[i].y;
			this.currentChoice.cell = this.emptyGrid[i];
		}
	}

	if(mouseX > x && (mouseX < x + this.blockSize)) {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				this.emptyGrid[i].value = startCellValue;
				//sun8hkh gia ta kelia
				if(startCellValue == 1) {
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell = this.emptyGrid[i];
					this.previousChoice.active = true;
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.emptyGrid[i].x+5, this.emptyGrid[i].y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
				}else if(startCellValue == 2) {
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
				}else{
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
				}
			}
		}
	}

	if(mouseY > y && (mouseY < y + this.blockSize)) {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				this.emptyGrid[i].value = startCellValue;
				//sun8hkh gia ta kelia
				if(startCellValue == 1) {
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell = this.emptyGrid[i];
					this.previousChoice.active = true;
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.emptyGrid[i].x+5, this.emptyGrid[i].y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
					
				}else if(startCellValue == 2) {
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 2, this.emptyGrid[i].y + this.blockSize - 2);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 2, this.emptyGrid[i].y + 2);
					ctx.lineTo(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + this.blockSize - 2);
					ctx.stroke();
					ctx.closePath();
				}else{
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
					this.drawPreview(this.emptyGrid[i]);
				}
			}
		}
	}
}