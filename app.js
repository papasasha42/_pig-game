/* eslint-disable no-use-before-define */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const init = () => {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  prevDice = undefined;

  diceDOM = document.querySelector('.dice');
  btnRoll = document.querySelector('.btn-roll');
  btnHold = document.querySelector('.btn-hold');

  btnRoll.style.display = 'block';
  btnHold.style.display = 'block';

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document
    .querySelector('.player-0-panel')
    .classList.remove('active');
  document
    .querySelector('.player-1-panel')
    .classList.remove('active');
  document
    .querySelector('.player-0-panel')
    .classList.remove('winner');
  document
    .querySelector('.player-1-panel')
    .classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
};

let scores;
let roundScore;
let activePlayer;
let gamePlaying;
let diceDOM;
let btnRoll;
let btnHold;
let currDice;
let prevDice;

init();

const nextPlayer = () => {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document
    .querySelector('.player-0-panel')
    .classList.toggle('active');
  document
    .querySelector('.player-1-panel')
    .classList.toggle('active');
  diceDOM.style.display = 'none';
};

// button ROLL functionality
btnRoll.addEventListener('click', () => {
  if (gamePlaying) {
    // get random number
    prevDice = currDice;
    currDice = Math.floor(Math.random() * 6) + 1;

    // display the result
    diceDOM.src = `public/dice-${currDice}.png`;
    diceDOM.style.display = 'block';

    // update the round score IF rolled number wasn't 1
    if (currDice !== 1) {
      roundScore += currDice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// button HOLD functionality
btnHold.addEventListener('click', () => {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent =
        'WINNER';
      diceDOM.style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
      gamePlaying = false;
      btnRoll.style.display = 'none';
      btnHold.style.display = 'none';
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
