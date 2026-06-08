/* ==========================================
   MY KEBAB HOUSE — SCRIPTS
   ========================================== */

const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const today = days[new Date().getDay()];

// ── Info bar: highlight today's special pill ──
document.querySelectorAll('.special-pill[data-day]').forEach(pill => {
  if (pill.dataset.day === today) {
    pill.classList.add('today-pill');
    const lbl = document.createElement('span');
    lbl.className = 'today-label';
    lbl.textContent = 'Heute';
    pill.appendChild(lbl);
  }
});

// ── Highlights section: mark today's special ──
document.querySelectorAll('.hcs-item[data-day]').forEach(item => {
  if (item.dataset.day === today) item.classList.add('today-item');
});

// ── Navbar: scroll + info-bar awareness ──
const navbar = document.getElementById('navbar');
const infoBar = document.getElementById('infoBar');

window.addEventListener('scroll', () => {
  const barH = infoBar ? infoBar.offsetHeight : 38;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (infoBar) {
    const gone = window.scrollY > barH;
    infoBar.classList.toggle('hidden', gone);
    navbar.classList.toggle('bar-hidden', gone);
  }
});

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const t = document.querySelector(link.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Contact form ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Nachricht gesendet! Wir melden uns bald.');
    form.reset();
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '2rem', left: '50%',
    transform: 'translateX(-50%) translateY(10px)',
    background: '#27ae60', color: 'white',
    padding: '0.85rem 1.8rem', borderRadius: '50px',
    fontWeight: '600', fontSize: '0.9rem',
    boxShadow: '0 8px 28px rgba(0,0,0,0.5)', zIndex: '9999',
    opacity: '0', transition: 'transform 0.28s ease, opacity 0.28s ease',
    fontFamily: 'Inter, sans-serif',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 320);
  }, 3500);
}

// ══════════════════════════════════════
// SPEISEKARTE MODAL
// ══════════════════════════════════════

const menuModal = document.getElementById('menuModal');

function openMenuModal() {
  menuModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenuModal() {
  menuModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Tab switching inside menu modal
document.querySelectorAll('.menu-modal-tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.menu-category').forEach(c => {
      c.classList.toggle('active', c.id === `cat-${cat}`);
    });
    // scroll body back to top on tab switch
    const body = menuModal.querySelector('.menu-modal-body');
    if (body) body.scrollTop = 0;
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenuModal();
});
