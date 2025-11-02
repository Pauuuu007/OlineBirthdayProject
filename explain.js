const explainBoard = document.getElementById("explainBoard");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/Card depan (Anomaline).png", text: "Funfact, Oline termasuk salah satu member yang sering menggunakan filter anomali saat sedang selfie / pap di ig story" },
  { img: "image/Card depan (Cireng keju).png", text: "Funfact, Oline sesuka itu sama cireng keju! bahkan pernah bilang di live, “ini impian aku banget nih!” waktu lagi makan, gemes banget deh" },
  { img: "image/Card depan (Clover).png", text: "Fun fact, Oline termasuk salah satu member yang suka banget sama clover, simbol kecil yang identik dengan keberuntungan. Emoji 🍀 sering muncul di tweet-nya, karena Oline suka sama hal-hal yang berhubungan dengan keberuntungan." },
  { img: "image/Card depan (Coffe).JPG", text: "Fun fact, Oline suka banget sama kopi terutama espresso dan americano. Katanya, minum kopi sebelum beraktivitas bisa bikin harinya lebih semangat dan berenergi." },
  { img: "image/Card depan (Kiyo).png", text: "Fun fact, Oline penyayang sama hewan, apalagi anjing kecil! Oline punya tiga anjing lucu bernama Kiyo, Joy, dan Chiko — trio bayi kecil yang sering muncul pas Oline lagi live 🫣" },
  { img: "image/Card depan (Ayam Mozzarela).jpg", text: "Fun fact, gak semua makanan cocok di lidah Oline! Pas di JKT48TV [Chemistry] bareng Erine, Oline bilang kalau dia gak suka ayam mozzarella karena menurutnya enek aja kalau ayam dicampur keju" }
];

// Buat kartu secara dinamis
cards.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("explain-card");
  card.innerHTML = `<img src="${item.img}" alt="Kartu">`;

  card.addEventListener("click", () => {
    modalText.textContent = item.text;
    modal.classList.remove("hidden");
  });

  explainBoard.appendChild(card);
});

// Tutup modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// ==== BACKSOUND ====
const bgMusic = document.getElementById("bgMusic");

// Coba langsung play setelah halaman load
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
