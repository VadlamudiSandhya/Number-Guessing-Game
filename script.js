let randomNumber;
let attempts = 10;
let currentGuess = '';

document.addEventListener('DOMContentLoaded', () => {
    resetGame();

    // Add event listeners to number buttons
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.dataset.key) { // Check if data-key attribute exists
            key.addEventListener('click', () => {
                handleKeyPress(key.dataset.key);
            });
        }
    });

    // Add event listener for the Backspace button
    document.getElementById('backspace').addEventListener('click', () => {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateGuessInput();
        }
    });

    // Add event listeners for the Guess and Restart buttons
    document.getElementById('guessButton').addEventListener('click', handleGuess);
    document.getElementById('restartButton').addEventListener('click', resetGame);

    // Clear button functionality
    document.getElementById('clear').addEventListener('click', () => {
        currentGuess = '';
        updateGuessInput();
    });
});


// Function to reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // New random number
    attempts = 10; // Reset attempts
    currentGuess = ''; // Reset current guess
    document.getElementById('message').textContent = 'Guess a number between 1 and 100:';
    updateGuessInput();
    document.getElementById('restartButton').style.display = 'none'; // Hide restart button
}

// Function to update the guess input display
function updateGuessInput() {
    document.getElementById('guessInput').value = currentGuess; // Update the input field
}

// Function to handle key presses
function handleKeyPress(key) {
    if (currentGuess.length < 3) { // Limit to 3 digits for guessing
        currentGuess += key;
        updateGuessInput();
    }
}

// Function to handle the guess
function handleGuess() {
    if (currentGuess === '') {
        alert('Please enter a guess!');
        return;
    }

    const guess = parseInt(currentGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    attempts--; // Decrease attempts

    if (guess === randomNumber) {
        document.getElementById('message').textContent = `Wow! You won! The number was ${randomNumber}.`;
        document.getElementById('restartButton').style.display = 'block'; // Show restart button
    } else if (attempts === 0) {
        document.getElementById('message').textContent = `Computer won! The number was ${randomNumber}.`;
        document.getElementById('restartButton').style.display = 'block'; // Show restart button
    } else {
        document.getElementById('message').textContent = guess < randomNumber ? `Higher number, please!...     Attempts left: ${attempts}` : `Lower number, please!...     Attempts left: ${attempts}`;
    }

    currentGuess = ''; // Reset current guess
    updateGuessInput(); // Clear input field
}


