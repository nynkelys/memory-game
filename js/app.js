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

const deck = document.getElementById('deck'); // Create reference to #deck

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

function clickCard(event) {
	event.target.classList.add('open', 'show');
};

// Start game
updateDeck();