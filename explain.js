const explainContainer = document.getElementById("explainContainer");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

// Daftar gambar + penjelasan
const cards = [
  { img: "image/Card depan (Anomaline).png", text: "A" },
  { img: "image/Card depan (Cireng keju).png", text: "B" },
  { img: "image/Card depan (Clover).png", text: "C" },
  { img: "image/Card depan (Coffe).JPG", text: "D" },
  { img: "image/Card depan (Kiyo).png", text: "E" }
];

// buat tampilan 5 kartu vertikal
explanations.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("explain-card");
  card.innerHTML = `<img src="${item.img}" alt="gambar">`;

  card.addEventListener("click", () => {
    popupText.textContent = item.text;
    popup.style.display = "block";
  });

  explainContainer.appendChild(card);
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});
