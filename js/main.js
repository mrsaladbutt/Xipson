import countriesData from "./countries.js";

const mainContent = document.getElementById("main-content");
// активні таби у properties та partners
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tabs-buttons");
  tabButtons.forEach(function (tabButtons) {
    tabButtons.addEventListener("click", function (event) {
      changeActiveTab(event, tabButtons.getAttribute("data-container-id"));
    });
  });
});

function changeActiveTab(event, containerId) {
  event.preventDefault();
  const tabsContainer = document.getElementById(containerId);
  const tabButtons = tabsContainer.querySelectorAll(".tabs-buttons");
  tabButtons.forEach(function (tabButtons) {
    tabButtons.classList.remove("button-active");
  });

  event.currentTarget.classList.add("button-active");
}

// завантаження та відображення вкладок continents та countries

const countryLink = document.querySelector("#country");
const subNav = document.querySelector(".sub-nav");
const countryArrow = document.querySelector(".country-arrow");

const subNavList = document.querySelector(".sub-nav__list");

subNavList.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.tagName.toLowerCase() === "a" &&
    target.classList.contains("sub-nav__links")
  ) {
    const continent = target.getAttribute("data-continent");
    const subNavItem = target.closest("li");
    const subNavContitents = subNavItem.querySelector(".continents-container");

    // Закрийте всі інші вікна
    document
      .querySelectorAll(".continents-container")
      .forEach((continentEl) => {
        if (continentEl !== subNavContitents) {
          continentEl.style.display = "none";
          const arrow =
            continentEl.previousElementSibling.querySelector(
              ".continent-arrow"
            );
          if (arrow) arrow.style.transform = "rotate(0deg)";
        }
      });

    showCountries(continent, subNavContitents);

    const arrow = target.querySelector(".continent-arrow");
    if (subNavContitents.style.display === "block") {
      subNavContitents.style.display = "none";
      if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
      subNavContitents.style.display = "block";
      if (arrow) arrow.style.transform = "rotate(180deg)";
    }
  }
});

function showCountries(continent, container) {
  const countries = countriesData.filter(
    (country) => country.continent === continent
  );

  let countryListContent = '<ul id="country-list">';
  countries.forEach((country) => {
    countryListContent += `<li data-country="${country.name}" class='country-item'><img src='${country.flag}' alt="${country.name}"/> ${country.name}</li>`;
  });
  countryListContent += "</ul>";
  container.innerHTML = countryListContent;
}

countryLink.addEventListener("click", function (event) {
  event.preventDefault();
  subNav.classList.toggle("show");
  if (subNav.classList.contains("show")) {
    countryArrow.style.transform = "rotate(180deg)";
  } else {
    countryArrow.style.transform = "rotate(0deg)";
  }
});

window.addEventListener("scroll", function () {
  let lastScrollTop = 0;
  let scrollTimeout;
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && subNav.classList.contains("show")) {
      subNav.classList.remove("show");
    }

    if (subNav.classList.contains("show")) {
      countryArrow.style.transform = "rotate(180deg)";
    } else {
      countryArrow.style.transform = "rotate(0deg)";
    }

    lastScrollTop = scrollTop;
  }, 1000); // 1000 ms = 1 second
});
const continentsListContent = document.querySelector("#continents");

continentsListContent.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    const country = target.getAttribute("data-country");
    showCountryDetails(country);
  }
});

