$(document).ready(function() {
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      $(this).unbind('submit').submit();
    }
  });

  $('#contact-form input, #contact-form textarea').on('blur', function() {
    validateField($(this));
  });
});

function validateForm() {
  let isValid = true;
  
  $('#contact-form input[required], #contact-form textarea[required]').each(function() {
    if (!validateField($(this))) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField($field) {
  const value = $field.val().trim();
  const fieldName = $field.attr('name');
  let isValid = true;
  let errorMessage = '';

  $field.removeClass('is-valid is-invalid');
  $field.siblings('.invalid-feedback').remove();

  if ($field.prop('required') && !value) {
    isValid = false;
    errorMessage = 'هذا الحقل مطلوب';
  }
  else if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'البريد الإلكتروني غير صالح';
    }
  }
  else if (fieldName === 'phone' && value) {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      isValid = false;
      errorMessage = 'رقم الهاتف غير صالح';
    }
  }
  else if (fieldName === 'message' && value.length < 10) {
    isValid = false;
    errorMessage = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
  }

  if (isValid) {
    $field.addClass('is-valid');
  } else {
    $field.addClass('is-invalid');
    $field.after(`<div class="invalid-feedback show">${errorMessage}</div>`);
  }

  return isValid;
}