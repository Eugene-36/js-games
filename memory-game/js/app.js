document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png',
    },
    {
      name: 'fries',
      img: 'images/fries.png',
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png',
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png',
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png',
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png',
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png',
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png',
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png',
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png',
    },
    {
      name: 'pizza',
      img: 'images/pizza.png',
    },
    {
      name: 'pizza',
      img: 'images/pizza.png',
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  var cardsChoosen = [];
  var cardChooseId = [];
  var cardsWon = [];
  //create your board

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  createBoard();

  //check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('img');
    const optionOneId = cardChooseId[0];
    const optionTwoId = cardChooseId[1];

    if (cardsChoosen[0] === cardsChoosen[1]) {
      alert('You found a match');

      cards[optionOneId].setAttribute('src', 'images/white.png');
      cards[optionTwoId].setAttribute('src', 'images/white.png');
      cardsWon.push(cardsChoosen);
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('Sorry, try again');
    }

    cardsChoosen = [];
    cardChooseId = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cards.length / 2) {
      resultDisplay.textContent = 'Congratulations! You found them all!';
    }
  }

  //flip your card
  function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChoosen.push(cardArray[cardId].name);
    cardChooseId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChoosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
});
