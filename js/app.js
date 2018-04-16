const cardsArray = [ // Create list that holds all cards
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

// ------------------------------------------------------------------------------------

// DISPLAY CARDS ON PAGE

const deck = document.getElementById('deck') // Create reference to #deck

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

// Create function createDeck()
function createDeck() {
	// Loop through every item in shuffled cards array
	for (let card of shuffledArray) {
		let listEl = document.createElement('li'); // Create element <li> // Alternatively, use .attr
		listEl.classList.add('card'); // Add .card to <li>
		let itemEl = document.createElement('i'); // Create element <i>
		itemEl.classlist('fa'); // Add .fa to <i>
		itemEl.classList.add(shuffledArray[i]); // Also add .fa-x to <i>
		//Add HTML to page
		listEl.appendChild(itemEl); // Append every <i> to every <li>
		deck.appendChild(listEl); // Append every <li> to #deck
	};
};

// Create function updateDeck() in which both shuffle() and createDeck() are called
function updateDeck() {
	shuffledArray = shuffle(cardsArray); // Calls shuffle function
	createDeck(shuffledArray); // Calls createDeck function (that takes shuffled array as an argument)
};

// ------------------------------------------------------------------------------------

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
