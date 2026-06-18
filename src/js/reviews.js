import $ from 'jquery';

$(document).ready(function() {
  // نظام النجوم
  $('.star-input').on('mouseover', function() {
    const rating = $(this).data('rating');
    highlightStars(rating);
  }).on('mouseout', function() {
    const currentRating = $('#rating-value').val() || 0;
    highlightStars(currentRating);
  }).on('click', function() {
    const rating = $(this).data('rating');
    $('#rating-value').val(rating);
    highlightStars(rating);
  });

  function highlightStars(rating) {
    $('.star-input').each(function() {
      const starRating = $(this).data('rating');
      if (starRating <= rating) {
        $(this).removeClass('far').addClass('fas');
      } else {
        $(this).removeClass('fas').addClass('far');
      }
    });
  }

  // إرسال التقييم
  $('#review-form').on('submit', function(e) {
    e.preventDefault();
    const rating = $('#rating-value').val();
    const name = $(this).find('[name="name"]').val();
    const comment = $(this).find('[name="comment"]').val();
    
    if (!rating) {
      alert('الرجاء اختيار التقييم');
      return;
    }

    const review = {
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('ar-SA')
    };

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    addReviewToPage(review);
    $(this)[0].reset();
    $('#rating-value').val('');
    highlightStars(0);
  });

  // تحميل التقييمات
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.forEach(addReviewToPage);

  function addReviewToPage(review) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= review.rating ? '<i class="fas fa-star text-warning"></i>' : '<i class="far fa-star text-warning"></i>';
    }
    
    const html = `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <strong>${review.name}</strong>
            <span>${stars}</span>
          </div>
          <p class="mb-0 mt-2">${review.comment}</p>
          <small class="text-muted">${review.date}</small>
        </div>
      </div>
    `;
    $('#reviews-container').append(html);
  }
});