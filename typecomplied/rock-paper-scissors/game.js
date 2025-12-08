"use strict";
const playerChoice = document.getElementById('player-choice');
const computerChoice = document.getElementById('computer-choice');
const playerScore = document.getElementById('player-display');
const computerScore = document.getElementById('computer-display');
const resultDisplay = document.getElementById('result');
const choices = ['👊', '🤲', '✌️'];
let playerScoreCount = 0;
let computerScoreCount = 0;
function playGame(playerSelection) {
    const computerChoices = choices[Math.random() * choices.length | 0];
    playerChoice.textContent = playerSelection;
    computerChoice.textContent = computerChoices;
    if (playerSelection === computerChoices) {
        resultDisplay.style.color = 'blue';
        resultDisplay.innerHTML = "IT'S A TIE!";
    }
    else {
        switch (playerSelection) {
            case '👊':
                if (computerChoices === '✌️') {
                    playerScoreCount++;
                    resultDisplay.style.color = 'green';
                    resultDisplay.innerHTML = 'YOU WIN! ROCK BEATS SCISSORS';
                }
                break;
            case '🤲':
                if (computerChoices === '👊') {
                    playerScoreCount++;
                    resultDisplay.style.color = 'green';
                    resultDisplay.innerHTML = 'YOU WIN! PAPER BEATS ROCK';
                }
                break;
            case '✌️':
                if (computerChoices === '🤲') {
                    playerScoreCount++;
                    resultDisplay.style.color = 'green';
                    resultDisplay.innerHTML = 'YOU WIN! SCISSORS BEATS PAPER';
                }
                break;
        }
        switch (computerChoices) {
            case '👊':
                if (playerSelection === '✌️') {
                    computerScoreCount++;
                    resultDisplay.style.color = 'red';
                    resultDisplay.innerHTML = 'YOU LOSE! ROCK BEATS SCISSORS';
                }
                break;
            case '🤲':
                if (playerSelection === '👊') {
                    computerScoreCount++;
                    resultDisplay.style.color = 'red';
                    resultDisplay.innerHTML = 'YOU LOSE! PAPER BEATS ROCK';
                }
                break;
            case '✌️':
                if (playerSelection === '🤲') {
                    computerScoreCount++;
                    resultDisplay.style.color = 'red';
                    resultDisplay.innerHTML = 'YOU LOSE! SCISSORS BEATS PAPER';
                }
                break;
        }
        playerScore.textContent = `PLAYER SCORE: ${playerScoreCount.toString()}`;
        computerScore.textContent = `COMPUTER SCORE: ${computerScoreCount.toString()}`;
    }
}
