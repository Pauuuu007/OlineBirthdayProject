const explainBoard = document.getElementById("explainBoard");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/1.png", text: "Gambar ini melambangkan semangat dan keberanian untuk memulai sesuatu yang baru." },
  { img: "image/2.png", text: "Simbol dari kesetiaan dan ketulusan hati terhadap orang yang kita pedulikan." },
  { img: "image/3.png", text: "Menggambarkan keberuntungan dan harapan yang tidak boleh hilang." },
  { img: "image/4.png", text: "Artinya waktu istirahat dan ketenangan yang kamu butuhkan untuk kembali fokus." },
  { img: "image/5.png", text: "Mewakili cinta sederhana tapi bermakna yang tumbuh dari hal-hal kecil." }
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
