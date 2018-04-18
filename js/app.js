const cards = [ // Create list that holds all cards
	'fa-diamond',
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-anchor',
	'fa-bolt',
	'fa-bolt',
	'fa-cube',
	'fa-cube',
	'fa-leaf',
	'fa-leaf',
	'fa-bicycle',
	'fa-bicycle',
	'fa-bomb',
	'fa-bomb'
];

// ------------------------------------------------------------------------------------

// DISPLAY CARDS ON PAGE


let shuffledCardsArray = [];
let matchedCardsArray = [];
let openCardsArray = [];
let moveCounter = 0;
let timer = {
	seconds: 0,
	minutes: 0,
	clearTime: -1
};
let starCounter = 0;
let timeDisplay = document.getElementsByClassName('timer');
const stars = document.getElementById('stars');
let starsModal = document.getElementById('starsEnd');
const deck = document.getElementById('deck');
let modal = document.getElementById('myModal');
let totalMoves = document.getElementById('movesEnd')
let movesDuring = document.getElementById('moves')

// Create function updateDeck() in which both shuffle() and createDeck() are called
function updateDeck() {
	shuffledCardsArray = shuffle(cards); // Calls shuffle function
	createDeck(shuffledCardsArray); // Calls createDeck function (that takes shuffled array as an argument)
};

// Create function createDeck()
function createDeck(shuffledCardsArray) {
	// Loop through every item in shuffled cards array
	for (var i = 0; i < shuffledCardsArray.length; i++) {
		let listEl = document.createElement('li'); // Create element <li> // Alternatively, use .attr
		listEl.classList.add('card'); // Add .card to <li>
		let itemEl = document.createElement('i'); // Create element <i>
		itemEl.classList.add('fa'); // Add .fa to <i>
		itemEl.classList.add(shuffledCardsArray[i]); // Also add .fa-x to <i>
		// Add HTML to page
		listEl.appendChild(itemEl); // Append every <i> to every <li>
		deck.appendChild(listEl); // Append every <li> to #deck
		// Add eventListener to card
		listEl.addEventListener('click', clickCard);
	};
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

// ------------------------------------------------------------------------------------

// PLAY GAME

function clickCard(event) {
	event.target.classList.add('open', 'show'); // Add classes .open .show to <li> that already has class .card
	event.target.removeEventListener('click', clickCard); // Disable clicking on the same card twice
	checkMatch(event); // For every card that is clicked, checkMatch() is ran
	countMove();
};

function checkMatch(event) {
	openCardsArray.push(event.target.firstChild);

	if(timer.seconds === 0 && timer.minutes === 0) {
		resetTimer();
	};

	if (openCardsArray.length === 2) { // The following is only ran when two cards are in the array, not when only one card is
		document.body.style.pointerEvents = 'none'; // Disable clicking on a third card by disabling clicking on anything until this function is ran completely
		moveCounter = moveCounter + 1; // With every two cards, moveCounter increments by 1

		if (moveCounter === 1 || moveCounter === 3) { // removeStar() needs to be put inside this function, as it depends on moveCounter value
			removeStar();
		};

		// For the two cards that are now in the array...
		// ...check whether the icons in <i> are the same:
		if (openCardsArray[0].className === openCardsArray[1].className) { // IF YES
			openCardsArray[0].parentNode.classList.add('match'); // Add class .match to cards <li> class (parent of <i>)
			openCardsArray[1].parentNode.classList.add('match'); // Could also do loop, but since it's only two items...
			matchedCardsArray.push(openCardsArray[0]); // Add array to matched cards array
			matchedCardsArray.push(openCardsArray[1]);
			openCardsArray = []; // Empty open cards array
			enableClicking(); // Call enable clicking function
		} else { // IF NO
			setTimeout(function() {
				for (let i = 0; i < openCardsArray.length; i++) { // For both cards in the array, make them clickable again
					openCardsArray[i].parentNode.addEventListener('click', clickCard); // Add eventListener back to <li> (openCardsArray[i] refers to <i>, hence parentNode)
				}
			}, 1000);

			setTimeout(noMatchReset, 1000); // Remove classes and make openCardsArray empty
		};
	};

	// Game ending: if matchedCardsArray holds 16 cards
	if (matchedCardsArray.length === 2) {
		clearInterval(timer.clearTime); // Stops timer
		showModal();
	};
};

function countMove() {
	setMovesDuringText(moveCounter);
};

function removeStar() {
	if (moveCounter >= 1) {
		starThree.style.color = '#f9f6e8'
		starCounter = 2;
	};
	if (moveCounter >= 3) {
		starTwo.style.color = '#f9f6e8'
		starCounter = 1;
	};
};

function noMatchReset() {
	for (let i = 0; i < openCardsArray.length; i++) {
		openCardsArray[i].parentNode.classList.remove('show', 'open'); // Flip cards back
	};
	openCardsArray = []; // Empty open cards array
	enableClicking(); // Call enable clicking function
};

function enableClicking() {
	document.body.style.pointerEvents = 'auto'; // Enable clicking remaining cards again after two clicked cards are either a match or not a match
};

// ------------------------------------------------------------------------------------

// TIMER
// This function is only called when first card is clicked
function resetTimer() {
	clearInterval(timer.clearTime); // Reset timer state
	timer.seconds = 0;
	timer.minutes = 0;
	timeDisplay[0].innerHTML = "0:00";

	timer.clearTime = setInterval(startTimer, 1000); // Restarts timer
};

function startTimer() {
	if (timer.seconds === 59) {
		timer.minutes++;
		timer.seconds = 0;
	} else {
		timer.seconds++;
	}

	// Ensure that single digit seconds are preceded with a 0
	let firstSec = "0";
	if (timer.seconds < 10) {
		firstSec += timer.seconds; // Below 10, precede second with 0
	} else {
		firstSec = String(timer.seconds); // 10 and above, just display seconds, no preceding zero
	}

	let time = String(timer.minutes) + ":" + firstSec;
	timeDisplay[0].innerHTML = time;
};

// GAME ENDING

function showModal() {
	modal.style.display = 'block'; // Displays modal as whole
	timeDisplay[1].innerHTML = timeDisplay[0].innerHTML; // Displays time on modal
	totalMoves.innerHTML = moveCounter;
	starsModal.innerHTML = starCounter;
};

function restartGame() {

	updateDeck();
	resetTimer();
	starCounter = 0;
	starTwo.style.color = '#000';
	starThree.style.color = '#000';
	moveCounter = 0;
	setMovesDuringText(0);
};

function setMovesDuringText(numberOfMoves) {
	movesDuring.innerHTML = numberOfMoves;
}

let restartSymbol = document.getElementById('restart');

restartSymbol.addEventListener('click', restartGame)


// Connect to replay symbol

// RESTART
// Hide modal
// startGame()

// REPLAY
// startGame()

// Start game
updateDeck();