function showCountryDetails(countryName) {
  const countries = countriesData.find((c) => c.name === countryName);
  const countryFilters = document.querySelector("#countryFilters");
  if (countries) {
    mainContent.innerHTML = `
     <section class="country-page-content">
          <div id="map"></div>
          <div class="country-content">
            <div class="country-titles">
              <h2 class="countries-title">Real estate&Homes for</h2>
              <h3 class="countries-sub-title">
                Find your dream home from our added properties.
              </h3>
            </div>
            <div class="country-filter">
              <p class="country-filter__results">200 Results</p>
              <div class="country-filter__filter">
                <p>Sort by</p>
                <a class="country-filter__filter-button" href="#"
                  >Homes for you
                  <svg width="11" height="7">
                    <use href="./images/icons.svg#icon-arrow"></use></svg
                ></a>
              </div>
            </div>
            <div class="country-slider">
              <ul class="country-slider__list swiper-wrapper">
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
                <li class="country-slider__items swiper-slide">
                  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>
                </li>
              </ul>
              <div class="slider-nav">
                <button class="countries-slider-prev">
                  <svg class="slider-arrow" width="11" height="7">
                    <use href="./images/icons.svg#icon-arrow"></use>
                  </svg>
                </button>
                <div class="pagination"></div>
                <button class="countries-slider-next">
                  <svg class="slider-arrow" width="11" height="7">
                    <use href="./images/icons.svg#icon-arrow"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
                    `;
    countryFilters.classList.add("show");

    const sliderViewButton = document.getElementById("sliderViewButton");
    const mapViewButton = document.getElementById("mapViewButton");
    const container = document.querySelector(".country-page-content");

    const countriesSwiper = new Swiper(".country-slider", {
      loop: false,
      slidesPerView: 1,
      grid: {
        rows: 2,
        fill: "row",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          grid: {
            rows: 2,
            fill: "row",
          },
        },
      },
      spaceBetween: 16,
      pagination: {
        el: ".pagination",
        bulletClass: "pagination-bullet",

        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      navigation: {
        nextEl: ".countries-slider-next",
        prevEl: ".countries-slider-prev",
      },
    });

    sliderViewButton.addEventListener("click", () => {
      container.classList.add("full-width");
      sliderViewButton.classList.add("active");
      mapViewButton.classList.remove("active");
      if (container.classList.contains("full-width")) {
        countriesSwiper.params.slidesPerView = 4;
      } else {
        countriesSwiper.params.slidesPerView = 2;
      }

      countriesSwiper.update();
    });

    mapViewButton.addEventListener("click", () => {
      container.classList.remove("full-width");
      mapViewButton.classList.add("active");
      sliderViewButton.classList.remove("active");
      if (container.classList.contains("full-width")) {
        countriesSwiper.params.slidesPerView = 4;
      } else {
        countriesSwiper.params.slidesPerView = 2;
      }
      countriesSwiper.update();
    });

    const map = L.map("map").setView(
      [countries.latitude, countries.longitude],
      5
    );

    var greenIcon = L.icon({
      iconUrl: "../images/home.png",
      iconSize: [30, 30],
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.marker([countries.latitude, countries.longitude], {
      icon: greenIcon,
    }).addTo(map).bindPopup(`  <article class="country-slider__article">
                    <div
                      class="country-slider__article__image-wrapper image-wrapper"
                    >
                      <img
                        class="image-wrapper__image"
                        src="./images/article-image.jpg"
                        alt="house-image"
                      />
                      <button class="image-wrapper__button">
                        <svg class="hotjar-icon" width="16" height="16">
                          <use href="./images/icons.svg#icon-hotjar"></use></svg
                        ><span>Featured</span>
                      </button>
                    </div>
                    <div class="country-slider__content-wrapper">
                      <div class="country-slider__article__location location">
                        <p class="location__name">Real house luxury villa</p>
                        <div class="location__location">
                          <svg class="location_icon" width="19" height="19">
                            <use href="./images/icons.svg#icon-location"></use>
                          </svg>
                          <p class="location__location__text">
                            Est St, 77 - Central Park South, NYC
                          </p>
                        </div>
                      </div>
                      <div class="country-slider__article__props props">
                        <ul class="props__list">
                          <li>6 Bedrooms</li>
                          <li>3 Bathrooms</li>
                          <li>720 sq ft</li>
                          <li>2 Garages</li>
                        </ul>
                      </div>
                      <div class="country-slider__article__price price">
                        <p class="price__price">$1,200,000</p>
                        <button class="price__button">Details</button>
                      </div>
                    </div>
                  </article>`);
  } else {
    countryFilters.classList.remove("show");
  }
}

const input = document.getElementById("search-input");
const history = document.querySelector(".input-history");

//search-input
function showHistory(block) {
  block.style.display = "flex";
}

function hideHistory(block) {
  block.style.display = "none";
}

input.addEventListener("blur", () => {
  hideHistory(history);
});

input.addEventListener("focus", () => {
  showHistory(history);
});

document.addEventListener("click", (event) => {
  if (!input.contains(event.target) && !history.contains(event.target)) {
    hideHistory(history);
  }
});

//handType

const handType = document.getElementById("handType");
const handTypeDropdown = document.querySelector(".hand-type-dropdown");
const handTypeArrow = document.querySelector("#handTypeArrow");
handType.addEventListener("click", () => {
  handTypeDropdown.style.display =
    handTypeDropdown.style.display === "flex" ? "none" : "flex";
  handTypeDropdown.style.display === "flex"
    ? (handTypeArrow.style.transform = "rotate(180deg)")
    : (handTypeArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !handType.contains(event.target) &&
    !handTypeDropdown.contains(event.target)
  ) {
    hideHistory(handTypeDropdown);
    handTypeArrow.style.transform = "rotate(0deg)";
  }
});

const handTypeCheckbox = document.querySelectorAll(
  ".hand-type-dropdown-checkbox"
);

handTypeCheckbox.forEach((customCheckbox) => {
  const checkmark = customCheckbox.querySelector(".checkmark");
  const checkbox = customCheckbox.querySelector(".hand-type-checkbox");

  // Додаємо обробник подій для кожного чекбоксу
  checkmark.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
  });
});

