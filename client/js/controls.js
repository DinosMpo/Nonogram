//oi metablhtes gia to zoom && drag
let originX = 0;
let originY = 0;
let originWidth = 0;
let originHeight = 0;
let dragged = 0;
let dragStart = {x:0,y:0};
let scaleFactor = 1;
let translatePos = {x: 0,y: 0};
//diaxeirish otan ginetai scroll
function handleScroll(event) {
	if(event.deltaY == -3) { //zoom in
		if(scaleFactor < 2.5) {
			scaleFactor += 0.1;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
		}
	}else if(event.deltaY == 3) { //zoom out
		if(scaleFactor > 1) {
			scaleFactor -= 0.1;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
		}
	}
}

//diaxeirish gia to zoom
function zoom(scaleFactor, translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x, translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);
	ctx.translate(-translatePos.x, -translatePos.y); // giati eprepe na bazoume to anti8eto ? den douleue opws h8ela to zoom
	// redraw();
	nonogram.drawGrid();
	nonogram.fillRowNumbers();
	nonogram.fillColumnNumbers();

	ctx.restore();

	// otan to zoom den einai sto level 1 na fainontai ta controls
	// if(scaleFactor !== 1) {
	// 	$(topControl).show();
	// 	$(leftControl).show();
	// 	$(rightControl).show();
	// 	$(bottomControl).show();
	// }else{
	// 	$(topControl).hide();
	// 	$(leftControl).hide();
	// 	$(rightControl).hide();
	// 	$(bottomControl).hide();
	// }
}


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

//------ Zoom
canvas.addEventListener('wheel', function(event) {
	if(state === "level") {
		handleScroll(event);
	}
},false);

//---- Mobile Events
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