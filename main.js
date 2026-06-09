/* ── Starfield ── */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      s: (Math.random() * 0.005) + 0.002
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.s;
    if (s.a > 1 || s.a < 0) s.s *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,200,240,${s.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
initStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

/* ── Floating hearts ── */
const container = document.getElementById('heartsContainer');
const symbols = ['\uD83D\uDC96','\uD83D\uDC97','\uD83D\uDC93','\uD83D\uDC95','\uD83D\uDC9E','\u2764\uFE0F','\uD83E\uDE77','\u2728'];

function spawnHeart() {
  const el = document.createElement('span');
  el.classList.add('heart-particle');
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 7 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay    = Math.random() * 4 + 's';
  el.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + 4) * 1000);
}

for (let i = 0; i < 18; i++) setTimeout(spawnHeart, i * 600);
setInterval(spawnHeart, 1200);

/* ── Music: Spotify embed ── */
let spotifyOpen = false;

function openSpotify() {
  const iframe = document.getElementById('spotifyEmbed');
  const btn    = document.getElementById('musicBtn');
  const label  = document.getElementById('spotifyLabel');

  if (!spotifyOpen) {
    // Lazy-load the src only on first click (respects autoplay policy)
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = iframe.getAttribute('data-src');
    }
    iframe.style.display = 'block';
    btn.style.display    = 'none';
    label.style.display  = 'none';
    spotifyOpen = true;
  } else {
    iframe.style.display = 'none';
    btn.style.display    = 'flex';
    label.style.display  = 'block';
    spotifyOpen = false;
  }
}
