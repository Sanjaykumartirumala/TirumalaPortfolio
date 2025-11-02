// sk.js — AOS init + carousel controls + mobile menu + scroll-to-top + active-section highlight
document.addEventListener('DOMContentLoaded', function () {
  // Init AOS if present
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }

  // Mobile nav toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      mobileBtn.classList.toggle('open');
      // Toggle aria
      mobileBtn.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        mobileBtn.classList.remove('open');
      }
    });
  });

  // Scroll-to-top
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollBtn.classList.add('show'); else scrollBtn.classList.remove('show');
  });
  if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // CAROUSELS: support for project / cert / ach carousels
  const CAROUSELS = [
    { id: 'proj-carousel' },
    { id: 'cert-carousel' },
    { id: 'ach-carousel' }
  ];
  const AUTO_MS = 3000;

  CAROUSELS.forEach(cfg => {
    const root = document.getElementById(cfg.id);
    if (!root) return;
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-arrow.prev');
    const nextBtn = root.querySelector('.carousel-arrow.next');

    function getCard() {
      return track.querySelector('.carousel-card, .project-card, .certificate-card, .card');
    }
    function scrollAmount() {
      const card = getCard();
      if (!card) return Math.round(root.clientWidth * 0.8);
      const gap = parseInt(getComputedStyle(track).gap || 18);
      return Math.round(card.getBoundingClientRect().width + gap);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior:'smooth' }));
    if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior:'smooth' }));

    // Auto slide for desktop/tablet
    let autoId = null;
    function startAuto() {
      if (!track) return;
      if (window.innerWidth <= 760) { clearInterval(autoId); return; }
      clearInterval(autoId);
      autoId = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior:'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount(), behavior:'smooth' });
        }
      }, AUTO_MS);
    }
    startAuto();
    root.addEventListener('mouseenter', () => clearInterval(autoId));
    root.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', startAuto);
  });

  // Active header link highlight by section in view
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  // IntersectionObserver for section visibility (threshold tuned)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector('.nav a[href="#' + id + '"]');
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('current'));
        if (link) link.classList.add('current');
      }
    });
  }, { root: null, rootMargin: '0px 0px -50% 0px', threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  // Small hover effect for cards (desktop)
  document.querySelectorAll('.project-card, .carousel-card, .certificate-card, .card').forEach(c => {
    c.addEventListener('mouseenter', () => c.classList.add('hovered'));
    c.addEventListener('mouseleave', () => c.classList.remove('hovered'));
  });
});