const handTypeselectAll = document.querySelector("#hand-type-select-all");

handTypeselectAll.addEventListener("click", (e) => {
  let checkboxes = document.querySelectorAll(".hand-type-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
  });
});

//price-dropdown

const price = document.getElementById("price");
const priceDropdown = document.querySelector(".price-dropdown");
const priceArrow = document.querySelector("#priceArrow");
price.addEventListener("click", () => {
  priceDropdown.style.display =
    priceDropdown.style.display === "flex" ? "none" : "flex";

  priceDropdown.style.display === "flex"
    ? (priceArrow.style.transform = "rotate(180deg)")
    : (priceArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (!price.contains(event.target) && !priceDropdown.contains(event.target)) {
    hideHistory(priceDropdown);
    priceArrow.style.transform = "rotate(0deg)";
  }
});

// min

const min = document.getElementById("min");
const minDropdown = document.querySelector(".min-prices");

min.addEventListener("click", () => {
  minDropdown.style.display =
    minDropdown.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (event) => {
  if (!min.contains(event.target) && !minDropdown.contains(event.target)) {
    hideHistory(minDropdown);
  }
});

minDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const price = event.target.getAttribute("data-price");
    min.value = price;
    hideHistory(minDropdown);
  }
});

// max

const max = document.getElementById("max");
const maxDropdown = document.querySelector(".max-prices");

max.addEventListener("click", () => {
  maxDropdown.style.display =
    maxDropdown.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (event) => {
  if (!max.contains(event.target) && !maxDropdown.contains(event.target)) {
    hideHistory(maxDropdown);
  }
});

maxDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const price = event.target.getAttribute("data-price");
    max.value = price;
    hideHistory(maxDropdown);
  }
});

//bedsAndBath

const bedsAndBath = document.getElementById("bedsAndBath");
const bedsAndBathDropdown = document.querySelector(".beds-bath-dropdown");
const bedsAndBathArrow = document.querySelector("#bedsAndBathArrow");
bedsAndBath.addEventListener("click", () => {
  bedsAndBathDropdown.style.display =
    bedsAndBathDropdown.style.display === "flex" ? "none" : "flex";

  bedsAndBathDropdown.style.display === "flex"
    ? (bedsAndBathArrow.style.transform = "rotate(180deg)")
    : (bedsAndBathArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !bedsAndBath.contains(event.target) &&
    !bedsAndBathDropdown.contains(event.target)
  ) {
    hideHistory(bedsAndBathDropdown);
    bedsAndBathArrow.style.transform = "rotate(0deg)";
  }
});

const bedroomsList = document.querySelector(".bedrooms-list");

bedroomsList.addEventListener("click", (e) => {
  let li = e.target.closest("li");

  if (li && li.parentNode === bedroomsList) {
    let items = document.querySelectorAll(".bedrooms-items");

    items.forEach((item) => {
      item.classList.remove("bedrooms-items-active");
    });
    li.classList.add("bedrooms-items-active");
  }
});

const bathroomsList = document.querySelector(".bathrooms-list");

