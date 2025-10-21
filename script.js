const gameBoard = document.getElementById("gameBoard");
const stepsText = document.getElementById("steps");
const matchesText = document.getElementById("matches");
const restartBtn = document.getElementById("restart");
const nextPageBtn = document.getElementById("nextPage");

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

let steps = 0;
let matches = 0;
let firstCard = null;
let lockBoard = false;

const images = [
  "image/Card depan (Anomaline).png", 
  "image/Card depan (Cireng keju).png", 
  "image/Card depan (Clover).png", 
  "image/Card depan (Coffe).JPG", 
  "image/Card depan (Kiyo).png"
];

let cards = [...images, ...images];
const totalPairs = images.length;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  steps = 0;
  matches = 0;
  updateStatus();
  nextPageBtn.classList.add("hidden"); // sembunyikan tombol next saat mulai game baru

  cards = shuffle(cards);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-back">
          <img src="image/CardBelakang.jpg" alt="back">
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

      if (matches === totalPairs) {
        setTimeout(() => {
          nextPageBtn.classList.remove("hidden"); // tampilkan tombol next
        }, 500);
      }
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
  matchesText.textContent = `Cocok: ${matches}/${totalPairs}`;
}

restartBtn.addEventListener("click", createBoard);
nextPageBtn.addEventListener("click", () => {
  window.location.href = "halaman-berikutnya.html"; // ubah ke file halaman berikut kamu
});

createBoard();
