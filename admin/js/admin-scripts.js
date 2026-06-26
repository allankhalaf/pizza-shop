

(function() {
  'use strict';

  // ===== DOM Ready =====
  document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initTooltips();
    initButtonFeedback();
    initTableSearch();
    initResponsive();
    initScrollEffects();
  });

  // ===== Sidebar Toggle =====
  function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const wrapper = document.getElementById('adminWrapper');
    const sidebar = document.getElementById('adminSidebar');

    if (!sidebarToggle || !wrapper || !sidebar) return;

    // Restore sidebar state from localStorage
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState === 'true') {
      wrapper.classList.add('sidebar-collapsed');
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      wrapper.classList.toggle('sidebar-collapsed');

      // Save state
      localStorage.setItem('adminSidebarCollapsed', wrapper.classList.contains('sidebar-collapsed'));

      // Mobile: show/hide overlay
      if (window.innerWidth <= 991.98) {
        sidebar.classList.toggle('show');
        document.body.classList.toggle('sidebar-open');
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 991.98) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('show');
          document.body.classList.remove('sidebar-open');
        }
      }
    });

    // Handle resize
    window.addEventListener('resize', debounce(function() {
      if (window.innerWidth > 991.98) {
        sidebar.classList.remove('show');
        document.body.classList.remove('sidebar-open');
      }
    }, 250));
  }

  // ===== Tooltip System =====
  function initTooltips() {
    // Tooltips are handled via CSS [data-tooltip]
    // This adds mobile support
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
      el.addEventListener('touchstart', function() {
        this.classList.add('tooltip-active');
      });

      el.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('tooltip-active');
        }, 2000);
      });
    });
  }

  // ===== Button Click Feedback =====
  function initButtonFeedback() {
    const buttons = document.querySelectorAll('.btn-custom, .action-btn, .action-buttons .btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }

  // ===== Table Search =====
  function initTableSearch() {
    const searchInputs = document.querySelectorAll('.filter-input');

    searchInputs.forEach(input => {
      input.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        const table = this.closest('.content-card')?.querySelector('.admin-table tbody');

        if (!table) return;

        const rows = table.querySelectorAll('tr');
        let visibleCount = 0;

        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
            row.style.animation = 'fadeIn 0.3s ease';
            visibleCount++;
          } else {
            row.style.display = 'none';
          }
        });

        // Show "no results" message if needed
        updateNoResultsMessage(table, visibleCount);
      }, 300));
    });
  }

  function updateNoResultsMessage(table, count) {
    let noResultsRow = table.querySelector('.no-results-row');

    if (count === 0) {
      if (!noResultsRow) {
        noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results-row';
        const colCount = table.closest('table').querySelector('thead tr').children.length;
        noResultsRow.innerHTML = `
          <td colspan="${colCount}" style="text-align: center; padding: 2rem; color: #95a5a6;">
            <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
            لا توجد نتائج مطابقة
          </td>
        `;
        table.appendChild(noResultsRow);
      }
    } else if (noResultsRow) {
      noResultsRow.remove();
    }
  }

  // ===== Responsive Utilities =====
  function initResponsive() {
    // Add responsive classes based on screen size
    const updateResponsiveClasses = () => {
      const width = window.innerWidth;
      document.body.classList.remove('screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl');

      if (width < 576) document.body.classList.add('screen-xs');
      else if (width < 768) document.body.classList.add('screen-sm');
      else if (width < 992) document.body.classList.add('screen-md');
      else if (width < 1200) document.body.classList.add('screen-lg');
      else document.body.classList.add('screen-xl');
    };

    updateResponsiveClasses();
    window.addEventListener('resize', debounce(updateResponsiveClasses, 100));
  }

  // ===== Scroll Effects =====
  function initScrollEffects() {
    // Add scroll shadow to topbar
    const topbar = document.querySelector('.admin-topbar');
    if (!topbar) return;

    const content = document.querySelector('.admin-content');
    if (!content) return;

    content.addEventListener('scroll', debounce(function() {
      if (content.scrollTop > 10) {
        topbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      } else {
        topbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
      }
    }, 50));
  }

  // ===== Utility Functions =====

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Format number with commas
  window.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Format currency
  window.formatCurrency = function(amount, currency = 'ل.س') {
    return formatNumber(amount) + ' ' + currency;
  };

  // Format date
  window.formatDate = function(date, options = {}) {
    const defaultOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('ar-SY', { ...defaultOptions, ...options });
  };

  // Show toast notification
  window.showToast = function(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;

    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-100px);
      background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Cairo', sans-serif;
      font-weight: 600;
      z-index: 9999;
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after duration
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(-100px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // Confirm dialog
  window.confirmDialog = function(message, callback) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 20px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;

    dialog.innerHTML = `
      <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f39c12; margin-bottom: 1rem;"></i>
      <h3 style="font-family: 'Cairo', sans-serif; margin-bottom: 1rem; color: var(--dark);">تأكيد</h3>
      <p style="font-family: 'Cairo', sans-serif; color: #7f8c8d; margin-bottom: 1.5rem;">${message}</p>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn-confirm-yes" style="
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        ">نعم</button>
        <button class="btn-confirm-no" style="
          background: #f8f9fa;
          color: #2c3e50;
          border: 2px solid #e9ecef;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        ">لا</button>
      </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    });

    // Handle buttons
    dialog.querySelector('.btn-confirm-yes').addEventListener('click', () => {
      closeDialog();
      if (callback) callback(true);
    });

    dialog.querySelector('.btn-confirm-no').addEventListener('click', () => {
      closeDialog();
      if (callback) callback(false);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeDialog();
        if (callback) callback(false);
      }
    });

    function closeDialog() {
      overlay.style.opacity = '0';
      dialog.style.transform = 'scale(0.9)';
      setTimeout(() => overlay.remove(), 300);
    }
  };

  // Loading overlay
  window.showLoading = function(show = true) {
    let overlay = document.querySelector('.loading-overlay');

    if (show) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(5px);
        `;
        overlay.innerHTML = `
          <div style="text-align: center;">
            <div class="spinner" style="
              width: 50px;
              height: 50px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #e74c3c;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            "></div>
            <p style="font-family: 'Cairo', sans-serif; color: #7f8c8d; font-weight: 600;">جاري التحميل...</p>
          </div>
        `;
        document.body.appendChild(overlay);
      }
    } else if (overlay) {
      overlay.remove();
    }
  };

  // Add spinner animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

})();