bathroomsList.addEventListener("click", (e) => {
  let li = e.target.closest("li");

  if (li && li.parentNode === bathroomsList) {
    let items = document.querySelectorAll(".bathrooms-items");

    items.forEach((item) => {
      item.classList.remove("bathrooms-items-active");
    });
    li.classList.add("bathrooms-items-active");
  }
});

//homeType

const homeType = document.getElementById("homeType");
const homeTypeDropdown = document.querySelector(".home-type-dropdown");
const homeTypeArrow = document.querySelector("#homeTypeArrow");
homeType.addEventListener("click", () => {
  homeTypeDropdown.style.display =
    homeTypeDropdown.style.display === "flex" ? "none" : "flex";

  homeTypeDropdown.style.display === "flex"
    ? (homeTypeArrow.style.transform = "rotate(180deg)")
    : (homeTypeArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !homeType.contains(event.target) &&
    !homeTypeDropdown.contains(event.target)
  ) {
    hideHistory(homeTypeDropdown);
    homeTypeArrow.style.transform = "rotate(0deg)";
  }
});

const selectAll = document.querySelector("#select-all");

selectAll.addEventListener("click", (e) => {
  let checkboxes = document.querySelectorAll(".retail-checkbox-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
  });
});

//More

const more = document.getElementById("more");
const moreDropdown = document.querySelector(".more");
const moreArrow = document.querySelector("#moreArrow");
more.addEventListener("click", () => {
  moreDropdown.style.display =
    moreDropdown.style.display === "flex" ? "none" : "flex";

  moreDropdown.style.display === "flex"
    ? (moreArrow.style.transform = "rotate(180deg)")
    : (moreArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (!more.contains(event.target) && !moreDropdown.contains(event.target)) {
    hideHistory(moreDropdown);
    moreArrow.style.transform = "rotate(0deg)";
  }
});

//parking-spots-select

const parkingSpotsSelect = document.getElementById("parking-spots-select");
const spotsDropdown = document.querySelector(".parking-spots-dropdown");
const spotsArrow = document.querySelector(".parking-spots-select-arrow");
parkingSpotsSelect.addEventListener("click", () => {
  spotsDropdown.style.display =
    spotsDropdown.style.display === "flex" ? "none" : "flex";

  spotsDropdown.style.display === "flex"
    ? (spotsArrow.style.transform = "rotate(180deg)")
    : (spotsArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !parkingSpotsSelect.contains(event.target) &&
    !spotsDropdown.contains(event.target)
  ) {
    hideHistory(spotsDropdown);
    spotsArrow.style.transform = "rotate(0deg)";
  }
});

spotsDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const spot = event.target.getAttribute("data-spot");
    parkingSpotsSelect.value = spot;
    hideHistory(spotsDropdown);
  }
});

//unit-of-measurement-dropdown

const measurement = document.getElementById("unit-of-measurement-select");
const measurementDropdown = document.querySelector(
  ".unit-of-measurement-dropdown"
);
const measurementArrow = document.querySelector(
  ".unit-of-measurement-select-arrow"
);

measurement.addEventListener("click", () => {
  measurementDropdown.style.display =
    measurementDropdown.style.display === "flex" ? "none" : "flex";

  measurementDropdown.style.display === "flex"
    ? (measurementArrow.style.transform = "rotate(180deg)")
    : (measurementArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !measurement.contains(event.target) &&
    !measurementDropdown.contains(event.target)
  ) {
    hideHistory(measurementDropdown);
    measurementArrow.style.transform = "rotate(0deg)";
  }
});

measurementDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const system = event.target.getAttribute("data-system");
    measurement.value = system;
    const englishSystemMin = document.querySelector("#english-system-min");
    const englishSystemMax = document.querySelector("#english-system-max");
    const europeanSystemMin = document.querySelector("#european-system-min");
    const europeanSystemMax = document.querySelector("#european-system-max");
    if (measurement.value === "English System") {
      englishSystemMin.style.display = "flex";
      englishSystemMax.style.display = "flex";
      europeanSystemMin.style.display = "none";
      europeanSystemMax.style.display = "none";
    } else {
      englishSystemMin.style.display = "none";
      englishSystemMax.style.display = "none";
      europeanSystemMin.style.display = "flex";
      europeanSystemMax.style.display = "flex";
    }

    hideHistory(measurementDropdown);
  }
});

