// Bootstrap 5 carousel - لا يحتاج jQuery
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carouselEl) {
    new bootstrap.Carousel(carouselEl, {
      interval: 4000,
      wrap: true
    });
  });
});