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
	this.userChoices = {};// einai gia to store
	this.userChoices.levelGrid = [];
	this.userChoices.rowNumbersGrid = [];
	this.userChoices.columnNumbersGrid = [];
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

	for(let row = 0; row < this.levelGrid.length; row++) { // this.levelGrid.length = 5 
		let counter = 0;
		let depth = 0;
		for(let y = 0; y < this.levelGrid[row].length; y++) { //levelGrid[row].length einai h ka8e sthlh
			if(this.levelGrid[row][y] == 1) {
				counter += 1;
				this.rowNumbers[row][depth] = counter
			}
			else{
				if(counter != 0) {
					this.rowNumbers[row][depth] = counter;
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
	for(let i=0;i<this.levelGrid[0].length;i++) {
		this.columnNumbers[i] = [];
		this.columnNumbers[i][0] = 0;
	}

	for(let column=0;column<this.levelGrid[0].length;column++) {
		let counter = 0;
		let depth = 0;
		for(let row=0;row<this.levelGrid.length;row++) {
			if(this.levelGrid[row][column]==1) {
				counter += 1;
				this.columnNumbers[column][depth] = counter;
			}
			else{
				if(counter != 0) {
					this.columnNumbers[column][depth] = counter;
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

	this.blockSize = Math.floor((size / maxSize))-1; // το -1 νομιζω οτι ειναι για να μην ξεπερναει ο canvas το μεγεθος του παραθυρου και για να μην βγαινει το scroll γι αυτον το λογο 
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
			this.userChoices.levelGrid[i] = this.emptyGrid[i].value;
		}

		for(let i=0; i<this.rowNumbersGrid.length; i++) {
			this.userChoices.rowNumbersGrid[i] = this.rowNumbersGrid[i].value;
		}
		
		for(let i=0; i<this.columnNumbersGrid.length; i++) {
			this.userChoices.columnNumbersGrid[i] = this.columnNumbersGrid[i].value;
		}
	}

	this.continueProgress = function(levelGrid, rowNumbersGrid, columnNumbersGrid) {
		this.userChoices.levelGrid = levelGrid;
		this.userChoices.rowNumbersGrid = rowNumbersGrid;
		this.userChoices.columnNumbersGrid = columnNumbersGrid;
		//Οι επιλογές του level grid
		for(let i=0; i < this.emptyGrid.length; i++) {
			this.emptyGrid[i].value = this.userChoices.levelGrid[i];
		}
		//Οι επιλογές του row grid
		for(let i=0; i<this.rowNumbersGrid.length; i++) {
			this.rowNumbersGrid[i].value = this.userChoices.rowNumbersGrid[i];
		}
		//Οι επιλογές του column grid
		for(let i=0; i<this.columnNumbersGrid.length; i++) {
			this.columnNumbersGrid[i].value = this.userChoices.columnNumbersGrid[i];
		}
		//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά
		for(let i=0; i<this.emptyGrid.length; i++) {
			if(this.emptyGrid[i].value === 1){
				//fil the cell black
				this.drawBlackCell(this.emptyGrid[i]);
				this.drawPreview(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value === 2) {
				// this.drawWhiteCell(this.emptyGrid[i]);
				this.drawXCell(this.emptyGrid[i]);
				this.drawPreview(this.emptyGrid[i]);
			}
		}
		//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά των αριθμών
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.lineWidth = 3;
		for(let i=0; i<this.rowNumbersGrid.length; i++) {
			if(this.rowNumbersGrid[i].value === 1) {
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
			}
		}

		for(let i=0; i<this.columnNumbersGrid.length; i++) {
			if(this.columnNumbersGrid[i].value === 1) {	
				ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
			}
		}
		ctx.closePath();
		ctx.stroke();
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
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		this.drawGrid();
		ctx.restore();
		//---recalibrate the coordinates of every cell
		var indexCells = 0;
		for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
			for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) {
				this.emptyGrid[indexCells].w = this.blockSize;
				this.emptyGrid[indexCells].h = this.blockSize;
				this.emptyGrid[indexCells].x = y;
				this.emptyGrid[indexCells].y = i;
				indexCells++;
			}
		}

		//Cell numbers of every row
		var indexRow = 0;
		for (var i = 0; i < this.rowNumbers.length; i ++) {
			for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
				this.rowNumbersGrid[indexRow].w = this.blockSize;
				this.rowNumbersGrid[indexRow].h = this.blockSize;
				this.rowNumbersGrid[indexRow].x = (y * this.blockSize);
				this.rowNumbersGrid[indexRow].y = ( (this.maxColumnNumberSize) * this.blockSize) + (i * this.blockSize);
				indexRow++;
			}
		}
		//Cell numbers of every column
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
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		this.drawRowNumbers();
		this.drawColumnNumbers();
		ctx.restore();
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