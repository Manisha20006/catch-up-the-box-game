const box = document.getElementById("box");
const area = document.getElementById("area");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const timeText = document.getElementById("time");
const message = document.getElementById("message");

let score = 0;
let time = 10;
let highScore = localStorage.getItem("highScore") || 0;

highScoreText.textContent = highScore;

const colors = [
  "#ff4d4d",
  "#4dff4d",
  "#4dd2ff",
  "#ffe600",
  "#ff66ff",
  "#00ffd5"
];

function moveBox() {
  const maxX = area.clientWidth - 60;
  const maxY = area.clientHeight - 60;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.background = randomColor;
}

box.addEventListener("click", () => {
  score++;
  scoreText.textContent = score;
  moveBox();
});

function countdown() {
  time--;
  timeText.textContent = time;

  if (time === 0) {
    endGame();
  }
}

function endGame() {
  box.style.display = "none";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreText.textContent = highScore;
  }

  message.style.display = "flex";
  message.innerHTML = `
    <div>${score > highScore ? "🏆 NEW HIGH SCORE!" : "⏰ TIME UP!"}</div>
    <div>Your Score: ${score}</div>
    <button onclick="restartGame()">🔁 Play Again</button>
  `;

  clearInterval(timer);
}

function restartGame() {
  score = 0;
  time = 10;
  scoreText.textContent = score;
  timeText.textContent = time;
  box.style.display = "block";
  message.style.display = "none";
  moveBox();
  timer = setInterval(countdown, 1000);
}

moveBox();
let timer = setInterval(countdown, 1000);
