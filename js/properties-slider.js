const swiper = new Swiper(".swiper-container", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },

    1280: {
      slidesPerView: 3,
    },
  },

  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});
