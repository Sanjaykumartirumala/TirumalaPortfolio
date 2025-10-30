// Typed.js text animation
const typed = new Typed(".multiple-text", {
  strings: ["Java Full Stack Developer", "AI Trainer", "Software Engineer"],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1000,
  loop: true,
});

// AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
});

// Carousel Logic
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.arrow.left');
  const next = carousel.querySelector('.arrow.right');

  let scrollAmount = 0;
  const slideWidth = 320; // adjust to card width + gap
  const autoSlideInterval = 3000; // 3 seconds

  // Arrow buttons
  next.addEventListener('click', () => {
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  // Auto Slide
  setInterval(() => {
    if (track.scrollWidth - track.scrollLeft <= track.clientWidth + 10) {
      // Go back to start
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  }, autoSlideInterval);
});
