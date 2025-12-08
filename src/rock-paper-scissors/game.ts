const playerChoice = document.getElementById('player-choice')! as HTMLSpanElement;
const computerChoice = document.getElementById('computer-choice')! as HTMLSpanElement;
const playerScore = document.getElementById('player-display')! as HTMLParagraphElement;
const computerScore = document.getElementById('computer-display')! as HTMLParagraphElement;
const resultDisplay = document.getElementById('result')! as HTMLParagraphElement;

const choices: string[] = ['👊','🤲','✌️'];

let playerScoreCount: number = 0;
let computerScoreCount: number = 0;

function playGame(playerSelection: string): void {
    const computerChoices: string = choices[Math.random() * choices.length | 0];
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
    computerScore.textContent =`COMPUTER SCORE: ${computerScoreCount.toString()}`;
}}





