const cards = document.querySelectorAll('.card');

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
    // ambil random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // aktifkan efek
    card.classList.add('active');
    card.innerHTML = `
      <span class="close">&times;</span>
      <div class="quote">${randomQuote}</div>
    `;

    // tombol close
    const closeBtn = card.querySelector('.close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('active');
      card.innerHTML = ""; // reset isi kartu
    });
  });
});
