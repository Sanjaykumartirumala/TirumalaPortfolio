// sk.js — AOS init + carousel controls + mobile menu + scroll-to-top
document.addEventListener('DOMContentLoaded', function () {
  // Init AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      mobileBtn.classList.toggle('open');
    });
  }

  // Carousels config
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

    // compute scroll amount (card width + gap)
    function scrollAmount() {
      const card = track.querySelector('.project-card') || track.querySelector('.card') || track.firstElementChild;
      if (!card) return Math.round(root.clientWidth * 0.8);
      const style = window.getComputedStyle(card);
      const gap = parseInt(getComputedStyle(track).gap || 18);
      return Math.round(card.getBoundingClientRect().width + gap);
    }

    // Arrow handlers
    if (prevBtn) prevBtn.addEventListener('click', () => { track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', () => { track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }); });

    // Auto-slide with pause on hover (desktop only)
    let auto = null;
    function startAuto() {
      if (window.innerWidth <= 760) return; // skip auto on narrow screens (mobile swipe better)
      if (auto) clearInterval(auto);
      auto = setInterval(() => {
        if (Math.abs(track.scrollLeft - (track.scrollWidth - track.clientWidth)) < 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        }
      }, AUTO_MS);
    }
    startAuto();

    root.addEventListener('mouseenter', () => { if (auto) clearInterval(auto); });
    root.addEventListener('mouseleave', () => startAuto());
    window.addEventListener('resize', () => startAuto());
  });

  // Scroll to top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Small enhancement: close mobile nav when a link clicked
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) nav.classList.remove('nav-open');
    });
  });
});
