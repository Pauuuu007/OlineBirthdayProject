const cards = document.querySelectorAll('.card');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const quoteText = document.getElementById('quoteText');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const quote = card.getAttribute('data-quote');
    quoteText.textContent = quote;
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
