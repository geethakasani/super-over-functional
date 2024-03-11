const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const team1ScoreDisplay = document.getElementById("score-team1");
const team1WicketsDisplay = document.getElementById("wickets-team1");
const team2ScoreDisplay = document.getElementById("score-team2");
const team2WicketsDisplay = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

let team1Score = 0;
let team1Wickets = 0;
let team2Score = 0;
let team2Wickets = 0;
let team1BallsFaced = 0;
let team2BallsFaced = 0;
let turn = 1;

strikeButton.onclick = () => {
  // Play audio
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  // Generate random runs between 0 and 6
  const runs = Math.floor(Math.random() * 7);

  // Update scores based on the current team
  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(
      `#team1-superover div:nth-child(${team1BallsFaced})`
    ).textContent = runs;
    if (runs === "W") {
      team1Wickets++;
    } else {
      team1Score += runs;
    }
    updateScore();
    // Check for game over conditions
    if (team1BallsFaced === 6 || team1Wickets === 2) {
      turn = 2;
    }
  } else if (turn === 2) {
    team2BallsFaced++;
    document.querySelector(
      `#team2-superover div:nth-child(${team2BallsFaced})`
    ).textContent = runs;
    if (runs === "W") {
      team2Wickets++;
    } else {
      team2Score += runs;
    }
    updateScore();
    // Check for game over conditions
    if (team2BallsFaced === 6 || team2Wickets === 2) {
      turn = 3;
      declareWinner();
    }
  }
};

function updateScore() {
  team1ScoreDisplay.textContent = team1Score;
  team1WicketsDisplay.textContent = team1Wickets;
  team2ScoreDisplay.textContent = team2Score;
  team2WicketsDisplay.textContent = team2Wickets;
}

function declareWinner() {
  gameOverAudio.play();
  if (team1Score > team2Score) {
    alert("IND wins!");
  } else if (team2Score > team1Score) {
    alert("PAK wins!");
  } else {
    alert("It's a tie!");
  }
}

resetButton.addEventListener('click', () => {
    window.location.reload();
  });
  