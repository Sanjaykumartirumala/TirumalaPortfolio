// Toggle Menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x');
};

// ScrollReveal Animations
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .certifications-container, .achievements-container, .projects ul, .contact form', { origin: 'bottom' });

// Typed.js animation
const typed = new Typed('.multiple-text', {
  strings: ['Software Developer', 'AI Trainer', 'Full Stack Engineer', 'Innovator'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});
