import $ from 'jquery';

class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    this.updateCartCount();
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.showNotification('تمت الإضافة إلى السلة!');
  }

  saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(this.cart));
  }

  updateCartCount() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cart-count').text(count);
  }

  showNotification(message) {
    const toast = `
      <div class="toast show position-fixed top-0 end-0 m-3" style="z-index: 9999;">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">إشعار</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;
    $('body').append(toast);
    setTimeout(() => $('.toast').remove(), 3000);
  }
}

const cart = new CartManager();

$(document).on('click', '.btn-add-cart', function() {
  const product = {
    id: $(this).data('id'),
    name: $(this).data('name'),
    price: $(this).data('price')
  };
  cart.addToCart(product);
});