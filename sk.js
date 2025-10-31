// sk.js: AOS init + carousel logic (auto-slide every 3s) with overlay arrows & pause-on-hover
document.addEventListener('DOMContentLoaded', function () {
  // AOS will be initialized in index.html inline script; ensure it's available
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 900, once: true, easing: 'ease-in-out' });
  }

  const CAROUSELS = ['cert-carousel', 'ach-carousel', 'proj-carousel'];
  const AUTO_MS = 3000;

  CAROUSELS.forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;

    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-arrow.prev');
    const nextBtn = root.querySelector('.carousel-arrow.next');

    // helper: scroll amount (1 card width)
    function scrollAmount() {
      const card = track.querySelector('.project-card') || track.querySelector('.card') || track.firstElementChild;
      if (!card) return Math.round(root.clientWidth * 0.8);
      return Math.round(card.getBoundingClientRect().width + 18); // card width + gap
    }

    // arrows
    if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({left: -scrollAmount(), behavior: 'smooth'}));
    if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({left: scrollAmount(), behavior: 'smooth'}));

    // auto slide + pause on hover
    let auto = setInterval(() => {
      // if near end -> back to start
      if (Math.abs(track.scrollLeft - (track.scrollWidth - track.clientWidth)) < 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      }
    }, AUTO_MS);

    root.addEventListener('mouseenter', () => clearInterval(auto));
    root.addEventListener('mouseleave', () => {
      auto = setInterval(() => {
        if (Math.abs(track.scrollLeft - (track.scrollWidth - track.clientWidth)) < 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        }
      }, AUTO_MS);
    });

    // keep responsive scroll amount recalculated on resize
    window.addEventListener('resize', () => {});
  });
});
