$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX ;
	startPointMouseY = event.offsetY ;
	if(state === "level") {
		isDown = true;
		nonogram.fillCels(startPointMouseX, startPointMouseY);
		nonogram.findUserChoices(); // gt to exw edw auto?
		store(currentStage, nonogram.userChoices);
		nonogram.findProgress();
	}else if(state === "multiplayer") {
		if(turn === true) {
			nonogram.multiplayerFillCels(startPointMouseX, startPointMouseY);
			$("#info-current-progress").text("");
			$("#info-current-progress").text(nonogram.findProgress() + "%");
			if(nonogram.checkProgress()) {
				sock.emit('correct');
			}else{
				$("#correct").hide();
				sock.emit('end-turn');
			}
		}
	}
});

//------------ Under development gia na kanw ton xrhsth na epilegei polla koutakia
$(canvas).mouseup(function(){
	if(state === "level") {
		isDown = false;
		if(nonogram.checkProgress()) {
			$("#correct").show();
			store("correct-" + currentStage, 1);
			$(".correct-" + currentStage).show();
		}else{
			$("#correct").hide();
			store("correct-" + currentStage, 0);
			$(".correct-" + currentStage).hide();
		}
		nonogram.findUserChoices();
		store(currentStage, nonogram.userChoices);	
		$("#info-current-progress").text("");
		$("#info-current-progress").text(nonogram.findProgress() + "%");
	}
});

$(canvas).mousemove(function(event){
	if(isDown){
		var mouseX = event.offsetX ; //- c.canvas.offsetLeft
		var mouseY = event.offsetY ; //- c.canvas.offsetTop
		nonogram.fillMultiCells(mouseX, mouseY, startPointMouseX, startPointMouseY);
	}
});

//---- for mobile events

// $(canvas).on("touchstart", function(e){
// 	// alert(4);
// });

// $(canvas).on("touchmove", function(event){
// 	// alert("test");
	
// 	var mouseX = event.offsetX ; //- c.canvas.offsetLeft
// 	var mouseY = event.offsetY ; //- c.canvas.offsetTop

// 	nonogram.fillMultiCells(mouseX, mouseY, startPointMouseX, startPointMouseY);

// 	if(nonogram.checkProgress()) {
// 		$("#correct").show();
// 		store("correct-" + currentStage, 1);
// 		$(".correct-" + currentStage).show();
// 	}else{
// 		$("#correct").hide();
// 		store("correct-" + currentStage, 0);
// 		$(".correct-" + currentStage).hide();
// 	}
// });

// $(canvas).touchmove(function(event){
// 	alert("test");
	
// 	var mouseX = event.offsetX ; //- c.canvas.offsetLeft
// 	var mouseY = event.offsetY ; //- c.canvas.offsetTop

// 	nonogram.fillMultiCells(mouseX, mouseY, startPointMouseX, startPointMouseY);

// 	if(nonogram.checkProgress()) {
// 		$("#correct").show();
// 		store("correct-" + currentStage, 1);
// 		$(".correct-" + currentStage).show();
// 	}else{
// 		$("#correct").hide();
// 		store("correct-" + currentStage, 0);
// 		$(".correct-" + currentStage).hide();
// 	}
// });

//$(canvas).bind("mouse touchstart", function(event) {
// 	// disable default drag to scroll behavior
// 	event.preventDefault();

// 	// touch or mouse position
// 	var touch = event.originalEvent.touches && event.originalEvent.touches[0];
// 	var startPointMouseX = (touch||event).offsetX;
// 	var startPointMouseY = (touch||event).offsetY;

// 	if(state === "level") {
// 		//Singleplayer
// 		isDown = true;
// 		nonogram.fillCels(startPointMouseX, startPointMouseY);
// 		if(nonogram.checkProgress()) {
// 			$("#correct").show();
// 			store("correct-" + currentStage, 1);
// 			$(".correct-" + currentStage).show();
// 		}else{
// 			$("#correct").hide();
// 			store("correct-" + currentStage, 0);
// 			$(".correct-" + currentStage).hide();
// 		}

// 		nonogram.findUserChoices(); // gt to exw edw auto?
// 		store(currentStage, nonogram.userChoices);
// 	}else if(state === "multiplayer") {
// 		//Multiplayer
// 		sock.on('can play', () => {
// 			turn = true;
// 		});

// 		if(turn === true) {
// 			//otan einai o guros tou ka8e xrhsth
// 			nonogram.multiplayerFillCels(startPointMouseX, startPointMouseY);
// 			console.log(nonogram.emptyGrid);// test
// 			// sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
// 			// sock.emit('turn');//allagh gurou
// 			sock.on('correct', () => {
// 				$("#correct").show();
// 			});

// 			if(nonogram.checkProgress()) {
// 				// $("#correct").show();
// 				sock.emit('correct');
// 			}else{
// 				$("#correct").hide();
// 			}
// 		}
// 	}
// });

// $(canvas).bind("mouseup touchend", function() {
// 	isDown = false;
// });
