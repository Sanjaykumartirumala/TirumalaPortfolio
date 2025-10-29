// ---------- Toggle Menu ----------
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
};

// ---------- Scroll Reveal Animations ----------
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2000,
  delay: 100
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .certifications-container, .achievements-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// ---------- Typed.js Animation ----------
const typed = new Typed('.multiple-text', {
  strings: ['Java Full Stack Developer', 'AI Trainer', 'Prompt Engineer', 'Web Developer'],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true
});
