let nonogram;
let mouseX;
let mouseY;
let isDown = false;
let currentLevel = "none";
let turn = false;
let wait = false;

function createLevel(level, stage) {
	state = "level"; //to xrhsomopoiw gia na stamataw to animation
	currentStage = stage;

	nonogram = new Nonogram(level);

	// screen.style.display = "block";
	container.style.transform = "translateX(-50%)";
	container.style.left = "50%";

	canvas.width = nonogram.width;
	canvas.height = nonogram.height;
	canvas.style.border = "1px solid black";
	
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	if(!localStorage.getItem(currentStage)) {
		nonogram.drawGrid();
	}else{
		nonogram.drawGrid();
		nonogram.continueProgress(retrieve(currentStage));
	}

	nonogram.fillRowNumbers();
	nonogram.fillColumnNumbers();

	resetTools();
	if($("#info-current-stage").text().length > 0) {
		$("#info-current-stage").text("");
		$("#info-current-stage").append(currentStage);
	}else{
		$("#info-current-stage").append(currentStage);
	}

	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
	
}

function createMultiplayerLevel() {
	$('#msg').text("Player found!");
	
	setTimeout(function(){ 
		state = "multiplayer";
		$('#game-lobbie').hide();
		$("#container-tools").show();
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		container.style.transform = "translateX(-50%)"; // ksana kalumpraro to x coordinate
		container.style.left = "50%";

		nonogram = new Nonogram(multiplayerLevels['android']);

		canvas.width = nonogram.width;
		canvas.height = nonogram.height;
		canvas.style.border = "1px solid black";

		ctx.clearRect(0, 0, innerWidth, innerHeight);

		nonogram.drawGrid();
		nonogram.fillRowNumbers();
		nonogram.fillColumnNumbers();
		if(!turn) {
			$("#waiting-screen").show();
		}

	}, 3000);

	sock.on('turn', (text) => {
		turn = true;
		console.log(text);
	});
	

};

