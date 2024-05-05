/*FUNZIONAMENTO SCORRIMENTO CAROUSEL*/
document.addEventListener("DOMContentLoaded", function () {

    const carousels = document.querySelectorAll(".carousel-container");
  
    carousels.forEach(function (carouselContainer) {
      const carouselInner = carouselContainer.querySelector(".carousel-inner");
  
      carouselContainer.querySelector(".control.right").addEventListener("click", function () {
        carouselInner.scrollBy({ left: 300, behavior: "smooth" });
      });
  
      carouselContainer.querySelector(".control.left").addEventListener("click", function () {
        carouselInner.scrollBy({ left: -300, behavior: "smooth" });
      });
    });
  });
  