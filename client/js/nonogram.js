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
function Nonogram(levelGrid) {
	this.width = 0;
	this.height = 0;
	this.blockSize =0; // Mege8os tou block/cell
	this.levelGrid = levelGrid;
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

	//Από εδώ παίρνω τους αριθμούς για κάθε γραμμή
	for(let i=0;i<this.levelGrid.length;i++) { //levelGrid.length = einai h ka8e grammh 0 ; 0 < 5 ; 0++
		this.rowNumbers[i] = []; //enas pinakas gia ka8e grammh
		this.rowNumbers[i][0] = 0;
	}

	for(let i = 0; i < this.levelGrid.length; i++) { // this.levelGrid.length = 5 
		let counter = 0;
		let depth = 0;
		for(let y = 0; y < this.levelGrid[i].length; y++) { //levelGrid[i].length einai h ka8e sthlh
			if(this.levelGrid[i][y] == 1) {
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

	//Από εδώ παίρνω τους αριθμούς για κάθε στήλη
	for(let sthlh=0;sthlh<this.levelGrid[0].length;sthlh++) {
		this.columnNumbers[sthlh] = [];
		this.columnNumbers[sthlh][0] = 0;
	}

	for(let sthlh=0;sthlh<this.levelGrid[0].length;sthlh++) {
		let counter = 0;
		let depth = 0;
		for(let grammh=0;grammh<this.levelGrid.length;grammh++) {
			if(this.levelGrid[grammh][sthlh]==1) {
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
		maxSize = this.maxRowNumberSize + this.levelGrid.length;
	}else{
		maxSize = this.maxColumnNumberSize  + this.levelGrid.length;
	}

	this.blockSize = Math.floor((size / maxSize) - 1);
	this.width = (this.levelGrid[0].length + this.maxRowNumberSize) * this.blockSize;
	this.height = (this.levelGrid.length + this.maxColumnNumberSize) * this.blockSize;

	for (let i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		for ( let y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0)); // βάζω ένα κουτάκη για κάθε κουτάκη στον πίνακα
		}
	}

	//Create row numbers cels
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

	//Create column numbers cels
	for (var i = 0; i < this.columnNumbers.length; i ++) {
		for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
			this.columnNumbersGrid.push(new NumberCell(this.blockSize, this.blockSize, ((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize), (y * this.blockSize), 0, this.columnNumbers[i][y]));
		}
	}

	//Ελέγχει τι έχει κάνει ο χρήστης μέχρι τώρα
	this.checkProgress = function() {
		var index = 0;
		for(var i=0;i<this.levelGrid.length;i++) {
			for(var y=0;y<this.levelGrid[i].length;y++) {
				if(this.levelGrid[i][y] == 1 && this.emptyGrid[index].value == 1) {
					this.correct = true;
				}
				else if(this.levelGrid[i][y] == 0 && (this.emptyGrid[index].value == 0 || this.emptyGrid[index].value == 2)){
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
				ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
				this.drawPreview(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value === 2) {
				ctx.fillStyle = "white";
				ctx.fillRect(this.emptyGrid[i].x + 2, this.emptyGrid[i].y + 2, this.emptyGrid[i].w - 4, this.emptyGrid[i].h - 4);
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

	//Auth thn sunarthsh thn exw gia otan ginete window resize
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
		this.width = (this.levelGrid[0].length + this.maxRowNumberSize) * this.blockSize;
		this.height = (this.levelGrid.length + this.maxColumnNumberSize) * this.blockSize;
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

	//Αυτή η συνάρτηση ξανά φτιάχνει τις συντεταγμένες των κελιών
	this.recalibrate = function(originX,originY,originW,originH,scaleFactor) {
		//πρέπει το κάθε κελί να προσαρμόζεται στο υπάρχων translate και scale
		this.emptyGrid = [];
		this.rowNumbers = [];
		this.columnNumbers = [];

		for(let i = 0; i < this.emptyGrid.length; i++) {
			for(let y = 0; y < this.emptyGrid[0].length; y++) {
				this.emptyGrid[i][y].x = (this.emptyGrid[i][y].x + originX)*scaleFactor;
				this.emptyGrid[i][y].y = (this.emptyGrid[i][y].y + originY)*scaleFactor;
				this.emptyGrid[i][y].w = (this.emptyGrid[i][y].w + originW)*scaleFactor;
				this.emptyGrid[i][y].h = (this.emptyGrid[i][y].h + originH)*scaleFactor;
				

			}
		}
	}
}