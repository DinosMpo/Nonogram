function createSinglePlayerTools() {
	//Tools creation
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['undo', 'clear', 'help', 'home'];

	const tools = document.getElementById("tools");

	for(let i=0; i<singlePlayerTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.id = singlePlayerTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		tools.appendChild(li);
	}

	tools.firstElementChild.classList.add("active");

	for(let i=0; i<singlePlayerExtraTools.length; i++) {
		console.log(i);
		var li = document.createElement('li');
		li.classList.add("extra-tool");
		var div = document.createElement('div');
		div.id = singlePlayerExtraTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		tools.appendChild(li);
	}	
};

function createMultiPlayerTools() {
	//Tools creation
	const multiPlayerTools = ['default', 'black', 'x', 'white'];
	// const singlePlayerExtraTools = ['undo', 'help', 'home'];

	const tools = document.getElementById("tools");

	for(let i=0; i<multiPlayerTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.id = multiPlayerTools[i];
		var img = document.createElement('img');
		img.src = "img/" + multiPlayerTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		tools.appendChild(li);
	}

	tools.firstElementChild.classList.add("active");
};

// Singleplayer tools
createSinglePlayerTools();

//Multiplayer tools
// createMultiPlayerTools();


//For the default tool
$("#default").parent().click(function(){
	if(nonogram.fillCellChoice !== "default") {
		nonogram.fillCellChoice = "default";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}
});

//For the black tool
$("#black").parent().click(function(){
	if(nonogram.fillCellChoice !== "black") {
		nonogram.fillCellChoice = "black";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#black").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the x tool
$("#x").parent().click(function(){
	if(nonogram.fillCellChoice !== "x") {
		nonogram.fillCellChoice = "x";
		// $("#x").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#x").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the white tool
$("#white").parent().click(function(){
	if(nonogram.fillCellChoice !== "white") {
		nonogram.fillCellChoice = "white";
		// $("#white").parent().css({"background": "linear-gradient(to bottom right, grey, #999966)"});
	}else{
		nonogram.fillCellChoice = "default";
		// $("#white").parent().css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the clear tool
$("#clear").click(function() {
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
	nonogram.fillRowNumbers();
	nonogram.fillColumnNumbers();
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices);
	store("correct-" + currentStage, 0);
	$(".correct-" + currentStage).hide();
});

//For the help tool
$("#help").click(function() {
	for(let i=0; i<nonogram.correctGrid.length; i++) {
		for(let y=0; y<nonogram.correctGrid[i].length; y++) {
			if(nonogram.correctGrid[i][y] === 1 && nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].value === 2) { //ama exei balei x se shmeio pou 8a eprepe na uparxei mauro keli 
				nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].value = 1;
				nonogram.findUserChoices();
				store(currentStage, nonogram.userChoices);
				ctx.strokeStyle = "green";
				ctx.lineWidth   = 4;
				ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
				ctx.strokeStyle = "black";
				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);

				}, 400);

				setTimeout( function() {
					ctx.fillStyle = "black";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
					ctx.lineWidth   = 4;
					ctx.strokeStyle = "green";
					ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					ctx.strokeStyle = "black";
				}, 1400 );

				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 2400);

				setTimeout( function() {
					ctx.fillStyle = "black";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
					// ctx.lineWidth   = 4;
					// ctx.strokeStyle = "green";
					// ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					// ctx.strokeStyle = "black";
				}, 3400 );
				nonogram.drawPreview(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y]);

				ctx.strokeStyle = "black";

				return;
			}else if(nonogram.correctGrid[i][y] === 0 && nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].value === 1) {
				nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].value = 2;
				nonogram.findUserChoices();
				store(currentStage, nonogram.userChoices);
				ctx.strokeStyle = "green";
				ctx.lineWidth   = 4;
				ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
				ctx.strokeStyle = "black";
				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 400);

				setTimeout( function() {
					ctx.strokeStyle = "black";
					ctx.beginPath();
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					ctx.lineWidth   = 4;
					ctx.strokeStyle = "green";
					ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					ctx.strokeStyle = "black";
				}, 1400 );

				setTimeout( function() {
						ctx.fillStyle = "white";
						ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
										nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
						ctx.lineWidth   = 4;
						ctx.strokeStyle = "green";
						ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
						ctx.strokeStyle = "black";
				}, 2400);

				setTimeout( function() {
					ctx.fillStyle = "white";
					ctx.fillRect(	nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 2, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].w - 3, 
									nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].h - 3);
					ctx.strokeStyle = "black";
					ctx.beginPath();
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.moveTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + nonogram.blockSize - 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + 4);
					ctx.lineTo(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x + 4, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y + nonogram.blockSize - 4);
					ctx.stroke();
					ctx.closePath();
					// ctx.lineWidth   = 4;
					// ctx.strokeStyle = "green";
					// ctx.strokeRect(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].x+5, nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
					// ctx.strokeStyle = "black";
				}, 3400 );
				nonogram.drawPreview(nonogram.emptyGrid[(i*nonogram.correctGrid[0].length)+y]);

				ctx.strokeStyle = "black";

				return;
			}
		}
	}
});

//Home button
$("#home").click(function(){
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#levels").show();	
});

let toolsContainer = document.getElementById("tools");

let tools = toolsContainer.getElementsByClassName("tool");

for (let i = 0; i < tools.length; i++) {
  tools[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    
    if(typeof current[0] !== 'undefined') {
    	current[0].className = current[0].className.replace(" active", "");
    }
    
    this.className += " active";
  });
}

function resetTools() {
	let currentTool = document.getElementsByClassName("active");
	let tools = document.getElementsByClassName("tool");
	currentTool[0].className = currentTool[0].className.replace(" active", "");
	tools[0].className += " active";
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