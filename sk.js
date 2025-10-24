// Typed.js for animated role text
const typed = new Typed(".multiple-text", {
  strings: ["Software Developer", "AI Trainer", "Java Backend Engineer"],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 1500,
  loop: true
});

// Toggle menu icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Scroll Reveal animations
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .about-img, .experience-box, .certifications-box, .achievements-box', { origin: 'bottom' });
ScrollReveal().reveal('.about-content, .projects-content, .contact form', { origin: 'right' });
