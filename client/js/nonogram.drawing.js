//Draw the grid
Nonogram.prototype.drawGrid = function() {
	ctx.fillStyle = "white";
	ctx.lineWidth = 1;
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.beginPath();
	ctx.fillStyle = "#e0e0d1"; //mpez
	//gia ths sthles
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height-(this.maxColumnNumberSize * this.blockSize));
	//gia ths grammes
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width-(this.maxRowNumberSize * this.blockSize), this.maxColumnNumberSize * this.blockSize);
	
	ctx.fillStyle = "black";
	for (let i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
		ctx.moveTo(0,i);
		ctx.lineTo(this.width,i);
	}
	for (let y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) {
		ctx.moveTo(y,0);
		ctx.lineTo(y, this.height);
	}
	for ( let i = 0; i < this.maxColumnNumberSize; i++ ) { //Για κάθε γραμμή
		ctx.moveTo((this.maxRowNumberSize ) * this.blockSize ,(i+1)*this.blockSize);
		ctx.lineTo(this.width, (i+1)*this.blockSize);
	}
	for ( let i = 0; i < this.maxRowNumberSize; i++ ) { //Για κάθε στήλη
		ctx.moveTo( (i+1)*this.blockSize , (this.maxColumnNumberSize ) * this.blockSize);
		ctx.lineTo( (i+1)*this.blockSize , this.height);
	}
	ctx.fillStyle = 'black';
	ctx.lineWidth = 2;
	ctx.strokeRect(-1,-1,this.width+1,this.height+1);
	ctx.stroke();
	ctx.closePath();
}

Nonogram.prototype.drawRowNumbers = function() {
	for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.rowNumbersGrid[i].y) + (this.blockSize / 2) + 5);
	}
}

Nonogram.prototype.drawColumnNumbers = function() {
	for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
	}
}

Nonogram.prototype.fillCurrentChoice = function(cell) {
	//for the current and previous choice
	if(this.previousChoice.active) {
		ctx.beginPath();
		for(let i=0; i<this.previousChoice.cell.length; i++) {
			if(this.previousChoice.cell[i].value === 1) {
				ctx.fillStyle = 'black';
				ctx.fillRect(this.previousChoice.cell[i].x+2, this.previousChoice.cell[i].y+2, this.previousChoice.cell[i].w-4, this.previousChoice.cell[i].h-4);
			}else if(this.previousChoice.cell[i].value === 2) {
				ctx.fillStyle = "white";
				ctx.fillRect(this.previousChoice.cell[i].x + 2, this.previousChoice.cell[i].y + 2, this.previousChoice.cell[i].w - 4, this.previousChoice.cell[i].h - 4);
				// ctx.beginPath();
				ctx.moveTo(this.previousChoice.cell[i].x + 4, this.previousChoice.cell[i].y + 4);
				ctx.lineTo(this.previousChoice.cell[i].x + this.blockSize - 4, this.previousChoice.cell[i].y + this.blockSize - 4);
				ctx.moveTo(this.previousChoice.cell[i].x + this.blockSize - 4, this.previousChoice.cell[i].y + 4);
				ctx.lineTo(this.previousChoice.cell[i].x + 4, this.previousChoice.cell[i].y + this.blockSize - 4);
				// ctx.stroke();
				// ctx.closePath();
			}else{
				ctx.fillStyle = "white";
				ctx.fillRect(this.previousChoice.cell[i].x + 2, this.previousChoice.cell[i].y + 2, this.previousChoice.cell[i].w - 4, this.previousChoice.cell[i].h - 4);
			}
		}
		ctx.stroke();
		ctx.closePath();
		this.previousChoice.cell = []; // gia na kanw clear ton pinaka
	}

	this.currentChoice.cell = cell;
	this.previousChoice.cell.push(cell);
	this.previousChoice.active = true;

	ctx.strokeStyle = "red";
	ctx.lineWidth   = 4;
	ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
	ctx.strokeStyle = "black";
}

Nonogram.prototype.drawPreview = function(cell) {
	let x = 0;
	let y = 0;
	let widthPreview = this.maxRowNumberSize * this.blockSize;
	let heightPreview = this.maxColumnNumberSize * this.blockSize;
	let size;

	if(widthPreview == heightPreview) {
		size = widthPreview;
		x = (Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length));
		y = (Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length));
	}else if(widthPreview > heightPreview){
		size = heightPreview;
		x = Math.floor(((cell.x) - widthPreview) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}else{
		size = widthPreview-8;
		x = Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - heightPreview) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}
	let widthCell = Math.floor(size / this.levelGrid[0].length);
	let heightCell = Math.floor(size / this.levelGrid.length);

	if(cell.value === 1) {
		ctx.fillStyle = "black";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
	}else{
		ctx.fillStyle = "white";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
	}
}

//Γέμισμα των κελιών ανάλογα με το tool
Nonogram.prototype.fillCels = function(mouseX, mouseY) {
	ctx.lineWidth = 3;
	ctx.beginPath();
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
			if(this.rowNumbersGrid[i].value === 0) {
				ctx.strokeStyle = "red";
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
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
				ctx.strokeStyle = "red";
				ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
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
	ctx.stroke();
	ctx.closePath();
	if(this.fillCellChoice == "default") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value == 0) { //fill the cell black
					this.emptyGrid[i].value = 1;
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
		    	}else if(this.emptyGrid[i].value == 1) { //fill the cell with a X
			    	this.emptyGrid[i].value = 2;
			    	ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
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
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
				}
				break;
			}
		}
	}else if(this.fillCellChoice == "black"){
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 1) {
					this.emptyGrid[i].value = 1;//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
			    }else{
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
				}
				break;
			}
		}
	}else if(this.fillCellChoice == "x") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 2) {
					this.emptyGrid[i].value = 2;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
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
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
		    	}
		    	break;
	  		}
		}
	}else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 0) {
					this.emptyGrid[i].value = 0;
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					this.fillCurrentChoice(this.emptyGrid[i]);
			    }
			    break;
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
			// this.currentChoice.cell = this.emptyGrid[i]; //χρεαζεται?
		}
	}

	if(mouseX > x && (mouseX < x + this.blockSize)) { //gia ka8e sthlh
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				this.emptyGrid[i].value = startCellValue;
				//sun8hkh gia ta kelia
				if(startCellValue == 1) {
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";

				}else if(startCellValue == 2) {
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();

					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
				}else{
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);

					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
				}
			}
		}
	}

	if(mouseY > y && (mouseY < y + this.blockSize)) { //gia ka8e grammh
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				this.emptyGrid[i].value = startCellValue;
				//sun8hkh gia ta kelia
				if(startCellValue == 1) {
					//fil the cell black
					ctx.fillStyle = 'black';
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);

					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
					
				}else if(startCellValue == 2) {
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					ctx.beginPath();
					ctx.moveTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 4, this.emptyGrid[i].y + 4);
					ctx.lineTo(this.emptyGrid[i].x + 4, this.emptyGrid[i].y + this.blockSize - 4);
					ctx.stroke();
					ctx.closePath();

					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
				}else{
					ctx.fillStyle = "white";
					ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
					this.drawPreview(this.emptyGrid[i]);
					
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					ctx.strokeStyle = "black";
				}
			}
		}
	}
}

