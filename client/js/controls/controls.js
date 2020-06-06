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
function handleScroll(value) {
	// if(originX >= 0) {
	// 	translatePos.x = mouseX - originX;
	// }else{
	// 	translatePos.x = mouseX + Math.abs(originX);
	// }

	// if(originY >= 0) {
	// 	translatePos.y = mouseY - originY;
	// }else{
	// 	translatePos.y = mouseY + Math.abs(originY);
	// }

	if(value == -3 || value == -100) { //zoom in
		if(scaleFactor < 2.5) {
			scaleFactor += 0.1;
			// translatePos.x = (mouseX-originX)/scaleFactor;
			// translatePos.y = (mouseY-originY)/scaleFactor;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			// translatePos.x *= scaleFactor;
			// translatePos.y *= scaleFactor;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
			originX = translatePos.x;
			originY = translatePos.y;
			trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
		}
	}else if(value == 3 || value == 100) { //zoom out
		if(scaleFactor > 1) {
			scaleFactor -= 0.1;
			// translatePos.x = (mouseX-originX)/scaleFactor;
			// translatePos.y = (mouseY-originY)/scaleFactor;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			// translatePos.x *= scaleFactor;
			// translatePos.y *= scaleFactor;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
			originX = translatePos.x; //autes oi 2 grammes kwdika prepei na einai askopes
			originY = translatePos.y;
			trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
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
	//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά
	for(let i=0; i<nonogram.emptyGrid.length; i++) {
		if(nonogram.emptyGrid[i].value === 1){
			//fil the cell black
			nonogram.drawBlackCell(nonogram.emptyGrid[i]);
			nonogram.drawPreview(nonogram.emptyGrid[i]);
		}else if(nonogram.emptyGrid[i].value === 2) {
			// nonogram.drawWhiteCell(nonogram.emptyGrid[i]);
			nonogram.drawXCell(nonogram.emptyGrid[i]);
			nonogram.drawPreview(nonogram.emptyGrid[i]);
		}
	}
	//Ζωγραφίζει τις επιλογές του χρήστη στα κελιά των αριθμών
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
		if(nonogram.rowNumbersGrid[i].value === 1) {
			ctx.moveTo(nonogram.rowNumbersGrid[i].x+3, (nonogram.rowNumbersGrid[i].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.rowNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[i].y+3);
		}
	}

	for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
		if(nonogram.columnNumbersGrid[i].value === 1) {	
			ctx.moveTo(nonogram.columnNumbersGrid[i].x+3, (nonogram.columnNumbersGrid[i].y + nonogram.blockSize)-3);
			ctx.lineTo((nonogram.columnNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[i].y+3);
		}
	}
	ctx.closePath();
	ctx.stroke();
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
	nonogram.retrieveProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage),retrieve('columnNumbersGrid-'+currentStage));
	// redraw();
	ctx.restore();
}

function dragControl(x,y) {
	translatePos.x = x;
	translatePos.y = y;
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
			ctx.save();
			ctx.translate(originX,originY);
			ctx.scale(scaleFactor,scaleFactor);
			var gameData = nonogram.multiplayerFillCels(startPointMouseX, startPointMouseY);
			ctx.restore();
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
				if(multiplayerStageIndex == (multiplayerLevelNames.length-1)) {
					$('#multiplayer-finished-popup').show();
					sock.emit('multiplayer finished');
				}else{
					sock.emit('correct' , multiplayerGame);
				}
			}else{
				$("#correct-multiplayer").hide();
				sock.emit('end-turn');
			}
		}
	}
});

$(canvas).mouseup(function(){
	if(state === "level") {
		isDown = false;
		if(dragged){
			$(topControl).show();
			$(leftControl).show();
			$(rightControl).show();
			$(bottomControl).show();
			dragged = false;
		}

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
		store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
		store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);	
		$("#info-current-progress").text("");
		$("#info-current-progress").text(nonogram.findProgress() + "%");
	}
});

$(canvas).mousemove(function(event){
	mouseX = event.offsetX ; //- c.canvas.offsetLeft
	mouseY = event.offsetY ; //- c.canvas.offsetTop
	if(dragged){
		dragControl(mouseX-dragStart.x, mouseY-dragStart.y);
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
		dragControl(mouseX-dragStart.x, mouseY-dragStart.y);
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
		nonogram.findUserChoices();
		store(currentStage, nonogram.userChoices.levelGrid);
		store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
		store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	}
});

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

