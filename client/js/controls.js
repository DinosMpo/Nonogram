//------------ Zoom && Drag --------------------
//kwdikas gia to zoom kai drag
//oi metablhtes gia to zoom && drag
let originX = 0;
let originY = 0;
let originWidth = 0;
let originHeight = 0;
let dragged = 0;
let dragStart = {x:0,y:0};
let scaleFactor = 1;
let translatePos = {x: 0,y: 0};
let myLimit = 300;
let limitTop = myLimit;
let limitLeft = myLimit;
let limitBottom = canvas.height-myLimit;
let limitRight = canvas.width-myLimit;
let activeDragControl;
let topControl = document.getElementById('top');
let leftControl = document.getElementById('left');
let rightControl = document.getElementById('right');
let bottomControl = document.getElementById('bottom');

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
			originX = translatePos.x;
			originY = translatePos.y;
		}
	}else if(event.deltaY == 3) { //zoom out
		if(scaleFactor > 1) {
			scaleFactor -= 0.1;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
			originX = translatePos.x;
			originY = translatePos.y;
		}
	}
}

//o kwdika pou apo8hkeuei tis suntetagmenes pou brisketai o kosmos
function trackTransforms(x, y, w, h) {
	originX = x;
	originY = y;
	originWidth = w;
	originHeight = h;
}

//mporei na xreiastei na to balw allou auto
trackTransforms(0,0,canvas.width, canvas.height);

//diaxeirish gia to zoom
function zoom(scaleFactor, translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x, translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);
	ctx.translate(-translatePos.x, -translatePos.y); // giati eprepe na bazoume to anti8eto ? den douleue opws h8ela to zoom
	// redraw();
	nonogram.drawGrid();
	nonogram.drawRowNumbers();
	nonogram.drawColumnNumbers();
	nonogram.continueProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage),retrieve('columnNumbersGrid-'+currentStage));
	ctx.restore();
	//otan to zoom den einai sto level 1 na fainontai ta controls
	if(scaleFactor !== 1) {
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
	}else{
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
	}
}

//o kwdikas gia to drag
function drag(translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x,translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);
	//edw ksana zwgrafizoume
	nonogram.drawGrid();
	nonogram.drawRowNumbers();
	nonogram.drawColumnNumbers();
	nonogram.continueProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage),retrieve('columnNumbersGrid-'+currentStage));
	// redraw();
	ctx.restore();
}

function dragControl() {
	translatePos.x = mouseX-dragStart.x;
	translatePos.y = mouseY-dragStart.y;
	//auta einai ta oria gia na mhn afhnei aspra kena ston canvas
	//limitTop>translatePos.y && limitLeft>translatePos.x && limitRight<(translatePos.x+(scaleFactor*canvas.width)) && limitBottom<(translatePos.y+(scaleFactor*canvas.height))
	if((limitTop>translatePos.y) && (limitLeft>translatePos.x) && (limitRight<(translatePos.x+(scaleFactor*canvas.width))) && (limitBottom<(translatePos.y+(scaleFactor*canvas.height)))) {
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height)); //prepei na apo8hkeuw kai to width kai height
	}else if(limitTop<=translatePos.y && limitLeft<=translatePos.x) { //an ksepernaei to panw kai to aristero orio
		translatePos.x = originX;
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitTop<=translatePos.y && limitRight>=(translatePos.x+(scaleFactor*limitRight))) { //an ksepernaei to panw kai to deksio orio
		translatePos.x = originX;
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitRight>=(translatePos.x+(scaleFactor*limitRight)) && limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) { //an ksepernaei to deksio kai to katw orio
		translatePos.x = originX;
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom)) && limitLeft<=translatePos.x) { //an ksepernaei to katw kai to aristero orio
		translatePos.x = originX;
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitTop<=translatePos.y) { //an ksepernaei mono to panw orio
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitLeft<=translatePos.x) { //an ksepernaei to aristero orio
		translatePos.x = originX;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitRight>=(translatePos.x+(scaleFactor*canvas.width))) { //an ksepernaei to deksio orio
		translatePos.x = originX;//-((scaleFactor*canvas.width)-canvas.width)/scaleFactor;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) { //an ksepernaei to katw orio
		translatePos.y = originY;
		drag(translatePos);
		trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
	}
	else{
		//gia na mhn apo8hkeuei ti suntetagmenes tou drag otan den ginete drag
		translatePos.x = originX;
		translatePos.y = originY;
	}
}

