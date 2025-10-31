// === Typed.js (animated text) ===
const typed = new Typed(".multiple-text", {
  strings: [
    "Java Full Stack Developer",
    "Spring Boot Developer",
    "Frontend Enthusiast",
    "Problem Solver"
  ],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1200,
  loop: true
});

// === Initialize AOS (Animate on Scroll) ===
AOS.init({
  duration: 1200,
  easing: "ease-in-out",
  once: true,
});

// === Initialize Swiper (for all carousels) ===
const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  effect: "slide",
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  fadeEffect: { crossFade: true },
  speed: 800,
};

// === Initialize Swiper for Projects ===
new Swiper(".projects-swiper", swiperOptions);

// === Initialize Swiper for Certifications ===
new Swiper(".certifications-swiper", swiperOptions);

// === Initialize Swiper for Achievements ===
new Swiper(".achievements-swiper", swiperOptions);

// === Navbar Active Link Highlight on Scroll ===
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav ul li a");

window.onscroll = () => {
  let top = window.scrollY;
  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav ul li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// === Scroll to top icon visibility ===
const scrollTopBtn = document.querySelector(".footer-iconTop a");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.opacity = "1";
  } else {
    scrollTopBtn.style.opacity = "0";
  }
});
