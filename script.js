'use strict';

// selectors
let secretNumber = document.querySelector('.number');
let oldScore = document.querySelector('.score');
let body = document.querySelector('body');
let highscore = document.querySelector('.highscore');

// random secret number generator
let randomSecretNumber = Math.trunc(Math.random() * 20 + 1);
secretNumber.textContent = randomSecretNumber;

let newScore = 20;
let highestScore = 0;
let winner = false;

// on clikc event handler
document.querySelector('.check').addEventListener('click', function () {
    // get the user input
    const userGuess = Number(document.querySelector('.guess').value);

    // input validations
    if (!userGuess) {
        gameResultMessage(' ⛔️ Pleae Enter A Number');
        return;
    }

    if (userGuess < 0 || userGuess > 20) {
        gameResultMessage(' ⚠️ Enter a number between 0 and 20');
        return;
    }

    // input controls
    if (newScore > 1) {
        // when user guess higher
        userGuess > randomSecretNumber
            ? gameResultMessage('Too High!')
            : gameResultMessage('Too Low!');
        newScore--;
        oldScore.textContent = newScore;

        // when, user win the game
        if (userGuess === randomSecretNumber) {
            if (winner == true) return;
            gameResultMessage('✅ You Won The Game');
            newScore--;
            oldScore.textContent = newScore;

            body.style.backgroundColor = '#5bb450';

            secretNumber.textContent = randomSecretNumber;

            highestScore = newScore;
            highscore.textContent = highestScore;

            winner = true;
        }
    } else {
        // when user loses the game, and score equals to zero
        gameResultMessage('❌ You Lost The Game');
        body.style.backgroundColor = '#ff6347';
        if (newScore == 0) return;
        newScore--;
        oldScore.textContent = newScore;

        highestScore = newScore;
        highscore.textContent = highestScore;

        return;
    }
});

function gameResultMessage(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.again').addEventListener('click', function () {
    winner = false;
    oldScore.textContent = newScore = 20;
    randomSecretNumber = Math.trunc(Math.random() * 20 + 1);

    document.querySelector('.guess').value = '';
    secretNumber.textContent = '?';

    gameResultMessage('Start guessing...');

    body.style.backgroundColor = '#222';

    secretNumber.textContent = randomSecretNumber;
});
