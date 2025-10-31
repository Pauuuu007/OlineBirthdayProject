const explainBoard = document.getElementById("explainBoard");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/Card depan (Anomaline).png", text: "Funfact, oline termasuk salah satu member yang sering menggunakan filter anomali saat sedang selfie / pap d ig story" },
  { img: "image/Card depan (Cireng keju).png", text: "Funfact, oline sesuka itu sama cireng keju! bahkan pernah bilang di live, “ini impian aku banget nih!” waktu lagi makan, gemes banget deh" },
  { img: "image/Card depan (Clover).png", text: "Funfact, oline termasuk salah satu member yang suka banget sama clover simbol kecil yang identik dengan keberuntungan, sering banget pakai emoji 🍀 saat ngetweet dan hal-hal yang berhubungan sama daun keberuntungan ini selalu menarik buat dia" },
  { img: "image/Card depan (Coffe).JPG", text: "Funfact, oline suka banget sama kopi terutama espresso dan americano. Ia pernah bilang di live kalau minum kopi sebelum beraktivitas bisa membantu harinya lebih semangat dan berenergi" },
  { img: "image/Card depan (Kiyo).png", text: "Funfact, oline penyayang banget sama hewan, terutama puppies, oline punya tiga anjing lucu bernama Kiyo, Joy, dan Chiko trio bayi kecil yang sering banget muncul pas oline lagi live dan reaksinya oline selalu gemesin banget" },
  { img: "image/Card depan (Ayam Mozzarela).jpg", text: "Funfact, gak semua makanan jadi favorit oline waktu di konten JKT48TV [Chemistry] bareng Erine, dia bilang kalau dia gak suka sama ayam mozzarella" }
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
