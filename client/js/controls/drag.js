// --- Drag Controls for mouse
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

// --- Drag Controls for touch
let touchDragStartX = 0;
let touchDragStartY = 0;

leftControl.addEventListener("touchmove", function(event) {
	body.style.background = 'orange';
	if(activeDragControl) {
		touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
		touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
		if(isNaN(translatePos.x)) {
			translatePos.x = 0;
			translatePos.y = 0;
		}
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
		dragControl(touchX, touchY);
		// console.log("touchX: " + touchX);
		// console.log("touchY: " + touchY);
	}
});

leftControl.addEventListener('touchstart', function(event) {
	event.preventDefault();
	// touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
	// touchY = event.touches[0].clientY;
	touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
	touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;//canvas.height/2;
	$(this).hide();
	activeDragControl = "left";
});

leftControl.addEventListener("touchend", function(event) {
	body.style.background = 'blue';
	if(activeDragControl) {	
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
});

topControl.addEventListener("touchmove", function(event) {
	body.style.background = 'orange';
	if(activeDragControl) {
		touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
		touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
		if(isNaN(translatePos.x)) {
			translatePos.x = 0;
			translatePos.y = 0;
		}
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
		dragControl(touchX, touchY);
		// console.log("touchX: " + touchX);
		// console.log("touchY: " + touchY);
	}
});

topControl.addEventListener('touchstart', function(event) {
	event.preventDefault();
	touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
	touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
	$(this).hide();
	activeDragControl = "top";
});

topControl.addEventListener("touchend", function(event) {
	body.style.background = 'blue';
	if(activeDragControl) {	
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
});

rightControl.addEventListener("touchmove", function(event) {
	body.style.background = 'orange';
	if(activeDragControl) {
		touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
		touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
		if(isNaN(translatePos.x)) {
			translatePos.x = 0;
			translatePos.y = 0;
		}
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
		dragControl(touchX, touchY);
		// console.log("touchX: " + touchX);
		// console.log("touchY: " + touchY);
	}
});

rightControl.addEventListener('touchstart', function(event) {
	event.preventDefault();
	touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
	touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
	$(this).hide();
	activeDragControl = "right";
});

rightControl.addEventListener("touchend", function(event) {
	body.style.background = 'blue';
	if(activeDragControl) {	
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
});


bottomControl.addEventListener("touchmove", function(event) {
	body.style.background = 'orange';
	if(activeDragControl) {
		touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
		touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
		if(isNaN(translatePos.x)) {
			translatePos.x = 0;
			translatePos.y = 0;
		}
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();
		dragControl(touchX, touchY);
		// console.log("touchX: " + touchX);
		// console.log("touchY: " + touchY);
	}
});

bottomControl.addEventListener('touchstart', function(event) {
	event.preventDefault();
	touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
	touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
	$(this).hide();
	activeDragControl = "bottom";
});

bottomControl.addEventListener("touchend", function(event) {
	body.style.background = 'blue';
	if(activeDragControl) {	
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
});