//Controls
$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX;
	startPointMouseY = event.offsetY;
	if(state === "level") {
		isDown = true;
		nonogram.fillCels(startPointMouseX, startPointMouseY);
		nonogram.findUserChoices(); // gt to exw edw auto?
		store(currentStage, nonogram.userChoices);
		nonogram.findProgress();
	}else if(state === "multiplayer") {
		if(turn === true) {
			var gameData = nonogram.multiplayerFillCels(startPointMouseX, startPointMouseY);
			sock.emit('empty grid', gameData);
			// sock.emit('nonogram', nonogram);
			// sock.emit('turn');
			// sock.emit('empty grid', gameData);
			// sock.emit('nonogram', nonogram);// stelnw thn katastash tou nonogram ston server
			// sock.emit('turn');//allagh gurou
			turn = false;
			$("#info-current-progress").text("");
			$("#info-current-progress").text(nonogram.findProgress() + "%");
			if(nonogram.checkProgress()) {
				sock.emit('correct' , multiplayerGame);
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
$(canvas).on('touchstart', function(event) {
	event.preventDefault();
	startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
	// startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height) / 2));
	startPointTouchY = event.touches[0].clientY;
	if(state === 'level') {
		isDown = true;

		nonogram.fillCels(startPointTouchX, startPointTouchY);
		nonogram.findUserChoices(); // gt to exw edw auto?
		store(currentStage, nonogram.userChoices);
		nonogram.findProgress();
	}else if(state === 'multiplayer') {
		if(turn === true) {
			var gameData = nonogram.multiplayerFillCels(startPointTouchX, startPointTouchY);
			sock.emit('empty grid', gameData);
			turn = false;
			$("#info-current-progress").text("");
			$("#info-current-progress").text(nonogram.findProgress() + "%");
			if(nonogram.checkProgress()) {
				sock.emit('correct' , multiplayerGame);
			}else{
				$("#correct").hide();
				sock.emit('end-turn');
			}
		}
	}
});

$(canvas).on('touchend', function() {
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

$(canvas).on('touchmove', function(event) {
	event.preventDefault();
	if(isDown){
		var touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
		var touchY = Math.floor(event.touches[0].clientY);
		nonogram.fillMultiCells(touchX, touchY, startPointTouchX, startPointTouchY);
	}
});