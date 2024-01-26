// Declare swiper2 in the global scope
var swiper2;
var swiper;

document.addEventListener("DOMContentLoaded", function () {
    swiper = new Swiper(".mySwiper", {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      mousewheel: {
        enabled: true,
      },
      on: {
        slideChange: function () {
          // Ocultar el navbar en el primer slide
          var navbar = document.getElementById("navbar");
          if (swiper.activeIndex === 0) {
            navbar.style.opacity = "0";
            navbar.style.pointerEvents = "none";
          } else {
            navbar.style.opacity = "1";
            navbar.style.pointerEvents = "auto";
          }
        },
      },
    });
    swiper2 = new Swiper(".mySwiper2", {
      direction: "horizontal",
      spaceBetween: 50,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
          // Agregar transición a la propiedad opacity
          navbar.style.transition = "opacity 0.3s ease";
  });
  
