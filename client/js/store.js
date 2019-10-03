// // Check browser support
// if (typeof(Storage) !== "undefined") {

//   // Store
//   localStorage.setItem("lastname", "Smith");

//   // Retrieve
//   document.getElementById("result").innerHTML = localStorage.getItem("lastname");

// } else {
//   document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
// }

function store(level, progress) {
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		if(!localStorage.getItem(level)){	//ama den uparxei auto to level tote dhmiourghseto alliws apo8hkeuse to progress tou level
	    	// Store
		  	localStorage.setItem(level, progress);
	    }else{
	    	localStorage[level] = progress;
	    }
	  // Store
	  // localStorage.setItem(level, progress);
	  // Retrieve
	  // document.getElementById("result").innerHTML = localStorage.getItem("lastname");
	} else {
	  alert("Sorry, your browser does not support Web Storage...");
	}
}

function retrieve(level) {
	return localStorage.getItem(level).split(',').map(function(item){
		return parseInt(item, 10);
	});
}

function exists(name) {
	if(localStorage.getItem(name)) {
		return true 
	}
}

function isCorrect(level) {
	if(localStorage.getItem(level) === "1") {
		return true;
	}
}

// var d = x.split(',').map(function(item) {
// 	return parseInt(item, 10);
// });