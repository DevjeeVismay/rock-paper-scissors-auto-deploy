// Game state variables
let userScore = 0;
let computerScore = 0;
const winningScore = 5;
let gameHistory = [];
let isAnimating = false;

// DOM Elements
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const matchHistory = document.getElementById('match-history');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resetButton = document.getElementById('reset-game');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');

// Hand images mapping
const handImages = {
    rock: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f44a.png',
    paper: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f590.png',
    scissors: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/270c.png'
};

// Sound effects (optional - uncomment if you want to add sounds)
/*
const sounds = {
    win: new Audio('win.mp3'),
    lose: new Audio('lose.mp3'),
    draw: new Audio('draw.mp3'),
    click: new Audio('click.mp3')
};
*/

// Initialize the game
function init() {
    // Add event listeners to buttons
    rockButton.addEventListener('click', () => playGame('rock'));
    paperButton.addEventListener('click', () => playGame('paper'));
    scissorsButton.addEventListener('click', () => playGame('scissors'));
    resetButton.addEventListener('click', resetGame);
    
    // Reset everything to initial state
    resetGame();
}

// Computer choice function - returns rock, paper, or scissors
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Main game function
function playGame(userChoice) {
    // Don't allow clicks during animation
    if (isAnimating) return;
    
    // Start animation flag
    isAnimating = true;
    
    // Reset hands to rock for animation
    playerHand.querySelector('img').src = handImages.rock;
    computerHand.querySelector('img').src = handImages.rock;
    
    // Change text during animation
    resultText.textContent = "Rock, Paper, Scissors...";
    
    // Add shake animation
    playerHand.classList.add('shake-player');
    computerHand.classList.add('shake-computer');
    
    // Get computer choice
    const computerChoice = getComputerChoice();
    
    // Remove animation and show results after the animation completes
    setTimeout(() => {
        // Remove shake animations
        playerHand.classList.remove('shake-player');
        computerHand.classList.remove('shake-computer');
        
        // Update hand images
        playerHand.querySelector('img').src = handImages[userChoice];
        computerHand.querySelector('img').src = handImages[computerChoice];
        
        // Determine winner and update score
        const result = determineWinner(userChoice, computerChoice);
        updateScore(result);
        updateUI(userChoice, computerChoice, result);
        
        // Reset animation flag
        isAnimating = false;
        
        // Check if game is over
        checkGameOver();
    }, 1500);
}

// Determine the winner
function determineWinner(userChoice, computerChoice) {
    // Draw case
    if (userChoice === computerChoice) {
        return 'draw';
    }
    
    // User wins cases
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    
    // Computer wins
    return 'lose';
}

// Update the score based on the result
function updateScore(result) {
    if (result === 'win') {
        userScore++;
        userScoreElement.textContent = userScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
    
    // Add to game history
    gameHistory.push(result);
    updateMatchHistory();
}

// Update the UI with the result
function updateUI(userChoice, computerChoice, result) {
    // Update result text
    switch(result) {
        case 'win':
            resultText.textContent = `You win! ${capitalizeFirstLetter(userChoice)} beats ${computerChoice}`;
            resultText.style.color = 'var(--win-color)';
            break;
        case 'lose':
            resultText.textContent = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${userChoice}`;
            resultText.style.color = 'var(--lose-color)';
            break;
        case 'draw':
            resultText.textContent = `It's a draw! Both chose ${userChoice}`;
            resultText.style.color = 'var(--draw-color)';
            break;
    }
    
    // Play sound (optional - uncomment if you added sounds)
    /*
    if (sounds[result]) {
        sounds[result].play();
    }
    */
}

// Update the match history display
function updateMatchHistory() {
    // Clear current history display
    matchHistory.innerHTML = '';
    
    // Create history dots
    gameHistory.forEach(result => {
        const historyDot = document.createElement('div');
        historyDot.classList.add('history-item');
        historyDot.classList.add(result);
        matchHistory.appendChild(historyDot);
    });
}

// Check if the game is over (someone reached winning score)
function checkGameOver() {
    if (userScore >= winningScore) {
        resultText.textContent = '🏆 You won the game! 🏆';
        resultText.style.color = 'var(--win-color)';
        disableGameButtons(true);
    } else if (computerScore >= winningScore) {
        resultText.textContent = '😢 Computer won the game! 😢';
        resultText.style.color = 'var(--lose-color)';
        disableGameButtons(true);
    }
}

// Reset the game
function resetGame() {
    // Reset scores
    userScore = 0;
    computerScore = 0;
    gameHistory = [];
    
    // Update UI
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    resultText.textContent = "Choose your weapon!";
    resultText.style.color = 'var(--light-color)';
    
    // Reset hands
    playerHand.querySelector('img').src = handImages.rock;
    computerHand.querySelector('img').src = handImages.rock;
    
    // Clear match history
    matchHistory.innerHTML = '';
    
    // Enable game buttons
    disableGameButtons(false);
}

// Enable/disable game buttons
function disableGameButtons(disabled) {
    rockButton.disabled = disabled;
    paperButton.disabled = disabled;
    scissorsButton.disabled = disabled;
    
    // Also update opacity to give visual feedback
    const opacity = disabled ? '0.5' : '1';
    rockButton.style.opacity = opacity;
    paperButton.style.opacity = opacity;
    scissorsButton.style.opacity = opacity;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);