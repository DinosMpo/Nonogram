//Cell Object (einai ta kelia tou nonogram)
function Cell(w, h, x, y, value) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
}

//------------------------------------------------------------------------------------
//Cell object for the numbers
function NumberCell(w, h, x, y, value, number) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
	this.number = number;
}

//------------------------------------------------------------------------------------
//Nonogram Object
function Nonogram(correctGrid) {
	this.width = 0;
	this.height = 0;
	this.blockSize =0; // Mege8os tou block/cell
	this.correctGrid = correctGrid; // gt to exw balei auto?
	this.emptyGrid = []; // Adeio nonogram , tou xrhsth
	this.rowNumbers = [];
	this.columnNumbers = [];
	this.maxRowNumberSize = 0;
	this.maxColumnNumberSize = 0;
	this.rowNumbersGrid = [];
	this.columnNumbersGrid = [];
	this.correct = false;
	this.userChoices = [];// einai gia to store
	this.fillCellChoice = "default"; //Auto 8a xrhsimepsei gia ta tools
	this.currentChoice = {};
	this.previousChoice = {
		active: false
	};

	//Apo edw pairnw tous ari8mous gia ka8e grammh
	for(let i=0;i<this.correctGrid.length;i++) { //correctGrid.length = einai h ka8e grammh 0 ; 0 < 5 ; 0++
		this.rowNumbers[i] = []; //enas pinakas gia ka8e grammh
		this.rowNumbers[i][0] = 0;
	}

	for(let i = 0; i < this.correctGrid.length; i++) { // this.correctGrid.length = 5 
		let counter = 0;
		let depth = 0;

		for(let y = 0; y < this.correctGrid[i].length; y++) { //correctGrid[i].length einai h ka8e sthlh
			// this.userChoices[i][y] = 0;
			if(this.correctGrid[i][y] == 1) {
				counter += 1;
				this.rowNumbers[i][depth] = counter
			}
			else{
				if(counter != 0) {
					this.rowNumbers[i][depth] = counter;
					counter = 0;
					depth++;
				}
			}
		}
	}

	for (let i =0; i < this.rowNumbers.length; i ++) {
		if (this.maxRowNumberSize < this.rowNumbers[i].length) {
			this.maxRowNumberSize = this.rowNumbers[i].length;
		}
	}

	//Apo edw pairnw tous ari8mous gia ka8e sthllh
	for(let sthlh=0;sthlh<this.correctGrid[0].length;sthlh++) {
		this.columnNumbers[sthlh] = [];
		this.columnNumbers[sthlh][0] = 0;
	}

	for(let sthlh=0;sthlh<this.correctGrid[0].length;sthlh++) {
		let counter = 0;
		let depth = 0;

		for(let grammh=0;grammh<this.correctGrid.length;grammh++) {
			if(this.correctGrid[grammh][sthlh]==1) {
				counter += 1;
				this.columnNumbers[sthlh][depth] = counter;
			}
			else{
				if(counter != 0) {
					this.columnNumbers[sthlh][depth] = counter;
					counter = 0;
					depth++;
				}
			}
		}
	}

	for (let i =0; i < this.columnNumbers.length; i ++) {
		if (this.maxColumnNumberSize < this.columnNumbers[i].length) {
			this.maxColumnNumberSize = this.columnNumbers[i].length;
		}
	}

	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight ;
	let size;
	let maxSize;

	if(windowWidth > windowHeight) {
		size = windowHeight - 50;
	}else{
		size = windowWidth;
	}

	if(this.maxRowNumberSize > this.maxColumnNumberSize) {
		maxSize = this.maxRowNumberSize + this.correctGrid.length;
	}else{
		maxSize = this.maxColumnNumberSize  + this.correctGrid.length;
	}

	this.blockSize = Math.floor((size / maxSize) - 1);

	this.width = (this.correctGrid[0].length + this.maxRowNumberSize) * this.blockSize;
	this.height = (this.correctGrid.length + this.maxColumnNumberSize) * this.blockSize;


	this.fillRowNumbers = function() {
		for (var i = 0; i < this.rowNumbers.length; i ++) {
			for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
				this.rowNumbersGrid.push(new NumberCell(
				this.blockSize, 
				this.blockSize, 
				(y * this.blockSize), 
				( (this.maxColumnNumberSize) * this.blockSize) + (i * this.blockSize), 
				0,  
				this.rowNumbers[i][y]));
			}
		}

		for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
			ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
			ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.rowNumbersGrid[i].y) + (this.blockSize / 2) + 5);
		}
	}

	this.fillColumnNumbers = function() {
		for (var i = 0; i < this.columnNumbers.length; i ++) {
			for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
				this.columnNumbersGrid.push(new NumberCell(this.blockSize, this.blockSize, ((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize), (y * this.blockSize), 0, this.columnNumbers[i][y]));
			}
		}

		for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
			ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
		}
	}

	

	//Elegxei ti exei kanei o xrhsths mexri twra
	this.checkProgress = function() {
		var index = 0;
		for(var i=0;i<this.correctGrid.length;i++) {
			for(var y=0;y<this.correctGrid[i].length;y++) {
				if(this.correctGrid[i][y] == 1 && this.emptyGrid[index].value == 1) {
					this.correct = true;
				}
				else if(this.correctGrid[i][y] == 0 && (this.emptyGrid[index].value == 0 || this.emptyGrid[index].value == 2)){
					this.correct = true;
				}
				else{
					this.correct = false;
					return false;
				}
				index ++;
			}
		}

		if(this.correct == true) {
			return true;
		}
	}

	this.findUserChoices = function() {
		for(let i = 0; i < this.emptyGrid.length; i++) {
			this.userChoices[i] = this.emptyGrid[i].value;
		}
	}

	this.continueProgress = function(level) {
		this.userChoices = level;;
		for(let i=0; i < this.emptyGrid.length; i++) {
			this.emptyGrid[i].value = this.userChoices[i];
		}

		for(let i=0; i<this.emptyGrid.length; i++) {
			if(this.emptyGrid[i].value === 1){
				//fil the cell black
				ctx.fillStyle = 'black';
				ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
				this.drawPreview(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value === 2) {
				ctx.fillStyle = "white";
				ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 3, this.emptyGrid[i].h - 3);
				this.drawPreview(this.emptyGrid[i]);
				ctx.font = (this.blockSize) + "px Arial";
				ctx.fillStyle = "black";
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.moveTo(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2);
				ctx.lineTo(this.emptyGrid[i].x + this.blockSize - 2, this.emptyGrid[i].y + this.blockSize - 2);
				ctx.moveTo(this.emptyGrid[i].x + this.blockSize - 2, this.emptyGrid[i].y + 2);
				ctx.lineTo(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + this.blockSize - 2);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
}