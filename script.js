const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");

if (header && toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const heroSlider = document.querySelector("[data-hero-slider]");

if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const dots = Array.from(heroSlider.querySelectorAll("[data-hero-dot]"));
  const prev = heroSlider.querySelector("[data-hero-prev]");
  const next = heroSlider.querySelector("[data-hero-next]");
  let activeIndex = 0;
  let startX = 0;
  let autoplay = null;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const goToNext = () => showSlide(activeIndex + 1);
  const goToPrev = () => showSlide(activeIndex - 1);

  const restartAutoplay = () => {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(goToNext, 6000);
  };

  prev?.addEventListener("click", () => {
    goToPrev();
    restartAutoplay();
  });

  next?.addEventListener("click", () => {
    goToNext();
    restartAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.heroDot));
      restartAutoplay();
    });
  });

  heroSlider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });

  heroSlider.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) < 42) return;
    if (deltaX > 0) {
      goToPrev();
    } else {
      goToNext();
    }
    restartAutoplay();
  });

  restartAutoplay();
}
