const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
    "sigh", "tense", "airplane", "ball", "pies", "juice",
    "warlike", "bad", "north", "dependent", "steer", "silver", 
    "quince", "eight", "feeble",
    "admit", "drag", "loving", "gasp",  "bat", "cakes",
    "milk", "hostile", "awful", "south",
    "guide", "gold",  "shallow", "plum",
    "seven", "weak", "confess", "pull", "caring",
    "whisper", "jumpy", "rocket", "disk", "cookies",
    "soda", "aggressive", "poor", "east", 
    "navigate", "bronze", "arrogant", "fake", "mango",
    "five", "frail", "declare", "tug", 
    "breathe", "stiff", "blimp", "cube", "tarts",
    "rotten", "west", "supportive"
  ];
  
let randomWord;
let score = 0;
let time = 10;
// let difficulty = "medium";
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// function gameOver() {
//   endgameElement.innerHTML = `
//     <h1>Time ran out</h1>
//     <p>Your final score is ${score}</p>
//     <button onclick="history.go(0)">Play Again</button>
//     `;
//   endgameElement.style.display = "flex";
// }

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button id="play-again">Play Again</button>
  `;
  endgameElement.style.display = "flex";

  document.getElementById("play-again").addEventListener("click", function () {
    resetGame();
  });
}

function resetGame() { 
  score = 0;
  time = 10;
  scoreElement.innerText = score;
  timeElement.innerText = time + "s";
  text.value = "";
  endgameElement.style.display = "none";

  addWordToDom();

  clearInterval(timeInterval);
  setInterval(updateTime, 1000);
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Init
difficultySelect.value = difficulty;
addWordToDom();
text.focus();