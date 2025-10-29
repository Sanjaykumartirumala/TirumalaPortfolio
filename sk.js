// Typed.js animation
const typed = new Typed(".multiple-text", {
  strings: ["Java Full Stack Developer", "Prompt Engineer", "AI Enthusiast", "Web Developer"],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1000,
  loop: true
});

// Smooth form message
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thanks for contacting, Sanjay will get back to you soon!");
  e.target.reset();
});
