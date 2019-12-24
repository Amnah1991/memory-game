// Create a list that holds all of your cards
let icons = ["fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube",
    "fa fa-bomb"];

//Active cards
let openCards = [];
openCards.length = 0;

// Set steps counter to 0 
let stars = document.querySelectorAll('.fa-star');
let movesCounter = document.querySelector('.moves');
movesCounter.textContent = 0;

//set timer
let min = 0;
let sec = 0;
let timer = document.querySelector('#timer');
timer.textContent = '00:00';
setInterval(() => {
    if (sec < 60) {
        sec += 1;
    } else if (sec % 60 == 0) {
        sec = 0;
        min += 1;
    }
    timer.textContent = `${min} : ${sec}`;
}, 1000);


let result = document.querySelector('.result');
let container = document.querySelector('.container');

// reset button
rest();




/*
 * Display the cards on the page
 *   1 - shuffle the list of cards using the provided "shuffle" method below
 *   2 - loop through each card and create its HTML
 *   3 - add each through's HTML to the page
 */

// -1
const list = shuffle(icons);

// -2
let cards = [];
for (let i = 0; i < 16; i++) {
    cards[i] = document.createElement('li');
    cards[i].className = "card";
    cards[i].id = i;
    let iElement = document.createElement('i');
    iElement.className = `${icons[i]}`;
    cards[i].appendChild(iElement);
}

// -3
const deckElement = document.querySelector('.deck');
for (let i = 0; i < 16; i++) {
    deckElement.appendChild(cards[i]);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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

document.body.addEventListener('click', event => {
    if (event.target.classList.contains('card') && event.target.classList.contains('open') === false) {
        let currCard = document.getElementById(event.target.id);
        if (openCards.length === 0) {
            flipCard(currCard);
            openCards[0] = event.target.id;
        } else if (openCards.length === 1) {
            flipCard(currCard);
            openCards[1] = event.target.id;
            let card1 = document.getElementById(openCards[0]);
            let card2 = document.getElementById(openCards[1]);
            checkMatch(card1, card2);
            displayWinningMsg();
        }
    }
});


function checkMatch(card1, card2) {
    if (card1.innerHTML === card2.innerHTML) {
        card1.classList.add('match');
        card1.classList.add('correct');
        card2.classList.add('match');
        card2.classList.add('correct');
    } else {
        card1.classList.add('incorrect');
        card2.classList.add('incorrect');
        setTimeout(function () {
            flipCard(card1);
            flipCard(card2);
            card1.classList.remove('incorrect');
            card2.classList.remove('incorrect');
        }, 1000);
    }
    openCards.length = 0;
    incrementMoves();
}

function flipCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function incrementMoves() {
    let moves = parseInt(movesCounter.textContent)
    movesCounter.textContent = moves + 1;
    if (moves >= 16 && moves <= 24) {
        // two star
        stars[0].classList.remove('fa-star');
        stars[0].classList.add('fa-star-o');
    } else if (moves > 24) {
        //one star
        stars[0].classList.remove('fa-star');
        stars[0].classList.add('fa-star-o');
        stars[1].classList.remove('fa-star');
        stars[1].classList.add('fa-star-o');
    }
}

function displayWinningMsg() {
    let flag = true;
    cards.forEach(element => {
        if (element.classList.contains('match') === false) {
            flag = false;
        }
    });
    if (flag) {
        container.classList.add('hide');
        result.classList.remove('hide');
        let finalTime = document.querySelector('.final-time');
        finalTime.textContent = timer.textContent;
        let finalSteps = document.querySelector('.final-steps');
        finalSteps.textContent = movesCounter.textContent;
        let finalStars = document.querySelector('.final-stars');
        for(let x = 0 ; x < stars.length ; x++){
            let li = document.createElement('li');
            let i =  document.createElement('i');
            i.className = stars[x].className;
            li.appendChild(i);
            finalStars.appendChild(li);
        }
        rest();
    }
}

let playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', function () {
    container.classList.remove('hide');
    result.classList.add('hide');
    location.reload();
});

// Rest button 
function rest() {
    const restBtn = document.querySelector('.restart');
    restBtn.addEventListener('click', function () {
        location.reload();
        for (let i = 0; i < 16; i++) {
            let currCard = document.getElementById(i);
            currCard.classList.remove('open');
            currCard.classList.remove('show');
            currCard.classList.remove('match');
        }
    });
}

