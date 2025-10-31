// sk.js — AOS init + carousel controls + mobile menu + scroll-to-top + responsive fixes
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-in-out'
    });
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

  // Responsive Navbar background on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Carousel settings
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

    function scrollAmount() {
      const card = track.querySelector('.project-card') || track.querySelector('.card') || track.firstElementChild;
      if (!card) return Math.round(root.clientWidth * 0.8);
      const style = window.getComputedStyle(card);
      const gap = parseInt(style.marginRight || getComputedStyle(track).gap || 18);
      return Math.round(card.getBoundingClientRect().width + gap);
    }

    // Arrow controls
    if (prevBtn)
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    if (nextBtn)
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });

    // Auto-slide with hover pause (desktop only)
    let auto = null;
    function startAuto() {
      if (window.innerWidth <= 768) return; // skip on mobile
      clearInterval(auto);
      auto = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        }
      }, AUTO_MS);
    }

    startAuto();
    root.addEventListener('mouseenter', () => clearInterval(auto));
    root.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', startAuto);
  });

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    });
    scrollBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // Close mobile nav after clicking a link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        mobileBtn.classList.remove('open');
      }
    });
  });

  // Hover animations (premium effect)
  const cards = document.querySelectorAll('.project-card, .card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });
});
