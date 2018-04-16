const cardsArray = [ // Create list that holds all cards
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

const deck = document.getElementById('deck') // Create reference to #deck
let shuffledArray = [];
let matchedCardsArray = [];
let openCardsArray = [];

// Create function updateDeck() in which both shuffle() and createDeck() are called
function updateDeck() {
	shuffledArray = shuffle(cardsArray); // Calls shuffle function
	createDeck(shuffledArray); // Calls createDeck function (that takes shuffled array as an argument)
};

// Create function createDeck()
function createDeck(shuffledArray) {
	// Loop through every item in shuffled cards array
	for (var i = 0; i < shuffledCards.length; i++) {
		let listEl = document.createElement('li'); // Create element <li> // Alternatively, use .attr
		listEl.classList.add('card'); // Add .card to <li>
		let itemEl = document.createElement('i'); // Create element <i>
		itemEl.classList.add('fa'); // Add .fa to <i>
		itemEl.classList.add(shuffledArray[i]); // Also add .fa-x to <i>
		// Add HTML to page
		listEl.appendChild(itemEl); // Append every <i> to every <li>
		deck.appendChild(listEl); // Append every <li> to #deck
		// Add event listener to every item
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
	event.target.classList.add('open');
};

// Start game
updateDeck();