// square-size-min-dropdown

const sizeMin = document.getElementById("square-size-min");
const sizeMinDropdown = document.querySelector(".square-size-min-dropdown");
const sizeMinArrow = document.querySelector(".square-size-min-arrow");

sizeMin.addEventListener("click", () => {
  sizeMinDropdown.style.display =
    sizeMinDropdown.style.display === "flex" ? "none" : "flex";

  sizeMinDropdown.style.display === "flex"
    ? (sizeMinArrow.style.transform = "rotate(180deg)")
    : (sizeMinArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !sizeMin.contains(event.target) &&
    !sizeMinDropdown.contains(event.target)
  ) {
    hideHistory(sizeMinDropdown);
    sizeMinArrow.style.transform = "rotate(0deg)";
  }
});

sizeMinDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const minSize = event.target.getAttribute("data-size");

    sizeMin.value = minSize;
    hideHistory(sizeMinDropdown);
  }
});

//square-size-max-dropdown

const sizeMax = document.getElementById("square-size-max");
const sizeMaxDropdown = document.querySelector(".square-size-max-dropdown");
const sizeMaxArrow = document.querySelector(".square-size-max-arrow");

sizeMax.addEventListener("click", () => {
  sizeMaxDropdown.style.display =
    sizeMaxDropdown.style.display === "flex" ? "none" : "flex";

  sizeMaxDropdown.style.display === "flex"
    ? (sizeMaxArrow.style.transform = "rotate(180deg)")
    : (sizeMaxArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !sizeMax.contains(event.target) &&
    !sizeMaxDropdown.contains(event.target)
  ) {
    hideHistory(sizeMaxDropdown);
    sizeMaxArrow.style.transform = "rotate(0deg)";
  }
});

sizeMaxDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const maxSize = event.target.getAttribute("data-size");
    sizeMax.value = maxSize;
    hideHistory(sizeMaxDropdown);
  }
});

//.lot-size-min-dropdown

const lotSizeMin = document.getElementById("lot-size-min");
const lotSizeMinDropdown = document.querySelector(".lot-size-min-dropdown");
const lotSizeMinArrow = document.querySelector(".lot-size-min-arrow");

lotSizeMin.addEventListener("click", () => {
  lotSizeMinDropdown.style.display =
    lotSizeMinDropdown.style.display === "flex" ? "none" : "flex";

  lotSizeMinDropdown.style.display === "flex"
    ? (lotSizeMinArrow.style.transform = "rotate(180deg)")
    : (lotSizeMinArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !lotSizeMin.contains(event.target) &&
    !lotSizeMinDropdown.contains(event.target)
  ) {
    hideHistory(lotSizeMinDropdown);
    lotSizeMinArrow.style.transform = "rotate(0deg)";
  }
});

lotSizeMinDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const minLotSize = event.target.getAttribute("data-lot");

    lotSizeMin.value = minLotSize;
    hideHistory(lotSizeMinDropdown);
  }
});

//.lot-size-max-dropdown

const lotSizeMax = document.getElementById("lot-size-max");
const lotSizeMaxDropdown = document.querySelector(".lot-size-max-dropdown");
const lotSizeMaxArrow = document.querySelector(".lot-size-max-arrow");

lotSizeMax.addEventListener("click", () => {
  lotSizeMaxDropdown.style.display =
    lotSizeMaxDropdown.style.display === "flex" ? "none" : "flex";

  lotSizeMaxDropdown.style.display === "flex"
    ? (lotSizeMaxArrow.style.transform = "rotate(180deg)")
    : (lotSizeMaxArrow.style.transform = "rotate(0deg)");
});

document.addEventListener("click", (event) => {
  if (
    !lotSizeMax.contains(event.target) &&
    !lotSizeMaxDropdown.contains(event.target)
  ) {
    hideHistory(lotSizeMaxDropdown);
    lotSizeMaxArrow.style.transform = "rotate(0deg)";
  }
});

lotSizeMaxDropdown.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    const maxLotSize = event.target.getAttribute("data-lot");

    lotSizeMax.value = maxLotSize;
    hideHistory(lotSizeMaxDropdown);
  }
});
