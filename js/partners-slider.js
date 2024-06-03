const partnersSwiper = new Swiper(".swiper-partners-container", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 40,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },

    1280: {
      slidesPerView: 5,
    },
  },

  navigation: {
    nextEl: ".partners-next",
    prevEl: ".partners-prev",
  },
});
