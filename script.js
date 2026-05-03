/* ===========================================================
   CCS Line — main script
   =========================================================== */

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
(() => {
  const root = document.documentElement;
  const KEY  = 'ccs-theme';

  function apply(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  function current() {
    return root.classList.contains('dark') ? 'dark' : 'light';
  }

  // Bind any element with [data-theme-toggle]
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (_) {}
    });
  });
})();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// ---------- Header scroll style ----------
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) header.classList.add('shadow-soft');
  else header.classList.remove('shadow-soft');
});

// ---------- Hero slider ----------
(() => {
  const slides = document.querySelectorAll('#slider .slide');
  const dotsWrap = document.getElementById('dots');
  const slideText = document.getElementById('slideText');
  const content = [
    {
      h: 'Sailing Trade Across Every Ocean.',
      p: 'From Dubai to the world — we deliver reliable, secure and on-time sea freight services your business can count on.'
    },
    {
      h: 'Containers That Connect Continents.',
      p: 'FCL, LCL and consolidated shipping with full visibility from port to port.'
    },
    {
      h: 'A Decade of Maritime Excellence.',
      p: 'Trusted since 2014 — your dependable partner for global container shipping.'
    }
  ];
  let idx = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.setAttribute('aria-label', `Go to slide ${i+1}`);
    d.className = 'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition';
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
  });

  function updateText(i) {
    const h = slideText.querySelector('[data-h]');
    const p = slideText.querySelector('[data-p]');
    h.style.opacity = 0; p.style.opacity = 0;
    setTimeout(() => {
      h.textContent = content[i].h;
      p.textContent = content[i].p;
      h.style.transition = 'opacity .6s ease';
      p.style.transition = 'opacity .6s ease';
      h.style.opacity = 1; p.style.opacity = 1;
    }, 250);
  }

  function updateDots() {
    [...dotsWrap.children].forEach((d, i) => {
      d.className = 'w-2.5 h-2.5 rounded-full transition ' + (i === idx ? 'bg-brand-accent w-6' : 'bg-white/40 hover:bg-white');
    });
  }

  function go(i) {
    slides[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    updateDots();
    updateText(idx);
    restart();
  }

  function next() { go(idx + 1); }
  function prev() { go(idx - 1); }

  function start() { timer = setInterval(next, 6000); }
  function restart() { clearInterval(timer); start(); }

  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);

  updateDots();
  start();
})();

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header .nav-link');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    const id = sec.id;
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
});

// ---------- Quote form -> mailto ----------
const form = document.getElementById('quoteForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = encodeURIComponent(form.name.value.trim());
  const email   = encodeURIComponent(form.email.value.trim());
  const phone   = encodeURIComponent(form.phone.value.trim());
  const message = encodeURIComponent(form.message.value.trim());
  const subject = encodeURIComponent(`Quote Request from ${decodeURIComponent(name)}`);
  const body =
    `Name: ${decodeURIComponent(name)}%0D%0A` +
    `Email: ${decodeURIComponent(email)}%0D%0A` +
    `Phone: ${decodeURIComponent(phone)}%0D%0A%0D%0A` +
    `Message:%0D%0A${message}`;
  window.location.href = `mailto:quote@ccs-idea.ae?subject=${subject}&body=${body}`;
});
