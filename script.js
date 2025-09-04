const cards = document.querySelectorAll('.card');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const quoteText = document.getElementById('quoteText');

const quotes = [
  "Hidup adalah perjalanan, nikmati setiap langkahnya.",
  "Kamu lebih kuat daripada yang kamu kira.",
  "Setiap hari adalah kesempatan baru.",
  "Percaya pada dirimu, dunia akan ikut percaya.",
  "Kebahagiaan datang dari hati yang bersyukur.",
  "Jangan takut gagal, karena kegagalan adalah guru terbaik.",
  "Tetaplah berjalan, meski perlahan.",
  "Orang sabar akan mendapatkan hasil terbaik.",
  "Bermimpi besar, mulai dari langkah kecil.",
  "Keajaiban datang ketika kamu tidak menyerah."
];

cards.forEach(card => {
  card.addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote;
    popup.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});

