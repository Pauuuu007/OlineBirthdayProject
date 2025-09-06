// memory-match game (robust click handling + audio resume)
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const restartBtn = document.getElementById('restart');

const IMAGES = ['🌟','🍀','🐱','🎈','🍩']; // 5 pairs

// Audio (WebAudio), resume when first user interaction
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function resumeAudioIfNeeded(){
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{});
}
function beep(freq=440,dur=0.12,type='sine',vol=0.2){
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  setTimeout(()=>o.stop(), dur*1000);
}
function sfxCorrect(){
  beep(660, .09, 'sine', .18);
  setTimeout(()=>beep(880, .10, 'sine', .2), 90);
  setTimeout(()=>beep(1020, .12, 'sine', .22), 200);
}
function sfxWrong(){
  beep(220, .18, 'square', .14);
  setTimeout(()=>beep(170, .14, 'square', .12), 110);
}

// create deck and shuffle
function makeDeck(){
  const base = IMAGES.flatMap((emoji,i)=>[
    {id: i*2, key: emoji, emoji},
    {id: i*2+1, key: emoji, emoji}
  ]);
  // Fisher-Yates
  for(let i=base.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base;
}

let deck = [];
let first = null, second = null;
let lock = false;
let moves = 0, matches = 0;

// render board - use index mapping for event delegation
function render(){
  board.innerHTML = '';
  deck.forEach((card, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'card';
    btn.type = 'button';
    btn.dataset.idx = idx;
    btn.setAttribute('aria-label','Kartu tertutup');
    btn.style.animationDelay = (idx * 0.06) + 's';

    const back = document.createElement('div'); back.className='face back';
    const dot = document.createElement('div'); dot.className='dot'; back.appendChild(dot);

    const front = document.createElement('div'); front.className='face front'; front.textContent = card.emoji;

    btn.appendChild(back); btn.appendChild(front);
    board.appendChild(btn);
  });
  movesEl.textContent = moves;
  matchesEl.textContent = matches;
}

// flip logic handled via delegation
board.addEventListener('click', (ev)=>{
  resumeAudioIfNeeded();
  const btn = ev.target.closest('button.card');
  if(!btn) return;
  const idx = Number(btn.dataset.idx);
  if(Number.isNaN(idx)) return;
  onFlip(btn, deck[idx]);
});
board.addEventListener('keydown', (ev)=>{
  // keyboard support (Enter / Space)
  if(ev.key === 'Enter' || ev.key === ' '){
    const active = document.activeElement;
    if(active && active.classList && active.classList.contains('card')){
      ev.preventDefault();
      const idx = Number(active.dataset.idx);
      onFlip(active, deck[idx]);
    }
  }
});

function onFlip(el, card){
  if(lock) return;
  if(el.classList.contains('is-flipped') || card.matched) return;

  // flip visual
  el.classList.add('is-flipped');

  if(!first){
    first = {card, el};
    return;
  }
  if(first && !second){
    second = {card, el};
    moves++; movesEl.textContent = moves;

    // match?
    if(first.card.key === second.card.key){
      first.card.matched = true; second.card.matched = true;
      first.el.classList.add('is-matched'); second.el.classList.add('is-matched');
      matches++; matchesEl.textContent = matches;
      sfxCorrect();
      first = second = null;
      if(matches === IMAGES.length){
        setTimeout(()=> alert('Mantap! Semua pasangan berhasil dicocokkan 🎉'), 350);
      }
    } else {
      // wrong -> play sound and flip back after delay
      lock = true;
      sfxWrong();
      setTimeout(()=>{
        first.el.classList.remove('is-flipped');
        second.el.classList.remove('is-flipped');
        first = second = null;
        lock = false;
      }, 700);
    }
  }
}

// restart
function start(){
  deck = makeDeck();
  first = second = null; lock = false;
  moves = 0; matches = 0;
  render();
}

restartBtn.addEventListener('click', ()=>{ resumeAudioIfNeeded(); start(); });

// init
start();
