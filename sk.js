// Auto-sliding carousels
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    let scrollAmount = 0;
    setInterval(() => {
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0;
      } else {
        scrollAmount += 320;
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
    }, 3000);
  });
});
