//---- Mobile Events
// Global vars to cache touch event state
let evCache = new Array();
let prevDiff = -1;
let touches = 0;
let body = document.querySelector('body');
let touchZoom = false;

$(canvas).on('touchstart', function(event) {
	event.preventDefault();
	body.style.background = 'pink';
	// gt to xw kanei etsi?
	startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
	startPointTouchY = Math.floor(event.touches[0].clientY);
	// startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height) / 2));
	// console.log('touch co ordinate: ');
	// console.log(Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)));
	if(state === 'level') {
		if(startPointTouchX<originX) {
			dragStart.x = startPointTouchX - translatePos.x;
			dragStart.y = startPointTouchY - translatePos.y;
			dragged = true;
			// console.log('1');
		}else if(startPointTouchY<originY) {
			dragStart.x = startPointTouchX - translatePos.x;
			dragStart.y = startPointTouchY - translatePos.y;
			dragged = true;
			// console.log('2');
		}else if(startPointTouchX>originWidth) {
			dragStart.x = startPointTouchX - translatePos.x;
			dragStart.y = startPointTouchY - translatePos.y;
			dragged = true;
			// console.log('3');			
		}else if(startPointTouchY>originHeight) {
			dragStart.x = startPointTouchX - translatePos.x;
			dragStart.y = startPointTouchY - translatePos.y;
			dragged = true;
			// console.log('4');
		}else{
			isDown = true;
			ctx.save();
			ctx.translate(originX,originY);
			ctx.scale(scaleFactor,scaleFactor);
			nonogram.fillCels((startPointTouchX-originX)/scaleFactor, (startPointTouchY-originY)/scaleFactor);
			ctx.restore();
			nonogram.findUserChoices(); // gt to exw edw auto? το έχω για να αποθηκεύω το progress του χρήστη
			store(currentStage, nonogram.userChoices.levelGrid);
			store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
			store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
			nonogram.findProgress();
			// console.log('5');
		}

		evCache.push(event.touches[touches]);
		touches++;
		if(evCache.length == 2) {
			touchZoom = true;
		}

	}else if(state === 'multiplayer') {
		// if(turn === true) {
		// 	var gameData = nonogram.multiplayerFillCels(startPointTouchX, startPointTouchY);
		// 	sock.emit('empty grid', gameData);
		// 	turn = false;
		// 	$("#info-current-progress").text("");
		// 	$("#info-current-progress").text(nonogram.findProgress() + "%");
		// 	if(nonogram.checkProgress()) {
		// 		sock.emit('correct' , multiplayerGame);
		// 	}else{
		// 		$("#correct").hide();
		// 		sock.emit('end-turn');
		// 	}
		// }
		// evCache.push(event.touches[touches]);
		// touches++;
	}
});

$(canvas).on('touchend', function(event) {
	body.style.background = 'white';
	if(state === "level") {
		touchup_handler(event);
		touches--;
		isDown = false;
		if(evCache.length == 0 || evCache.length == 1) {
			touchZoom = false;
			body.style.background = 'black';
		}
		if(dragged){
			$(topControl).show();
			$(leftControl).show();
			$(rightControl).show();
			$(bottomControl).show();
			dragged = false;
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
	}else if(state === "multiplayer") {
		touchup_handler(event);
		touches--;
	}
});

$(canvas).on('touchmove', function(event) {
	event.preventDefault();
	var touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
	var touchY = Math.floor(event.touches[0].clientY);
	// body.style.background = 'yellow';
	if(state ==="level") {
		//edw 8a 8elei mia if gia na mhn trexei h sunarthsh otan den ginetai to gesture tou zoom
		if(evCache.length == 2) {
			body.style.background = 'green';
			touch_zoom_handler(event);
		}
		if(activeDragControl) {
			$(topControl).hide();
			$(leftControl).hide();
			$(rightControl).hide();
			$(bottomControl).hide();
			dragControl(touchX-dragStart.x, touchY-dragStart.y);
			body.style.background = 'yellow';
		}
		if(dragged) {
			dragControl(touchX-dragStart.x, touchY-dragStart.y);
			$(topControl).hide();
			$(leftControl).hide();
			$(rightControl).hide();
			$(bottomControl).hide();
			body.style.background = 'red';
		}
		if(isDown){
			nonogram.fillMultiCells(touchX, touchY, startPointTouchX, startPointTouchY);
		}
	}else if(state === "multiplayer") {
		// touch_zoom_handler(event);
	}
});

function touch_zoom_handler(event) {
	body.style.background = 'grey';
	// Find this event in the cache and update its record with this event
	for(var i=0; i<evCache.length; i++) {
		if(event.changedTouches[0].identifier == evCache[i].identifier) {
			evCache[i] = event.changedTouches[0];
			break;
		}
	}
	// If two pointers are down, check for pinch gestures
	if (evCache.length == 2) {
		// Calculate the distance between the two pointers
		var curDiffX = Math.floor(evCache[0].clientX - evCache[1].clientX);
		var curDiffY = Math.floor(evCache[0].clientY - evCache[1].clientY);
		if (prevDiff > 0) {
			if (curDiffX > prevDiff) {
				// The distance between the two pointers has increased
				// edw bazw twn kwdika gia to zoom in
				body.style.background = 'green';
				if(scaleFactor < 2.5) {
					scaleFactor += 0.1;
					//na to analusw
					translatePos.x = Math.floor(evCache[0].clientX + (curDiffX/2));
					translatePos.y = Math.floor(evCache[0].clientY + (curDiffY/2));
					zoom(scaleFactor, translatePos);

					translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
					translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);

					originX = translatePos.x;
					originY = translatePos.y;
					trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
				}
			}
			if (curDiffX < prevDiff) {
				// The distance between the two pointers has decreased
				// edw bazw twn kwdika gia to zoom out
				body.style.background = 'red';
				if(scaleFactor > 1) {
					scaleFactor -= 0.1;
					translatePos.x = Math.floor(evCache[0].clientX + (curDiffX/2));
					translatePos.y = Math.floor(evCache[0].clientY + (curDiffY/2));
					zoom(scaleFactor, translatePos);
					translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
					translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
					originX = translatePos.x;
					originY = translatePos.y;
					trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
				}
			}
		}
		// Cache the distance for the next move event
		prevDiff = curDiffX;
	}
}

function touchup_handler(event) {
	// Remove this pointer from the cache
	// If the number of pointers down is less than two then reset diff tracker
	if (evCache.length < 2) {
		prevDiff = -1;
	}

	for(var i=0;i<event.changedTouches.length; i++) {
		remove_event(event.changedTouches[i]);
	}
}

// Cache management
function remove_event(event) {
	// Remove this event from the target's cache
	for (var i = 0; i<evCache.length; i++) {
		if(evCache[i].identifier == event.identifier) {
			evCache.splice(i, 1);
			break;
		}
	}
}