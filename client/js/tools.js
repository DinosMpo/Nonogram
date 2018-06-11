function createSinglePlayerTools() {
	//Tools creation
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['undo', 'help', 'home'];

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

//Home button
$("#home").click(function(){
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	screen.style.display = "inline-block";
	container.style.transform = "none";
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