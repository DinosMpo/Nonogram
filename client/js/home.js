"use strict";

let canvas 		= document.getElementById("canvas");
let ctx 		= canvas.getContext("2d");
let state 		= "menu";
let screen 		= document.getElementById("screen");
let container	= document.getElementById("container");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function introScreen() {
	this.textLogo = [
						[1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,1,0,0,0,1],
						[1,1,0,1,0,1,0,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,1],
						[1,0,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1,1,0,0,1,1,1,0,1,0,1,0,1],
						[1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1]
	],

	this.blockSize = (canvas.width - 60) / this.textLogo[0].length;

	this.draw = function() {
		ctx.fillStyle = "black";
		for(let i=0; i<this.textLogo.length; i++){
			for(let y=0; y<this.textLogo[i].length; y++){
				if(this.textLogo[i][y] === 1){
					ctx.beginPath();
					
					ctx.fillRect(y*this.blockSize + 20, i*this.blockSize + 100, this.blockSize, this.blockSize);

					ctx.strokeStyle = "red";
			    	ctx.lineWidth   = 2;
			    	ctx.strokeRect(y*this.blockSize + 20, i*this.blockSize + 100, this.blockSize, this.blockSize);
				}
			}
		}
	}
}

//Rectangle class
function Rect(x, y, w, h, dx, color, stroke) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.dx = dx;
	this.color = color;
	this.stroke = stroke;

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = color;
		// ctx.strokeStyle = "black";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.stroke();
		// c.fillStyle = this.color;
		ctx.fill();

		ctx.strokeStyle = "black";
	    ctx.lineWidth   = 2;
	    ctx.strokeRect(this.x, this.y, this.w, this.h);
	}

	this.update = function() {
		if(this.y + this.w > innerHeight || this.y < 0){
			this.dx = -this.dx;
		}
		this.y += this.dx;	
		this.draw();
	}

	this.relocate = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

//X shape class
function xRect(x, y, w, h, dx, textSize) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.dx = dx;
	this.textSize = textSize;

	this.draw = function() {
		ctx.beginPath();
		ctx.font = textSize +"px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("X", this.x, this.y);
		ctx.stroke();
		ctx.fill();
	}

	this.update = function() {
		if(this.y + this.w > innerHeight || this.y < 0){
			this.dx = -this.dx;
		}
		this.y += this.dx;
		this.draw();
	}

	this.relocate = function() {
		this.x = x;
		this.y = y;
	}
}

let blackRectArray = [];
let whiteRectArray = [];
let xRectArray = [];

//Create 30 black rects
for(let i=0; i<30; i++){
	// let size = Math.random() * 30;
	let size = Math.floor(Math.random() * 30) + 5;
	let x = Math.random() * (innerWidth - size * 2) + size;
	let y = Math.random() * (innerHeight - size * 2) + size;
	let dx = Math.random() * 4;
	let color = "black";
	blackRectArray.push(new Rect(x, y, size, size, dx, color));
}

//Create 30 white rects
for(let i=0; i<30; i++){
	// let size = Math.random() * 30;
	let size = Math.floor(Math.random() * 30) + 5;
	let x = Math.random() * (innerWidth - size * 2) + size;
	let y = Math.random() * (innerHeight - size * 2) + size;
	let dx = Math.random() * 4;
	let color = "white";
	whiteRectArray.push(new Rect(x, y, size, size, dx, color));
}

//Create 30 x shape rects
for(let i=0; i<30; i++){
	// let size = Math.random() * 30;
	let size = Math.floor(Math.random() * 30) + 5;
	let x = Math.random() * (innerWidth - size * 2) + size;
	let y = Math.random() * (innerHeight - size * 2) + size;
	let dx = Math.random() * 4;
	// let textSize = Math.random() * 30;
	let textSize = Math.floor(Math.random() * 30) + 10;
	xRectArray.push(new xRect(x, y, size, size, dx, textSize));
}

function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);	
}

function animate() {
	if(state === "menu") {
		// ctx.clearRect(0, 0, innerWidth, innerHeight);
		clearCanvas();
		ctx.drawImage(img, (innerWidth/2)-(img.width/2), (innerHeight/2)-(img.height/2));
		intro.draw();
		for(var i = 0; i < blackRectArray.length; i++) {
			blackRectArray[i].update();
			whiteRectArray[i].update();
			xRectArray[i].update();
		}
	}
}

var img = new Image();
img.src = "img/nono222.png";
let intro = new introScreen();
setInterval(animate, 1000/50);