//Controls
$(canvas).mousedown(function(event) {
	//Ειναι οι συντεταγμένες για το που εκανε click στον canvas. Το χρειαζομαστε και για το multicels
	startPointMouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
	startPointMouseY = event.offsetY || (event.pageY - canvas.offsetTop);
	if(state === "level") {
		if(startPointMouseX<originX) {
			dragStart.x = startPointMouseX - translatePos.x;
			dragStart.y = startPointMouseY - translatePos.y;
			dragged = true;
			// console.log('1');
		}else if(startPointMouseY<originY) {
			dragStart.x = startPointMouseX - translatePos.x;
			dragStart.y = startPointMouseY - translatePos.y;
			dragged = true;
			// console.log('2');
		}else if(startPointMouseX>originWidth) {
			dragStart.x = startPointMouseX - translatePos.x;
			dragStart.y = startPointMouseY - translatePos.y;
			dragged = true;
			// console.log('3');			
		}else if(startPointMouseY>originHeight) {
			dragStart.x = startPointMouseX - translatePos.x;
			dragStart.y = startPointMouseY - translatePos.y;
			dragged = true;
			// console.log('4');
		}else{
			isDown = true;
			ctx.save();
			ctx.translate(originX,originY);
			ctx.scale(scaleFactor,scaleFactor);
			nonogram.fillCels((startPointMouseX-originX)/scaleFactor, (startPointMouseY-originY)/scaleFactor);
			ctx.restore();
			nonogram.findUserChoices(); // gt to exw edw auto? το έχω για να αποθηκεύω το progress του χρήστη
			store(currentStage, nonogram.userChoices.levelGrid);
			store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
			store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
			nonogram.findProgress();
			// console.log('5');
		}
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
		if(dragged){
			$(topControl).show();
			$(leftControl).show();
			$(rightControl).show();
			$(bottomControl).show();
		}
		dragged = false;

		if(activeDragControl) {
			activeDragControl = null;
		}
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
		store(currentStage, nonogram.userChoices.levelGrid);	
		$("#info-current-progress").text("");
		$("#info-current-progress").text(nonogram.findProgress() + "%");
	}
});

$(canvas).mousemove(function(event){
	mouseX = event.offsetX ; //- c.canvas.offsetLeft
	mouseY = event.offsetY ; //- c.canvas.offsetTop
	if(dragged){
		dragControl();
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
	}
	if(isDown){
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		nonogram.fillMultiCells((mouseX-originX)/scaleFactor, (mouseY-originY)/scaleFactor, (startPointMouseX-originX)/scaleFactor, (startPointMouseY-originY)/scaleFactor);
		ctx.restore();
	}
	if(activeDragControl) {
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
		dragControl();
	}
});

$(canvas).mouseout(function() {
	dragged = false;
	if(activeDragControl) {	
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
	if(isDown){
		console.log('eafasa');
		nonogram.findUserChoices();
		store(currentStage, nonogram.userChoices.levelGrid);
	}
});

//------ Zoom
canvas.addEventListener('wheel', function(event) {
	if(state === "level") {
		handleScroll(event);
	}
},false);

// Drag Controls
canvas.addEventListener("mouseover", function(evt) {
	if(activeDragControl) {
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		if(isNaN(translatePos.x)) {
			translatePos.x = 0;
			translatePos.y = 0;
		}
		dragStart.x = lastX - translatePos.x;
		dragStart.y = lastY - translatePos.y;
		dragged = true;
	}
},false);

topControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
});

topControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
	$(this).hide();
	activeDragControl = "top";
});

leftControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);	
});

leftControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);
	$(this).hide();
	activeDragControl = " left";
});

rightControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
});

rightControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
	$(this).hide();
	activeDragControl = "right";
});

bottomControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
});

bottomControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
	$(this).hide();
	activeDragControl = "bottom";
});

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
		store(currentStage, nonogram.userChoices.levelGrid);
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
		store(currentStage, nonogram.userChoices.levelGrid);	
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

//Window resize
$(window).resize( () => {
	if(state === 'menu') {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		intro = new introScreen();
		for(let i=0; i<30; i++) {
			blackRectArray[i].relocate(Math.random() * (innerWidth - blackRectArray[i].w * 2) + blackRectArray[i].w, Math.random() * (innerHeight - blackRectArray[i].w * 2) + blackRectArray[i].w);
			whiteRectArray[i].relocate(Math.random() * (innerWidth - whiteRectArray[i].w * 2) + whiteRectArray[i].w, Math.random() * (innerHeight - whiteRectArray[i].w * 2) + whiteRectArray[i].w);
			xRectArray[i].relocate(Math.random() * (innerWidth - xRectArray[i].w * 2) + xRectArray[i].w, Math.random() * (innerHeight - xRectArray[i].w * 2) + xRectArray[i].w);
		}
		ctx.drawImage(img, (innerWidth/2)-(img.width/2), (innerHeight/2)-(img.height/2));
		intro.draw();
	}else if(state === 'level') {
		nonogram.relocate();
		nonogram.findUserChoices();
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		nonogram.continueProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage),retrieve('columnNumbersGrid-'+currentStage));
		ctx.restore();
		limitBottom = nonogram.height-myLimit;
		limitRight = nonogram.width-myLimit;
	}
});