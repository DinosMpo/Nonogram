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
	container.style.left = "50%";	
	container.style.top = "50%";
	container.style.transform = "translate(-50%, -50%)";
	canvas.width = nonogram.width;
	canvas.height = nonogram.height;
	canvas.style.border = "1px solid black";
	clearCanvas();
	if(!localStorage.getItem(currentStage)) {
		nonogram.drawGrid();
		nonogram.drawRowNumbers();
		nonogram.drawColumnNumbers();
	}else{
		nonogram.drawGrid();
		nonogram.drawRowNumbers();
		nonogram.drawColumnNumbers();
		nonogram.retrieveProgress(retrieve(currentStage), retrieve('rowNumbersGrid-'+currentStage), retrieve('columnNumbersGrid-'+currentStage));	
	}
	// nonogram.drawRowNumbers();
	// nonogram.drawColumnNumbers();
	
	$("#multiplayer-tools").hide();
	// $("#singleplayer-tools").show();
	if(nonogram.checkProgress()) {
		$("#singleplayer-tools").hide();
		$("#correct").show();
		$("#correct-level-tools").show();
	}else {
		$("#singleplayer-tools").show();
	}

	resetTools("singleplayer");
	if($("#info-current-stage").text().length > 0) {
		$("#info-current-stage").text("");
		$("#info-current-stage").append(currentStage);
	}else{
		$("#info-current-stage").append(currentStage);
	}
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
	$("#clients-count").hide();

	limitBottom = nonogram.height-myLimit;
	limitRight = nonogram.width-myLimit;
}

function createMultiplayerLevel() {
	$("#singleplayer-tools").hide();
	multiplayerStageIndex = 0;
	setTimeout(function(){ 
		state = "multiplayer";
		$('#game-lobbie').hide();
		$('#msg').text("Searching for player...");
		$("#container-tools").show();
		$("#multiplayer-tools").show();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		container.style.transform = "translateX(-50%)"; // ksana kalumpraro to x coordinate
		container.style.left = "50%";
		nonogram = new Nonogram(multiplayerLevels[multiplayerLevelNames[multiplayerStageIndex]]); // h pista tou multi
		canvas.width = nonogram.width;
		canvas.height = nonogram.height;
		canvas.style.border = "1px solid black";
		ctx.clearRect(0, 0, innerWidth, innerHeight);

		nonogram.drawGrid();
		nonogram.drawRowNumbers();
		nonogram.drawColumnNumbers();

		if(turn === false) {
			$("#waiting-screen").show();
		}
		resetTools("multiplayer");
		$("#info-current-progress").text("");
		$("#info-current-progress").text(nonogram.findProgress() + "%");
		$("#clients-count").hide();
	}, 3000);
};

function createNextMultiplayerStage() {
	$('#multiplayer-next-stage-popup').show();
	setTimeout(function(){ 
		$('#multiplayer-next-stage-popup').hide();
		nonogram = new Nonogram(multiplayerLevels[multiplayerLevelNames[multiplayerStageIndex]]); // h pista tou multi
		canvas.width = nonogram.width;
		canvas.height = nonogram.height;
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		nonogram.drawGrid();
		nonogram.drawRowNumbers();
		nonogram.drawColumnNumbers();

		resetTools("multiplayer");
		$("#info-current-progress").text("");
		$("#info-current-progress").text(nonogram.findProgress() + "%");
		if(player == 'player1') {
			wait = false;
			turn = true;
		}else {
			wait = false;
			turn = false;
			$('#waiting-screen').show();
		}

	}, 3000);

}