//------ Zoom
//-- Implemantation for firefox
// canvas.addEventListener('wheel', function(event) {
// 	if(state === "level" || state === "multiplayer") {
// 		handleScroll(event);
// 	}
// },false);
//-- Implemantation for chrome IE
// canvas.addEventListener('DOMMouseScroll', function(event) {
// 	// if(state === "level" || state === "multiplayer") {
// 	// 	handleScroll(event);
// 	// }
// 	alert("e");
// },false);

$(canvas).bind('mousewheel', function(event) {
	if(state === "level" || state === "multiplayer") {
		handleScroll(event.originalEvent.deltaY);
	}
	console.log(event.originalEvent.deltaY);
});

$(canvas).bind('DOMMouseScroll', function(event) {
	if(state === "level" || state === "multiplayer") {
		handleScroll(event.detail);
	}
	console.log(event.detail);
});

//Window resize
$(window).resize( () => {
	if(state === 'menu') {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		intro = new introScreen();
		if(window.innerHeight >= 753) {
			if(window.innerWidth >= 999) {
				img.src = "img/nono_1000X753.png";
			}else if(window.innerWidth < 999 && window.innerWidth >= 719) {
				img.src = "img/nono_720X542.png";
			}else if(window.innerWidth < 719 && window.innerWidth >= 480) {
				img.src = "img/nono_480X361.png";
			}else if(window.innerWidth < 480 && window.innerWidth >= 360) {
				img.src = "img/nono_360X271.png";
			}else if(window.innerWidth < 360 && window.innerWidth >= 304) {
				img.src = "img/nono_304X229.png";
			}
		}else if(window.innerHeight < 753 && window.innerHeight >= 543) {
			if(window.innerWidth >= 719) {
				img.src = "img/nono_720X542.png";
			}else if(window.innerWidth < 719 && window.innerWidth >= 480) {
				img.src = "img/nono_480X361.png";
			}else if(window.innerWidth < 480 && window.innerWidth >= 360) {
				img.src = "img/nono_360X271.png";
			}else if(window.innerWidth < 360 && window.innerWidth >= 304) {
				img.src = "img/nono_304X229.png";
			}
		}else if(window.innerHeight < 543 && window.innerHeight >= 360) {
			if(window.innerWidth >= 480) {
				img.src = "img/nono_480X361.png";
			}else if(window.innerWidth < 480 && window.innerWidth >= 360) {
				img.src = "img/nono_360X271.png";
			}else if(window.innerWidth < 360 && window.innerWidth >= 304) {
				img.src = "img/nono_304X229.png";
			}
		}else if(window.innerHeight < 360) {
			if(window.innerWidth >= 360) {
				img.src = "img/nono_360X271.png";
			}else if(window.innerWidth < 360 && window.innerWidth >= 304) {
				img.src = "img/nono_304X229.png";
			}
		}
		ctx.drawImage(img, (innerWidth/2)-(img.width/2), (innerHeight/2)-(img.height/2));
		intro.draw();
		for(let i=0; i<30; i++) {
			blackRectArray[i].relocate(Math.random() * (innerWidth - blackRectArray[i].w * 2) + blackRectArray[i].w, Math.random() * (innerHeight - blackRectArray[i].w * 2) + blackRectArray[i].w);
			whiteRectArray[i].relocate(Math.random() * (innerWidth - whiteRectArray[i].w * 2) + whiteRectArray[i].w, Math.random() * (innerHeight - whiteRectArray[i].w * 2) + whiteRectArray[i].w);
			xRectArray[i].relocate(Math.random() * (innerWidth - xRectArray[i].w * 2) + xRectArray[i].w, Math.random() * (innerHeight - xRectArray[i].w * 2) + xRectArray[i].w);
		}
	}else if(state === 'level') {
		if(window.innerHeight > 0 && window.innerWidth > 0) {
			nonogram.relocate();
			nonogram.findUserChoices();
			ctx.save();
			ctx.translate(originX,originY);
			ctx.scale(scaleFactor,scaleFactor);
			nonogram.retrieveProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage),retrieve('columnNumbersGrid-'+currentStage));
			nonogram.redrawProgress();
			ctx.restore();
			limitBottom = nonogram.height-myLimit;
			limitRight = nonogram.width-myLimit;
		}
	}else if(state === "multiplayer") {
		if(window.innerHeight > 0 && window.innerWidth > 0) {
			nonogram.relocate();
			nonogram.findUserChoices();
			ctx.save();
			ctx.translate(originX,originY);
			ctx.scale(scaleFactor,scaleFactor);
			nonogram.redrawProgress();
			nonogram.strokeTeamMateChoice();
			ctx.restore();
			limitBottom = nonogram.height-myLimit;
			limitRight = nonogram.width-myLimit;
		}
	}
});