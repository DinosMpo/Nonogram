//Draw the grid
Nonogram.prototype.drawGrid = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.fillStyle = "#e0e0d1"; //mpez
	//για τις στήλες
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height-(this.maxColumnNumberSize * this.blockSize));
	//για τις γραμμές
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width-(this.maxRowNumberSize * this.blockSize), this.maxColumnNumberSize * this.blockSize);
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.lineWidth = 1;
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
	//Ενα περίγραμμα γύρω από το nonogram
	ctx.fillStyle = 'black';
	ctx.lineWidth = 1;
	ctx.strokeRect(-1,-1,this.width+1,this.height+1);
	ctx.stroke();
	ctx.closePath();
}

Nonogram.prototype.drawRowNumbers = function() {
	ctx.fillStyle = 'black';
	for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
	}
}

Nonogram.prototype.drawColumnNumbers = function() {
	ctx.fillStyle = 'black';
	for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
	}
}

Nonogram.prototype.strokeCurrentChoice = function(cell) {
	//for the current and previous choice
	if(this.previousChoice.active) {
		ctx.beginPath();
		for(let i=0; i<this.previousChoice.cell.length; i++) {
			if(this.previousChoice.cell[i].value === 1) {
				this.drawWhiteCell(this.previousChoice.cell[i]);
				this.drawBlackCell(this.previousChoice.cell[i]);
			}else if(this.previousChoice.cell[i].value === 2) {
				this.drawWhiteCell(this.previousChoice.cell[i]);
				this.drawXCell(this.previousChoice.cell[i]);
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
}

Nonogram.prototype.strokeTeamMateChoice = function(cell) {
	//for the current and previous choice
	if(this.previousTeamMateChoice.active) {
		ctx.beginPath();
		for(let i=0; i<this.previousTeamMateChoice.cell.length; i++) {
			if(this.previousTeamMateChoice.cell[i].value === 1) {
				this.drawWhiteCell(this.previousTeamMateChoice.cell[i]);
				this.drawBlackCell(this.previousTeamMateChoice.cell[i]);
			}else if(this.previousTeamMateChoice.cell[i].value === 2) {
				this.drawWhiteCell(this.previousTeamMateChoice.cell[i]);
				this.drawXCell(this.previousTeamMateChoice.cell[i]);
			}else{
				ctx.fillStyle = "white";
				ctx.fillRect(this.previousTeamMateChoice.cell[i].x + 2, this.previousTeamMateChoice.cell[i].y + 2, this.previousTeamMateChoice.cell[i].w - 4, this.previousTeamMateChoice.cell[i].h - 4);
			}
		}
		ctx.stroke();
		ctx.closePath();
		this.previousTeamMateChoice.cell = [];
	}
	this.previousTeamMateChoice.cell.push(cell);
	this.previousTeamMateChoice.active = true;
	ctx.strokeStyle = "#0099ff";
	ctx.lineWidth   = 4;
	ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
}

Nonogram.prototype.drawPreview = function(cell) {
	let x = 0;
	let y = 0;
	let widthPreview = this.maxRowNumberSize * this.blockSize;
	let heightPreview = this.maxColumnNumberSize * this.blockSize;
	let size;

	if(widthPreview == heightPreview) {
		//To size einai to mege8os tou drawPreview
		size = widthPreview-2; //giati?Me thn afairesh dhmiourgoume ena keno apo deksia gia na mhn einai kolhmeno deksias
		console.log("size: "+size);
		//To x
		x = (Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length));
		// console.log("cell.x: "+cell.x);
		// console.log("((cell.x) - size) / this.blockSize: "+((cell.x) - size) / this.blockSize);
		// console.log("Math.floor(((cell.x) - size) / this.blockSize): "+ Math.floor(((cell.x) - size) / this.blockSize));
		// console.log('size / this.levelGrid[0].length: '+size / this.levelGrid[0].length);
		// console.log('Math.floor(size / this.levelGrid[0].length): '+Math.floor(size / this.levelGrid[0].length));
		// console.log("x: "+x);
		y = (Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length));
		// console.log("y: "+y);
	}else if(widthPreview > heightPreview){
		size = heightPreview;
		x = Math.floor(((cell.x) - widthPreview) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}else{
		size = widthPreview-8;
		x = Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - heightPreview) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}
	let widthCell = Math.floor(size / this.levelGrid[0].length); //328/5
	let heightCell = Math.floor(size / this.levelGrid.length); //328/5

	if(cell.value === 1) {
		ctx.fillStyle = "black";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
		// ctx.fillRect(x + widthCell, y + heightCell, widthCell, heightCell);
	}else{
		ctx.fillStyle = "white";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
		// ctx.fillRect(x + widthCell, y + heightCell, widthCell, heightCell);

	}
}

//Draw the cell black
let drawBlackCellValue = 4;
Nonogram.prototype.drawBlackCell = function(cell) {
	ctx.fillStyle = 'black';
	ctx.fillRect(cell.x + drawBlackCellValue, cell.y + drawBlackCellValue, cell.w - (drawBlackCellValue * 2), cell.h - (drawBlackCellValue * 2));
}

//Draw the cell white
let drawWhiteCellValue = 2;
Nonogram.prototype.drawWhiteCell = function(cell) {
	ctx.fillStyle = "white";
	ctx.fillRect(cell.x + drawWhiteCellValue, cell.y + drawWhiteCellValue, cell.w - (drawWhiteCellValue * 2), cell.h - (drawWhiteCellValue * 2));
}

//Draw the cell X
let drawXCellValue = 6;
Nonogram.prototype.drawXCell = function(cell) {
	ctx.strokeStyle = "black";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(cell.x + drawXCellValue, cell.y + drawXCellValue);
	ctx.lineTo(cell.x + this.blockSize - drawXCellValue, cell.y + this.blockSize - drawXCellValue);
	ctx.moveTo(cell.x + this.blockSize - drawXCellValue, cell.y + drawXCellValue);
	ctx.lineTo(cell.x + drawXCellValue, cell.y + this.blockSize - drawXCellValue);
	ctx.stroke();
	ctx.closePath();
}

//Γέμισμα των κελιών ανάλογα με το tool
Nonogram.prototype.fillCels = function(mouseX, mouseY) {
	//Ακυρώνει τα κελιά που έχω βρει με κόκκινο
	ctx.lineWidth = 3;
	ctx.beginPath();
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
			if(this.rowNumbersGrid[i].value === 0) {
				ctx.strokeStyle = "red";
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
				this.rowNumbersGrid[i].value = 1;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
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
				this.columnNumbersGrid[i].value = 1;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
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
					this.cellChoices.update();
					this.cellChoices.pastCells.push({cell: i, value: 0});
					this.emptyGrid[i].value = 1;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
		    	}else if(this.emptyGrid[i].value == 1) { //fill the cell with a X
					this.cellChoices.update();
					this.cellChoices.pastCells.push({cell: i, value: 1});
			    	this.emptyGrid[i].value = 2;
			    	this.drawWhiteCell(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
				}else { //Clear the cell
					this.cellChoices.update();
					this.cellChoices.pastCells.push({cell: i, value: 2});
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
				}
				break;
			}
		}
	}else if(this.fillCellChoice == "black"){
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 1) {
					this.cellChoices.update();
					if(this.emptyGrid[i].value == 0) {
						this.cellChoices.pastCells.push({cell: i, value: 0});
					}else{
						this.cellChoices.pastCells.push({cell: i, value: 2});
					}
					this.emptyGrid[i].value = 1;//fil the cell black
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
			    }else{
					this.cellChoices.update();
			    	this.cellChoices.pastCells.push({cell: i, value: 1});
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
				}
				break;
			}
		}
	}else if(this.fillCellChoice == "x") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 2) {
					this.cellChoices.update();
					if(this.emptyGrid[i].value == 0) {
						this.cellChoices.pastCells.push({cell: i, value: 0});
					}else{
						this.cellChoices.pastCells.push({cell: i, value: 1});
					}
					this.emptyGrid[i].value = 2;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
		    	}else{
					this.cellChoices.update();
			    	this.cellChoices.pastCells.push({cell: i, value: 2});
		    		this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
		    	}
		    	break;
	  		}
		}
	}else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 0) {
					this.cellChoices.update();
					if(this.emptyGrid[i].value == 1) {
						this.cellChoices.pastCells.push({cell: i, value: 1});
					}else{
						this.cellChoices.pastCells.push({cell: i, value: 2});
					}
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.cellChoices.index ++;
			    }
			    break;
		 	}
		}
	}
}

