const gameBoard = document.getElementById("gameBoard");
const stepsText = document.getElementById("steps");
const matchesText = document.getElementById("matches");
const restartBtn = document.getElementById("restart");

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

let steps = 0;
let matches = 0;
let firstCard = null;
let lockBoard = false;

// Daftar gambar depan
const images = [
  "images/1.png", 
  "images/2.png", 
  "images/3.png", 
  "images/4.png", 
  "images/5.png"
];

let cards = [...images, ...images]; // gandakan jadi 10 kartu

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  steps = 0;
  matches = 0;
  updateStatus();

  cards = shuffle(cards);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-back">
          <img src="images/back.png" alt="back">
        </div>
        <div class="card-front">
          <img src="${symbol}" alt="card">
        </div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, symbol));
    gameBoard.appendChild(card);
  });
}

function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, symbol };
  } else {
    steps++;
    updateStatus();

    if (firstCard.symbol === symbol) {
      matches++;
      updateStatus();
      soundCorrect.play();
      firstCard = null;
    } else {
      lockBoard = true;
      soundWrong.play();
      setTimeout(() => {
        card.classList.remove("flipped");
        firstCard.card.classList.remove("flipped");
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}

function updateStatus() {
  stepsText.textContent = `Langkah: ${steps}`;
  matchesText.textContent = `Cocok: ${matches}/5`;
}

restartBtn.addEventListener("click", createBoard);

// mulai game pertama kali
createBoard();
