$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX ; //- c.canvas.offsetLeft
	startPointMouseY = event.offsetY ; //- c.canvas.offsetTop

	if(state === "level") {
		//Singleplayer
		isDown = true;
		nonogram.fillCels(startPointMouseX, startPointMouseY);
		if(nonogram.checkProgress()) {
			$("#correct").show();
			store("correct-" + currentStage, 1);
			$(".correct-" + currentStage).show();
		}else{
			$("#correct").hide();
			store("correct-" + currentStage, 0);
			$(".correct-" + currentStage).hide();
		}

		nonogram.findUserChoices(); // gt to exw edw auto?
		store(currentStage, nonogram.userChoices);
	}else if(state === "multiplayer") {
		//Multiplayer
		sock.on('can play', () => {
			turn = true;
		});

		if(turn === true) {
			//otan einai o guros tou ka8e xrhsth
			nonogram.multiplayerFillCels(startPointMouseX, startPointMouseY);
			console.log(nonogram.emptyGrid);// test
			// sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
			// sock.emit('turn');//allagh gurou
			sock.on('correct', () => {
				$("#correct").show();
			});

			if(nonogram.checkProgress()) {
				// $("#correct").show();
				sock.emit('correct');
			}else{
				$("#correct").hide();
			}
		}
	}
});

//------------ Under development gia na kanw ton xrhsth na epilegei polla koutakia
$(canvas).mouseup(function(){
	isDown = false;
});

$(canvas).mousemove(function(event){
	if(isDown){
		var mouseX = event.offsetX ; //- c.canvas.offsetLeft
		var mouseY = event.offsetY ; //- c.canvas.offsetTop

		nonogram.fillMultiCells(mouseX, mouseY, startPointMouseX, startPointMouseY);

		if(nonogram.checkProgress()) {
			$("#correct").show();
			store("correct-" + currentStage, 1);
			$(".correct-" + currentStage).show();
		}else{
			$("#correct").hide();
			store("correct-" + currentStage, 0);
			$(".correct-" + currentStage).hide();
		}
	}
});