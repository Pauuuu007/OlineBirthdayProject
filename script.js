// Memory Match Game - 10 cards (5 pairs), shuffled every load
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const restartBtn = document.getElementById('restart');

// 5 emoji images (pairs)
const IMAGES = ['🌟','🍀','🐱','🎈','🍩'];

// Generate a shuffled deck (5 pairs -> 10 cards)
function makeDeck(){
  const pairList = IMAGES.flatMap((emoji, i) => [
    { id: i*2,   key: emoji, emoji },
    { id: i*2+1, key: emoji, emoji },
  ]);
  // Fisher-Yates shuffle
  for(let i = pairList.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [pairList[i], pairList[j]] = [pairList[j], pairList[i]];
  }
  return pairList;
}

let deck = [];
let first = null;
let second = null;
let lock = false;
let moves = 0;
let matches = 0;

// Simple audio using Web Audio API (no external files)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function beep(freq=440, duration=0.15, type='sine', vol=0.2){
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  setTimeout(()=>{ o.stop(); }, duration*1000);
}
function sfxCorrect(){
  // little arpeggio
  beep(660, .10, 'sine', .2);
  setTimeout(()=>beep(880, .12, 'sine', .22), 110);
  setTimeout(()=>beep(990, .14, 'sine', .24), 240);
}
function sfxWrong(){
  // short buzzy tone
  beep(180, .20, 'square', .18);
  setTimeout(()=>beep(150, .18, 'square', .18), 120);
}

// Render board
function render(){
  board.innerHTML = '';
  deck.forEach((card, idx) => {
    const el = document.createElement('button');
    el.className = 'card';
    el.setAttribute('aria-label', 'Kartu tertutup');
    el.style.animationDelay = (idx * 0.08) + 's'; // deal-in stagger

    const back = document.createElement('div');
    back.className = 'face back';
    const dot = document.createElement('div');
    dot.className = 'dot';
    back.appendChild(dot);

    const front = document.createElement('div');
    front.className = 'face front';
    front.textContent = card.emoji;

    el.appendChild(back);
    el.appendChild(front);

    el.addEventListener('click', () => onFlip(el, card));
    board.appendChild(el);
    card._el = el;
  });
  movesEl.textContent = moves;
  matchesEl.textContent = matches;
}

function onFlip(el, card){
  if(lock) return;
  if(el.classList.contains('is-flipped')) return; // already open
  if(card.matched) return;

  el.classList.add('is-flipped');

  if(!first){
    first = card;
    return;
  }
  if(first && !second){
    second = card;
    moves++;
    movesEl.textContent = moves;

    // check match
    if(first.key === second.key){
      // match
      first.matched = true;
      second.matched = true;
      first._el.classList.add('is-matched');
      second._el.classList.add('is-matched');
      matches++;
      matchesEl.textContent = matches;
      sfxCorrect();
      first = null; second = null;

      // win state
      if(matches === IMAGES.length){
        setTimeout(()=>{
          alert('Mantap! Semua pasangan berhasil dicocokkan 🎉');
        }, 350);
      }
    } else {
      // not match
      lock = true;
      sfxWrong();
      setTimeout(()=>{
        first._el.classList.remove('is-flipped');
        second._el.classList.remove('is-flipped');
        first = null; second = null; lock = false;
      }, 800);
    }
  }
}

// Restart / new game
function start(){
  deck = makeDeck();
  first = second = null;
  lock = false;
  moves = 0;
  matches = 0;
  render();
}

restartBtn.addEventListener('click', start);

// Start on load
start();
