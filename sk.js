// sk.js — AOS init + carousels + mobile menu + active section highlight + scroll top
document.addEventListener('DOMContentLoaded', function () {
  // Init AOS (if present)
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav');
  mobileBtn && mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    mobileBtn.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
  });

  // Close mobile nav after clicking a link
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      mobileBtn.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  }));

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (!scrollBtn) return;
    if (window.scrollY > 400) scrollBtn.classList.add('show'); else scrollBtn.classList.remove('show');
  });
  scrollBtn && scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // CAROUSEL behavior (projects / certs / achievements)
  const CAROUSELS = ['proj-carousel', 'cert-carousel', 'ach-carousel'];
  const AUTO_MS = 3000;

  CAROUSELS.forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-arrow.prev');
    const nextBtn = root.querySelector('.carousel-arrow.next');

    function firstCard() {
      return track.querySelector('.carousel-card, .project-card, .certificate-card, .card');
    }
    function scrollAmount() {
      const card = firstCard();
      if (!card) return Math.round(root.clientWidth * 0.8);
      const gap = parseInt(getComputedStyle(track).gap || 18);
      return Math.round(card.getBoundingClientRect().width + gap);
    }

    prevBtn && prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    nextBtn && nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

    // Auto-slide for larger screens
    let autoId = null;
    function startAuto() {
      clearInterval(autoId);
      if (window.innerWidth <= 760) return;
      autoId = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        }
      }, AUTO_MS);
    }
    startAuto();
    root.addEventListener('mouseenter', () => clearInterval(autoId));
    root.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', startAuto);
  });

  // Active link highlight as user scrolls
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  // IntersectionObserver with rootMargin to switch at about 50% viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('current'));
        link && link.classList.add('current');
      }
    });
  }, { root: null, rootMargin: '0px 0px -50% 0px', threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  // Tiny hover class for styling if you want to add .hovered effects
  document.querySelectorAll('.project-card, .carousel-card, .certificate-card, .card').forEach(c => {
    c.addEventListener('mouseenter', () => c.classList.add('hovered'));
    c.addEventListener('mouseleave', () => c.classList.remove('hovered'));
  });
});