//Γέμισμα πολλαπλών κελιών
Nonogram.prototype.fillMultiCells = function(mouseX, mouseY, startPointMouseX, startPointMouseY) {
	var startCellValue = 0;
	var x = 0;
	var y = 0;
	for(var i=0;i<this.emptyGrid.length;i++) { // briskw to arxiko keli
		if(startPointMouseX >= this.emptyGrid[i].x && startPointMouseY >= this.emptyGrid[i].y && startPointMouseX <= (this.emptyGrid[i].x + this.blockSize) && startPointMouseY <= (this.emptyGrid[i].y + this.blockSize)) {
			startCellValue = this.emptyGrid[i].value;
			x = this.emptyGrid[i].x;
			y = this.emptyGrid[i].y;
			// this.currentChoice.cell = this.emptyGrid[i]; //χρεαζεται? δεν χρειάζεται το χω σβήσει απο το κείμενο
		}
	}
	if(mouseX > x && (mouseX < x + this.blockSize)) {
		for(var i=0;i<this.emptyGrid.length;i++) { //για κάθε στήλη. πιο σωστο είναι this.emptyGrid.length[0]
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				//Αν βρίσκεται ακόμα στο ίδιο κελί βγαίνει απο την συνάρτηση
				if(this.emptyGrid[i].x == x && this.emptyGrid[i].y == y) {
					return;
				}else if(this.emptyGrid[i].x == this.currentChoice.cell.x && this.emptyGrid[i].y == this.currentChoice.cell.y) {
					return;
				}
				this.cellChoices.pastCells.push({cell: i, value: this.emptyGrid[i].value});
				this.emptyGrid[i].value = startCellValue;
				if(startCellValue == 1) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					//αποθηκεύουμε την τωρινή επιλογή κελιού και ταυτόχρονα γίνεται και η τελευταία μας επιλογή
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.cellChoices.index ++;
				}else if(startCellValue == 2) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.cellChoices.index ++;
				}else{
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.cellChoices.index ++;
				}
			}
		}
	}
	if(mouseY > y && (mouseY < y + this.blockSize)) { //Για κάθε γραμμή
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				//Αν βρίσκεται ακόμα στο ίδιο κελί βγαίνει απο την συνάρτηση
				if(this.emptyGrid[i].x == x && this.emptyGrid[i].y == y) {
					return;
				}else if(this.emptyGrid[i].x == this.currentChoice.cell.x && this.emptyGrid[i].y == this.currentChoice.cell.y) {
					return;
				}
				this.cellChoices.pastCells.push({cell: i, value: this.emptyGrid[i].value});
				this.emptyGrid[i].value = startCellValue;
				if(startCellValue == 1) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.cellChoices.index ++;
				}else if(startCellValue == 2) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i])
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 2});
					this.cellChoices.index ++;
				}else{
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.cellChoices.index ++;
				}
			}
		}
	}
}

//
Nonogram.prototype.redrawProgress = function() {
	//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά
		for(let i=0; i<this.emptyGrid.length; i++) {
			if(this.emptyGrid[i].value == 1){
				//fil the cell black
				this.drawBlackCell(this.emptyGrid[i]);
				this.drawPreview(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value == 2) {
				this.drawWhiteCell(this.emptyGrid[i]);
				this.drawXCell(this.emptyGrid[i]);
				this.drawPreview(this.emptyGrid[i]);
			}
		}
		//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά των αριθμών
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.lineWidth = 3;
		for(let i=0; i<this.rowNumbersGrid.length; i++) {
			if(this.rowNumbersGrid[i].value == 1) {
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
			}
		}

		for(let i=0; i<this.columnNumbersGrid.length; i++) {
			if(this.columnNumbersGrid[i].value == 1) {	
				ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
			}
		}
		ctx.closePath();
		ctx.stroke();
}