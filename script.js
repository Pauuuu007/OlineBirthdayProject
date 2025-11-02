const gameBoard = document.getElementById("gameBoard");
const stepsText = document.getElementById("steps");
const matchesText = document.getElementById("matches");
const restartBtn = document.getElementById("restart");
const nextPageBtn = document.getElementById("nextPageBtn");

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const bgMusic = document.getElementById("bgMusic");

let steps = 0;
let matches = 0;
let firstCard = null;
let lockBoard = false;

// Daftar gambar depan
const images = [
  "image/Card depan (Anomaline).png", 
  "image/Card depan (Cireng keju).png", 
  "image/Card depan (Clover).png", 
  "image/Card depan (Coffe).JPG", 
  "image/Card depan (Kiyo).png",
  "image/Card depan (Ayam Mozzarela).jpg"
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
          <img src="image/CardBelakang.png" alt="back">
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

  // Kalau semua kartu sudah cocok
  if (matches === 6) {
    setTimeout(() => {
      nextPageBtn.classList.remove("hidden");
    }, 500); // delay setengah detik biar halus
  }

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
  matchesText.textContent = `Cocok: ${matches}/6`;
}

restartBtn.addEventListener("click", createBoard);

// mulai game pertama kali
createBoard();

// pindah halaman berikutnya
nextPageBtn.addEventListener("click", () => {
  window.location.href = "halaman-berikutnya.html";
});


window.addEventListener("load", () => {
  bgMusic.volume = 0.5; // biar gak terlalu kenceng
  const playPromise = bgMusic.play();
  
  // Kalau browser blokir autoplay, tunggu interaksi pertama
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      document.body.addEventListener("click", () => {
        bgMusic.play();
      }, { once: true });
    });
  }
});






