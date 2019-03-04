"use strict"

let myScore = 0;
let compScore = 0;
var playedRoundsQuantity = 0;
const myScore_span = document.getElementById("my-score");
const compScore_span = document.getElementById("comp-score");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const rock = document.getElementById("rock");
const items = document.querySelectorAll(".item");
const movements = document.querySelector(".movements");
const choices = ['rock', 'paper', 'scissors'];
const resetButton = document.querySelector('.reset');
const resultMessage = document.querySelector('.result');


var compChoiceResult;
var userChoiceResult;

var setRoundsQuantityPrompt = prompt('How many rounds do you wanna play?', '');
var setRoundsQuantity = parseInt(setRoundsQuantityPrompt);


function compChoice() {
  let compRandom = Math.floor(Math.random() * 3);
  compChoiceResult = choices[compRandom];
}

function logic() {

  switch (userChoiceResult + compChoiceResult) {
    case "paperscissors":
    case "rockpaper":
    case "scissorsrock":
      compScore++;
      compScore_span.innerHTML = compScore;
      movements.innerHTML = `You <span class="lost">lost</span> by <span class="user-choice">${userChoiceResult}</span> against <span class="comp-choice">${compChoiceResult}</span>`;
      break;
    case "paperrock":
    case "scissorspaper":
    case "rockscissors":
      myScore++;
      myScore_span.innerHTML = myScore;
      movements.innerHTML = `You <span class="win">win</span> by <span class="user-choice">${userChoiceResult}</span> against <span class="comp-choice">${compChoiceResult}</span>`;
      break;
  }

  if (userChoiceResult == compChoiceResult) {
    movements.innerHTML = `It's a draw (<span class="user-choice">${userChoiceResult}</span> against <span class="comp-choice">${compChoiceResult}</span>)`;
  }
};

function newGame() {
  setRoundsQuantity = prompt('How many rounds do you wanna play?', '');
  playedRoundsQuantity = 0;
  myScore = 0;
  compScore = 0;
  compScore_span.innerHTML = compScore;
  myScore_span.innerHTML = myScore;
  movements.innerHTML = 'Make your move';
  resultMessage.innerHTML = '';
  resultMessage.classList.remove('win', 'lose')
};


for (var i = 0; i < items.length; i++) {

  items[i].addEventListener('click', function (userChoice) {

    if (playedRoundsQuantity < setRoundsQuantity) {

    compChoice();
    userChoiceResult = choices[userChoice];
    logic();
    items[userChoice].classList.add('active');
    setTimeout(() => {
      items[userChoice].classList.remove('active')
    }, 1000);
    playedRoundsQuantity++;

    } if (playedRoundsQuantity >= setRoundsQuantity) {
      switch (true) {
        case (myScore < compScore):
          resultMessage.innerHTML = 'YOU LOSE! Try again.';
          resultMessage.classList.add('lose');
          setTimeout(newGame, 2000);
        break;
        case (myScore > compScore):
          resultMessage.innerHTML = 'YOU WIN! Congrats!';
          resultMessage.classList.add('win');
          setTimeout(newGame, 2000);
        break;
        case (myScore === compScore):
          resultMessage.innerHTML = 'ITS A DRAW! Try again.';
          setTimeout(newGame, 2000);
        break;
      }
    };

  }.bind(null, i));
};

resetButton.addEventListener('click', newGame);

