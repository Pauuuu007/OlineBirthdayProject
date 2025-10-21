const explainBoard = document.getElementById("explainBoard");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/Card depan (Anomaline).png", text: "A" },
  { img: "image/Card depan (Cireng keju).png", text: "B" },
  { img: "image/Card depan (Clover).png", text: "C" },
  { img: "image/Card depan (Coffe).JPG", text: "D" },
  { img: "image/Card depan (Kiyo).png", text: "E" }
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
