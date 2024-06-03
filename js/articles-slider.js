const articlesSwiper = new Swiper(".swiper-articles-container", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,

  navigation: {
    nextEl: ".articles-next",
    prevEl: ".articles-prev",
  },
});
