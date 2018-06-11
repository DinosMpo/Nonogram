$("#play").click(function(){
	$("#menu").hide();
	$("#levels").show();
});

$("#close-levels").click(function(){
	$("#menu").show();
	$("#levels").hide();
});

$(".level5x5").click(function(){
	$(".levels5x5").show();
	$("#levels").hide();
});

$(".level10x10").click(function(){
	$(".levels10x10").show();
	$("#levels").hide();
});

$(".level15x15").click(function(){
	$(".levels15x15").show();
	$("#levels").hide();
});

$(".close-levels5x5").click(function(){
	$(".levels5x5").hide();
	$("#levels").show();
});

$(".close-levels10x10").click(function(){
	$(".levels10x10").hide();
	$("#levels").show();
});

$(".close-levels15x15").click(function(){
	$(".levels15x15").hide();
	$("#levels").show();
});

$(".stage").click(function(){
	$(".levels5x5").hide();
	$(".levels10x10").hide();
	$(".levels15x15").hide();
	$("#container-tools").show();
});

$("#continueGame").click(function(){
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	container.style.transform = "none";
	container.style.left = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#correct").hide();
	$("#levels").show();
});

for(let i=0; i<allStages.length; i++) {
	if(isCorrect("correct-" + allStages[i])) {
		$(".correct-" + allStages[i]).show();
	}
}

$('#how-to-play').click(function() {
	$('#menu').hide();
	$('#instructions').show();
});

$("#close").click(function() {
	$(this).parent().hide();
	$('#menu').show();
});







//Mulitplayer
const sock = io();

$('#multiplayer').click(function() {
	$('#menu').hide();
	$('#game-lobbie').show();
	sock.emit('multiplayer', "Player join");

	sock.on('multiplayer', (text) => {
		if(text === "Opponent found!") {
			createMultiplayerLevel();
			// $("#container-tools").show();
		}
	});
});

$('#exit').click(function() {
	$('#menu').show();
	$('#game-lobbie').hide();
	sock.emit('exit', 'Player left the lobby');
});

sock.on('message', (text) => {
	console.log(text);
});