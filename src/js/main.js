// ============================================
// src/js/main.js - سلة + كاروسيل
// ============================================

import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import '../sass/main.scss';

window.bootstrap = bootstrap;
window.$ = $;
window.jQuery = $;

// ============================================
// ✅ كود السلة (Cart) - مُحسّن
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  }
  console.log('✅ Cart count:', count);
}

function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ 
      id: String(id), 
      name, 
      price: Number(price), 
      image, 
      quantity: 1 
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`تم إضافة "${name}" إلى السلة!`);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #27ae60;
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    z-index: 9999;
    font-size: 1.1rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    animation: slideDown 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ============================================
// ✅ Slider بسيط
// ============================================

function initSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.slider-dot');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let interval;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = 'none';
      slide.style.opacity = '0';
      if (dots[i]) dots[i].classList.remove('active');
    });
    
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    
    slides[currentIndex].style.display = 'block';
    setTimeout(() => {
      slides[currentIndex].style.opacity = '1';
    }, 10);
    
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }
  
  function next() { showSlide(currentIndex + 1); }
  function prev() { showSlide(currentIndex - 1); }
  function start() { stop(); interval = setInterval(next, 5000); }
  function stop() { if (interval) clearInterval(interval); }
  
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); stop(); prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); stop(); next(); start(); });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => { e.preventDefault(); stop(); showSlide(index); start(); });
  });
  
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  
  showSlide(0);
  start();
}

// ============================================
// ✅ Event Listeners - مُحسّن
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM Loaded!');
  
  // تحديث عدد السلة
  updateCartCount();
  
  // ✅ أزرار السلة - معالجة مباشرة وقوية
  const buttons = document.querySelectorAll('.btn-add-cart');
  console.log('✅ Cart buttons found:', buttons.length);
  
  buttons.forEach((btn, index) => {
    // إزالة أي listeners قديمة
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // إضافة listener جديد
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      const image = this.dataset.image;
      
      console.log('✅ Button clicked:', { id, name, price });
      
      if (!id || !name || isNaN(price)) {
        console.error('❌ Invalid data');
        alert('خطأ: بيانات المنتج غير مكتملة');
        return;
      }
      
      addToCart(id, name, price, image);
    });
  });
  
  // ✅ Navbar scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.2)';
        navbar.style.backgroundColor = '#1a252f';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = '#2c3e50';
      }
    });
  }
  
  // تفعيل Slider
  initSlider();
});

export { cart, addToCart, updateCartCount };