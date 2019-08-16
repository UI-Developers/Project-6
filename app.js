document.addEventListener('DOMContentLoaded', () => {
	const divQwerty = document.querySelector('#qwerty');
	const divPhrase = document.querySelector('#phrase');
	const btnReset = document.querySelector('.btn__reset');
	const divOverlay = document.querySelector('#overlay');
	const phraseUl = document.querySelector('#phrase ul');
	const buttons = document.getElementsByTagName('button');
	const li = document.getElementsByTagName('li');
	const ol = document.getElementsByTagName('ol');
	const container = document.querySelector('.main-container');
	const winMessage = "You Win!";
	const loseMessage = "You Lose!";
	var isGameStarted = false;

	let randPhrase;
	let charactersLoop;

	let missed = 0;

	let phrases = [
		'treehouse rocks', 
		'learn coding now',
		'java is cool',
		'simple is better',
		'sunny day today'
	];

	function getRandomPhraseAsArray(arr) {
		let randNumb = Math.floor(Math.random() * arr.length);
		randPhrase = arr[randNumb];
		charactersLoop = randPhrase.split(", ");
		return charactersLoop;
	}

	function addPhraseToDisplay(arr) {
		var availableLetters = [];
		for (var i = 0; i < arr[0].length; i++) {
		  var node = document.createElement("LI");
		  var textListItems = document.createTextNode(arr[0][i]);
		  
		  if (detectCharacter(arr[0][i])) {
		  	node.className = "letter";
		  	availableLetters.push(arr[i]);
		  } else {
		  	node.className = "space";
		  }
		  node.appendChild(textListItems);
		  phraseUl.appendChild(node);
		}
		return availableLetters;
	}

	function detectCharacter(character) {
		var convNumber = character.charCodeAt();
		if (convNumber >= 65 && convNumber <= 122) {
			return true;
		} else {
			return false;
		}
	}

	var phraseArray = getRandomPhraseAsArray(phrases);

	var availableLetters = addPhraseToDisplay(phraseArray);

	function removeHeart() {
		var li = document.querySelector('li.tries');
		li.remove();
	}

	function screenState(itswon) {
		var stateClassName, message;
		if (itswon === true) {
			stateClassName = "win";
			message = winMessage;
		} else {
			stateClassName = "lose";
			message = loseMessage;
		}
		var lose = container.appendChild(divOverlay);
		lose.className = stateClassName;
		btnReset.textContent = "Try Again";
		var h3 = document.createElement('h3');
		h3.textContent = message; 
		divOverlay.appendChild(h3);
	}

	function checkLetter(button) {
		var liList = document.getElementsByTagName('li');
		var letterFound = "";
		for (var i = 0; i < liList.length; i++) {
			if (liList[i].textContent === button.textContent) {
				liList[i].className += " show";
				letterFound += liList[i];
				button.className = "chosen";
				button.setAttribute("disabled", "disabled");
			} 
		}
		if (letterFound === "") {
			button.className = "error-chosen";
			button.setAttribute("disabled", "disabled");
			missed += 1;
			removeHeart();
		}

		var letters = document.querySelectorAll('.letter').length;
		var show = document.querySelectorAll('.show').length;
		if (missed === 5) {
			screenState(false);
		}
		if (letters === show) {
			screenState(true);
		}
		return letterFound;
	}


	btnReset.addEventListener('click', () => {
		if (isGameStarted === true) {
			location.reload(true);
			// divOverlay.remove();
			// phraseUl.innerHTML = "";
			// var chosen_buttons = document.querySelectorAll(".chosen");
			// for (var i = 0; i < chosen_buttons.length; i++) {
			// 	chosen_buttons[i].classList.remove("chosen");		
			// }
			// var error_chosen_buttons = document.querySelectorAll(".error-chosen"); 
			// for (var i = 0; i < error_chosen_buttons.length; i++) {
			// 	error_chosen_buttons[i].classList.remove("error-chosen");		
			// }
			// phraseArray = getRandomPhraseAsArray(phrases);
	  //   availableLetters = addPhraseToDisplay(phraseArray);
		} else {
			divOverlay.remove();
			isGameStarted = true;
		}
	});

	function addEventToButton(buttons) {
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', buttonPressed);
		}
	}

	function buttonPressed() {
		checkLetter(event.currentTarget);
	}

	addEventToButton(buttons);

});

