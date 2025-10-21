const explainBoard = document.getElementById("explainBoard");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/Card depan (Anomaline).png", text: "Anomaline melambangkan hal-hal yang tampak berbeda tapi tetap menarik perhatian, sama seperti sisi unik Oline." },
  { img: "image/Card depan (Cireng keju).png", text: "Cireng keju menggambarkan kehangatan dan kesederhanaan yang justru bikin nyaman." },
  { img: "image/Card depan (Clover).png", text: "Clover adalah simbol keberuntungan — seolah semesta selalu kasih alasan buat senyum." },
  { img: "image/Card depan (Coffe).JPG", text: "Kopi menggambarkan rutinitas tenang tapi berarti, seperti obrolan kecil yang jadi hangat." },
  { img: "image/Card depan (Kiyo).png", text: "Kiyo mewakili karakter lembut tapi kuat — kayak Oline yang nggak banyak bicara tapi dalam." }
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
