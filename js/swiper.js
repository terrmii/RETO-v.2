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
    keyboard: {
      enabled: true,
    },
  });

  navbar.style.transition = "opacity 0.3s ease";

  // Evento de escucha para las teclas de dirección del primer slider
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      swiper.slidePrev();
    } else if (event.key === "ArrowDown") {
      swiper.slideNext();
    }
  });

    // Obtén el elemento del enlace
    var goToSecondSlideLink = document.getElementById('goToSecondSlide');

    // Agrega un manejador de eventos de clic al enlace
    goToSecondSlideLink.addEventListener('click', function (event) {
      // Previene el comportamiento predeterminado del enlace
      event.preventDefault();
  
      // Navega al segundo slide del swiper2 (slider horizontal)
      swiper.slideTo(1); // El índice comienza desde 0
    });

  desactivarSlider();
});


// Función para desactivar el efecto del slider
function desactivarSlider() {
  swiper.params.mousewheel.enabled = false; // Deshabilitar el mousewheel
  swiper.detachEvents(); // Deshabilitar los eventos del swiper

  swiper2.params.mousewheel.enabled = false; // Deshabilitar el mousewheel para swiper2
  swiper2.detachEvents(); // Deshabilitar los eventos de swiper2
}


