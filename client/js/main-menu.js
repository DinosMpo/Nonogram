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
	container.style.top = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#correct").hide();
	$("#levels").show();
	$("#clients-count").show();
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
	$("#clients-count").show();
});

//Mulitplayer
const sock = io();

$('#multiplayer').click(function() {
	$('#menu').hide();
	$('#game-lobbie').show();
	sock.emit('multiplayer', "Player join");
});

$('#exit-multiplayer-waiting-lobby').click(function() {
	$('#menu').show();
	$("#clients-count").show();
	$('#game-lobbie').hide();
	sock.emit('exit multiplayer waiting lobby', 'Player left the lobby');
});

//nomizw auto to exit htan gia otan o xrhsths teleiwne thn pista kai patage exit
$("#exit-multiplayer").click(function(){
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	container.style.top = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#correct-multiplayer").hide();
	$("#levels").show();
	$("#clients-count").show();
});

//exit-multiplayer class
$(".exit-multiplayer").click(function() {
	if(turn === false) {
		$("#waiting-screen").hide();
	}
	// console.log(multiplayerGame);
	console.log('edwwwww');
	sock.emit('exit-multiplayer', multiplayerGame);
	currentLevel = "none";
	turn = false;
	wait = false;
});

$('#close-multiplayer').click(function() {
	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	container.style.top = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#multiplayer-finished-popup").hide();
	$("#menu").show();
	$("#clients-count").show();
});