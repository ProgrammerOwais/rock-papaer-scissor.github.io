const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultText = document.getElementById("result");
const resultDiv = document.querySelector(".result");
const scoreBoardDiv = document.querySelector(".score-board");
const restartBtn = document.getElementById("play-again");

let userScore = 0;
let computerScore = 0;

// Play game function
function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      lose(userChoice, computerChoice);
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw(userChoice, computerChoice);
      break;
  }
}

// Get computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Win function
function win(userChoice, computerChoice) {
  userScore++;
  userScoreEl.innerText = userScore;
  resultText.innerText = `${userChoice} beats ${computerChoice}. You win!`;
  resultDiv.classList.add("win");
  scoreBoardDiv.classList.add("win");
  setTimeout(() => {
    resultDiv.classList.remove("win");
    scoreBoardDiv.classList.remove("win");
  }, 1000);
  checkGameOver();
}

// Lose function
function lose(userChoice, computerChoice) {
  computerScore++;
  computerScoreEl.innerText = computerScore;
  resultText.innerText = `${computerChoice} beats ${userChoice}. You lose!`;
  resultDiv.classList.add("lose");
  scoreBoardDiv.classList.add("lose");
  setTimeout(() => {
    resultDiv.classList.remove("lose");
    scoreBoardDiv.classList.remove("lose");
  }, 1000);
  checkGameOver();
}

// Draw function
function draw(userChoice, computerChoice) {
  resultText.innerText = `${userChoice} and ${computerChoice}. It's a draw!`;
  resultDiv.classList.add("draw");
  scoreBoardDiv.classList.add("draw");
  setTimeout(() => {
    resultDiv.classList.remove("draw");
    scoreBoardDiv.classList.remove("draw");
  }, 1000);
  checkGameOver();
}

// Check game over
function checkGameOver() {
  if (userScore === 5) {
    endGame("Congratulations! You won the game!");
  } else if (computerScore === 5) {
    endGame("Sorry, you lost the game. Better luck next time!");
  }
}

// End game function
function endGame(message) {
  resultText.innerText = message;
  restartBtn.style.display = "block";
  choices.forEach((choice) => choice.removeEventListener("click", handleClick));
}

// Restart game function
function restartGame() {
  userScore = 0;
  computerScore = 0;
  userScoreEl.innerText = userScore;
  computerScoreEl.innerText = computerScore;
  resultText.innerText = "Pick your move:";
  restartBtn.style.display = "none";
  choices.forEach((choice) => choice.addEventListener("click", handleClick));
}

// Handle click function
function handleClick(event) {
  console.log(event.target);
  playGame(event.target.id);
}

// Event listeners
choices.forEach((choice) => choice.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
