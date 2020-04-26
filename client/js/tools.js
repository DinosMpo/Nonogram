function createSinglePlayerTools() {
	//Tools creation
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['undo', 'redo', 'clear', 'help', 'home'];
	const tools = document.getElementById("tools");
	const singleplayer = document.createElement('div');
	singleplayer.id = "singleplayer-tools";
	tools.appendChild(singleplayer);

	for(let i=0; i<singlePlayerTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.className = singlePlayerTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	for(let i=0; i<singlePlayerExtraTools.length; i++) {   
		var li = document.createElement('li');
		li.classList.add("extra-tool");
		var div = document.createElement('div');
		div.className = singlePlayerExtraTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	singleplayer.firstElementChild.classList.add("active");
};

function createMultiPlayerTools() {
	//Tools creation
	const multiPlayerTools = ['default', 'black', 'x', 'white'];
	const multiPlayerExtraTools = ['home'];
	const tools = document.getElementById("tools");
	const multiplayer = document.createElement('div');
	multiplayer.id = "multiplayer-tools";
	tools.appendChild(multiplayer);

	for(let i=0; i<multiPlayerTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.className = multiPlayerTools[i];
		var img = document.createElement('img');
		img.src = "img/" + multiPlayerTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		multiplayer.appendChild(li);
	}

	for(let i=0; i<multiPlayerExtraTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.className = multiPlayerExtraTools[i];
		if(multiPlayerExtraTools[i] === 'home') {
			div.classList.add('exit-multiplayer');
		}
		var img = document.createElement('img');
		img.src = "img/" + multiPlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		multiplayer.appendChild(li);
	}	

	multiplayer.firstElementChild.classList.add("active");
};

function createCorrectLevelTools() {
	//Tools creation
	const correctLevelTools = ['restart'];
	const tools = document.getElementById("tools");
	const correctSinglePlayerLevel = document.createElement('div');
	correctSinglePlayerLevel.id = "correct-level-tools";
	tools.appendChild(correctSinglePlayerLevel);

	for(let i=0; i<correctLevelTools.length; i++) {
		let li = document.createElement('li');
		li.classList.add('correct-tool');
		let div = document.createElement('div');
		div.id = correctLevelTools[i];
		div.innerHTML = correctLevelTools[i].toUpperCase();
		li.appendChild(div);
		correctSinglePlayerLevel.appendChild(li);
	}
};

// Singleplayer tools
createSinglePlayerTools();

//Multiplayer tools
createMultiPlayerTools();

//Correct level tools
// createCorrectLevelTools();

//For the default tool
$(".default").parent().click(function(){
	if(nonogram.fillCellChoice !== "default") {
		nonogram.fillCellChoice = "default";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}
});

//For the black tool
$(".black").parent().click(function(){
	if(nonogram.fillCellChoice !== "black") {
		nonogram.fillCellChoice = "black";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the x tool
$(".x").parent().click(function(){
	if(nonogram.fillCellChoice !== "x") {
		nonogram.fillCellChoice = "x";
		// $("#x").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#x").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the white tool
$(".white").parent().click(function(){
	if(nonogram.fillCellChoice !== "white") {
		nonogram.fillCellChoice = "white";
		// $("#white").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#white").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the undo tool
$(".undo").parent().click(function(){
	if(nonogram.cellChoices.index == 0) {
		return;
	}
	let index = nonogram.cellChoices.index-1;
	let cell = nonogram.cellChoices.pastCells[index].cell;
	if(nonogram.cellChoices.pastCells[index].value == 0) {
		//white cell
		nonogram.emptyGrid[cell].value = 0;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}else if(nonogram.cellChoices.pastCells[index].value == 1) {
		//black cell
		nonogram.emptyGrid[cell].value = 1;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}else if(nonogram.cellChoices.pastCells[index].value == 2) {
		//x cell
		nonogram.emptyGrid[cell].value = 2;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawXCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	nonogram.findProgress();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
	
});

$(".redo").parent(). click(function(){
	if(nonogram.cellChoices.index == nonogram.cellChoices.newCells.length) {
		return;
	}
	
	let index;
	index = nonogram.cellChoices.index;
	let cell = nonogram.cellChoices.newCells[index].cell;
	if(nonogram.cellChoices.newCells[index].value == 0) {
		//white cell
		nonogram.emptyGrid[cell].value = 0;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}else if(nonogram.cellChoices.newCells[index].value == 1) {
		//black cell
		nonogram.emptyGrid[cell].value = 1;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}else if(nonogram.cellChoices.newCells[index].value == 2) {
		//x cell
		nonogram.emptyGrid[cell].value = 2;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawXCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	nonogram.findProgress();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
});

//For the clear tool
$(".clear").click(function() {
	for(let i=0; i<nonogram.emptyGrid.length; i++) {
		nonogram.emptyGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
		nonogram.rowNumbersGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
		nonogram.columnNumbersGrid[i].value = 0;
	}

	ctx.clearRect(0,0,canvas.width, canvas.height);
	nonogram.drawGrid();
	nonogram.drawRowNumbers();
	nonogram.drawColumnNumbers();
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	// store("correct-" + currentStage, 0);
	// $(".correct-" + currentStage).hide();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
	nonogram.cellChoices.index = 0;
	nonogram.cellChoices.update();
});

//For the help tool
$(".help").click(function() {
	for(let i=0; i<nonogram.levelGrid.length; i++) {
		for(let y=0; y<nonogram.levelGrid[i].length; y++) {
			if(nonogram.levelGrid[i][y] === 1 && nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 2) { //ama exei balei x se shmeio pou 8a eprepe na uparxei mauro keli 
				nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value = 1;
				nonogram.findUserChoices();
				store(currentStage, nonogram.userChoices);
				ctx.strokeStyle = "green";
				ctx.lineWidth   = 4;
				ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
				ctx.strokeStyle = "black";
				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);

				}, 400);

				setTimeout( function() {
					ctx.fillStyle = "black";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
					ctx.lineWidth   = 4;
					ctx.strokeStyle = "green";
					ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					ctx.strokeStyle = "black";
				}, 1400 );

				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 2400);

				setTimeout( function() {
					ctx.fillStyle = "black";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
					// ctx.lineWidth   = 4;
					// ctx.strokeStyle = "green";
					// ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					// ctx.strokeStyle = "black";
				}, 3400 );
				nonogram.drawPreview(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);

				ctx.strokeStyle = "black";

				return;
			}else if(nonogram.levelGrid[i][y] === 0 && nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 1) {
				nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value = 2;
				nonogram.findUserChoices();
				store(currentStage, nonogram.userChoices);
				ctx.strokeStyle = "green";
				ctx.lineWidth   = 4;
				ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
				ctx.strokeStyle = "black";
				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 400);

				setTimeout( function() {
					ctx.strokeStyle = "black";
					ctx.beginPath();
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					ctx.lineWidth   = 4;
					ctx.strokeStyle = "green";
					ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					ctx.strokeStyle = "black";
				}, 1400 );

				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 2400);

				setTimeout( function() {
					ctx.fillStyle = "white";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].h - 3);
					ctx.strokeStyle = "black";
					ctx.beginPath();
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					// ctx.lineWidth   = 4;
					// ctx.strokeStyle = "green";
					// ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					// ctx.strokeStyle = "black";
				}, 3400 );
				nonogram.drawPreview(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);

				ctx.strokeStyle = "black";

				return;
			}
		}
	}
});

//Home button
$(".home").click(function(){
	// if(state === "multiplayer" && turn === false) {
	// 	$("#waiting-screen").hide();
	// }

	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	container.style.top = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#menu").show();
	$("#clients-count").show();	
});

//Restart button
$('#restart').click(function() {
	for(let i=0; i<nonogram.emptyGrid.length; i++) {
		nonogram.emptyGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
		nonogram.rowNumbersGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
		nonogram.columnNumbersGrid[i].value = 0;
	}

	ctx.clearRect(0,0,canvas.width, canvas.height);
	nonogram.drawGrid();
	nonogram.drawRowNumbers();
	nonogram.drawColumnNumbers();
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	store("correct-" + currentStage, 0);
	$("#correct-level-tools").hide();
	$("#singleplayer-tools").show();
	$("#correct").hide();
	$(".correct-" + currentStage).hide();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
});

//exit-multiplayer class
$(".exit-multiplayer").click(function() {
	if(turn === false) {
		$("#waiting-screen").hide();
	}
	console.log(multiplayerGame);
	sock.emit('exit-multiplayer', multiplayerGame);
	currentLevel = "none";
	turn = false;
	wait = false;
});

let singleplayer = document.getElementById("singleplayer-tools");
let singleplayerTools = singleplayer.getElementsByClassName("tool");

for (let i = 0; i < singleplayerTools.length; i++) {
  singleplayerTools[i].addEventListener("click", function() {
    let current = singleplayer.getElementsByClassName("active");
    
    if(typeof current[0] !== 'undefined') {
    	current[0].className = current[0].className.replace(" active", "");
    }
    
    this.className += " active";
  });
}

let multiplayer = document.getElementById("multiplayer-tools");
let multiplayerTools = multiplayer.getElementsByClassName("tool");
// console.log(multiplayerTools);

for (let i = 0; i < multiplayerTools.length; i++) {
  multiplayerTools[i].addEventListener("click", function() {
    let current = multiplayer.getElementsByClassName("active");
    
    if(typeof current[0] !== 'undefined') {
    	current[0].className = current[0].className.replace(" active", "");
    }
    
    this.className += " active";
  });
}

function resetTools(toolContainer) {
	let singleplayer = document.getElementById("singleplayer-tools");
	let multiplayer = document.getElementById("multiplayer-tools");
	let currentTool;
	let tools;

	if(toolContainer === "singleplayer") {
		currentTool = singleplayer.getElementsByClassName("active");
		tools = singleplayer.getElementsByClassName("tool");
		currentTool[0].className = currentTool[0].className.replace(" active", "");
		tools[0].className += " active";
	}else {
		currentTool = multiplayer.getElementsByClassName("active");
		tools = multiplayer.getElementsByClassName("tool");
		currentTool[0].className = currentTool[0].className.replace(" active", "");
		tools[0].className += " active";
	}

}


















//------------------------------------
//Antigrafo apo auto pou eixa ftiaksei

// //For the black tool
// $("#black").parent().click(function(){
// 	if(nonogram.fillCellChoice !== "black") {
// 		nonogram.fillCellChoice = "black";
// 		$("#black").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
// 	}else{
// 		nonogram.fillCellChoice = "default";
// 		$("#black").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// 	}
// });

// //For the x tool
// $("#x").parent().click(function(){
// 	if(nonogram.fillCellChoice !== "x") {
// 		nonogram.fillCellChoice = "x";
// 		$("#x").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
// 	}else{
// 		nonogram.fillCellChoice = "default";
// 		$("#x").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// 	}
// });

// //For the white tool
// $("#white").parent().click(function(){
// 	if(nonogram.fillCellChoice !== "white") {
// 		nonogram.fillCellChoice = "white";
// 		$("#white").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
// 	}else{
// 		nonogram.fillCellChoice = "default";
// 		$("#white").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// 	}
// });

// $("#tools").li().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"}); den kserw pws na to kanw auto

// $("#black").parent().click(function(){
// 	$("#black").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// });

// $("#x").parent().click(function(){
// 	$("#x").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// });

// $("#white").parent().click(function(){
// 	$("#white").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
// });
