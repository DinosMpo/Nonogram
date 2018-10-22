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
	this.correctGrid = correctGrid;
	this.emptyGrid = []; // Adeio nonogram , tou xrhsth
	this.rowNumbers = [];
	this.columnNumbers = [];
	this.maxRowNumberSize = 0;
	this.maxColumnNumberSize = 0;
	this.rowNumbersGrid = [];
	this.columnNumbersGrid = [];
	this.correct = false;
	this.userChoices = [];// einai gia to store
	this.fillCellChoice = "default";
	this.currentChoice = {};
	this.previousChoice = {
		active: false
	};

	this.currentChoice.cell = [];
	this.previousChoice.cell = [];

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
	let windowHeight = window.innerHeight;
	let size;
	let maxSize;

	if(windowWidth > windowHeight) {
		size = windowHeight - 30;
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

	this.findProgress = function() {
		let progress = 0;
		for(let i=0; i<this.emptyGrid.length; i++) {
			if(this.emptyGrid[i].value != 0) {
				progress++;
			}
		}
		progress = (progress * 100) / this.emptyGrid.length; //25/100 * 1/x = 25*x / 1*100 = 25*x / 100 = x = 100/25 = 4
		// console.log(progress);
		return Math.floor(progress);
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

	this.relocate = function() {
		//Find window size
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		if(windowWidth > windowHeight) {
			size = windowHeight - 30;
		}else{
			size = windowWidth;
		}
		//Calculate blocksize
		this.blockSize = Math.floor((size / maxSize) - 1);
		//Size of nonogram
		this.width = (this.correctGrid[0].length + this.maxRowNumberSize) * this.blockSize;
		this.height = (this.correctGrid.length + this.maxColumnNumberSize) * this.blockSize;
		//Make size of canvas equals nonograms
		canvas.width = this.width;
		canvas.height = this.height;

		//Draw the grid
		ctx.fillStyle = "white";
		ctx.lineWidth = 1;
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
			ctx.closePath();
		}
		for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
			ctx.beginPath(); // Auth h grammh nomizw den xreiazetai giati xrhsimopoiei thn apo panw
			ctx.moveTo(y,0);
			ctx.lineTo(y, this.height);
			ctx.stroke();
			ctx.closePath();
		}
		for ( let i = 0; i < this.maxColumnNumberSize; i++ ) { //Gia ka8e grammh
			ctx.beginPath();
			ctx.moveTo((this.maxRowNumberSize ) * this.blockSize ,(i+1)*this.blockSize);
			ctx.lineTo(this.width, (i+1)*this.blockSize);
			ctx.stroke();
			ctx.closePath();
		}
		for ( let i = 0; i < this.maxRowNumberSize; i++ ) { //Gia ka8e sthlh
			ctx.beginPath();
			ctx.moveTo( (i+1)*this.blockSize , (this.maxColumnNumberSize ) * this.blockSize);
			ctx.lineTo( (i+1)*this.blockSize , this.height);
			ctx.stroke();
			ctx.closePath();
		}
		var indexCells = 0;
		for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
			for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) {
				// this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0));
				this.emptyGrid[indexCells].w = this.blockSize;
				this.emptyGrid[indexCells].h = this.blockSize;
				this.emptyGrid[indexCells].x = y;
				this.emptyGrid[indexCells].y = i;
				indexCells++;
			}
		}

		//Numbers of every row
		var indexRow = 0;
		for (var i = 0; i < this.rowNumbers.length; i ++) {
			for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
				this.rowNumbersGrid[indexRow].w = this.blockSize;
				this.rowNumbersGrid[indexRow].h = this.blockSize;
				this.rowNumbersGrid[indexRow].x = (y * this.blockSize);
				this.rowNumbersGrid[indexRow].y = ( (this.maxColumnNumberSize) * this.blockSize) + (i * this.blockSize);
				// this.rowNumbersGrid[i*y].number = this.rowNumbers[i][y];
				indexRow++;
			}
		}
		for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
			ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
			ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.rowNumbersGrid[i].y) + (this.blockSize / 2) + 5);
		}
		//Numbers of every column
		var indexColumn = 0;
		for (var i = 0; i < this.columnNumbers.length; i ++) {
			for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
				this.columnNumbersGrid[indexColumn].w = this.blockSize;
				this.columnNumbersGrid[indexColumn].h = this.blockSize;
				this.columnNumbersGrid[indexColumn].x = ((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize);
				this.columnNumbersGrid[indexColumn].y = (y * this.blockSize);
				indexColumn++;
			}
		}
		for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
			ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
		}
	}
}