// ============================================
// Admin Dashboard JavaScript - بيتزا إيطاليا
// ============================================

(function() {
  'use strict';

  // ============================================
  // Sidebar Toggle
  // ============================================

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const wrapper = document.querySelector('.admin-wrapper');

  if (sidebarToggle && wrapper) {
    sidebarToggle.addEventListener('click', function() {
      wrapper.classList.toggle('sidebar-collapsed');

      // Save state to localStorage
      const isCollapsed = wrapper.classList.contains('sidebar-collapsed');
      localStorage.setItem('adminSidebarCollapsed', isCollapsed);
    });

    // Restore sidebar state
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState === 'true') {
      wrapper.classList.add('sidebar-collapsed');
    }
  }

  // Mobile sidebar toggle
  function initMobileSidebar() {
    if (window.innerWidth <= 991.98) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
      });

      // Close sidebar when clicking outside
      document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('show');
        }
      });
    }
  }

  initMobileSidebar();
  window.addEventListener('resize', initMobileSidebar);

  // ============================================
  // Active Navigation Item
  // ============================================

  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // ============================================
  // Charts (Dashboard Page)
  // ============================================

  function initCharts() {
    const salesChartEl = document.getElementById('salesChart');
    const productsChartEl = document.getElementById('productsChart');

    if (salesChartEl && typeof Chart !== 'undefined') {
      new Chart(salesChartEl, {
        type: 'line',
        data: {
          labels: ['1', '5', '10', '15', '20', '25', '30'],
          datasets: [{
            label: 'المبيعات (ر.س)',
            data: [1200, 1900, 1500, 2200, 2800, 2400, 3200],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)'
              },
              ticks: {
                font: {
                  family: 'Cairo'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: 'Cairo'
                }
              }
            }
          }
        }
      });
    }

    if (productsChartEl && typeof Chart !== 'undefined') {
      new Chart(productsChartEl, {
        type: 'doughnut',
        data: {
          labels: ['بيتزا مارغريتا', 'بيتزا دجاج', 'بيتزا ببروني', 'بيتزا خضار', 'أخرى'],
          datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
              '#e74c3c',
              '#f39c12',
              '#27ae60',
              '#3498db',
              '#95a5a6'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  family: 'Cairo',
                  size: 12
                },
                padding: 15,
                usePointStyle: true
              }
            }
          },
          cutout: '65%'
        }
      });
    }
  }

  // Initialize charts if on dashboard page
  if (document.getElementById('salesChart') || document.getElementById('productsChart')) {
    initCharts();
  }

  // ============================================
  // Table Row Selection
  // ============================================

  const selectAllCheckbox = document.querySelector('.admin-table thead input[type="checkbox"]');
  const rowCheckboxes = document.querySelectorAll('.admin-table tbody input[type="checkbox"]');

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }

  // ============================================
  // Search Functionality
  // ============================================

  const searchInputs = document.querySelectorAll('.topbar-search input, .card-header input[type="text"]');

  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const table = this.closest('.content-card')?.querySelector('.admin-table tbody');

      if (table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
      }
    });
  });

  // ============================================
  // Action Buttons Confirmation
  // ============================================

  const deleteButtons = document.querySelectorAll('.action-buttons .btn[title="حذف"]');

  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        e.preventDefault();
      }
    });
  });

  // ============================================
  // Form Validation
  // ============================================

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Remove invalid class on input
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('is-invalid');
    });
  });

  // ============================================
  // Upload Area
  // ============================================

  const uploadArea = document.querySelector('.upload-area');

  if (uploadArea) {
    uploadArea.addEventListener('click', function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.style.borderColor = '#e74c3c';
      this.style.background = 'rgba(231, 76, 60, 0.02)';
    });

    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      this.style.borderColor = '#e9ecef';
      this.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.borderColor = '#e9ecef';
      this.style.background = 'transparent';
      // Handle dropped files here
    });
  }

  // ============================================
  // Settings Save Notification
  // ============================================

  const saveButtons = document.querySelectorAll('.content-card .btn-primary');

  saveButtons.forEach(btn => {
    if (btn.textContent.includes('حفظ') || btn.textContent.includes('تحديث')) {
      btn.addEventListener('click', function() {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <span>تم حفظ التغييرات بنجاح!</span>
        `;
        document.body.appendChild(toast);

        // Add styles dynamically
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);
          background: #27ae60;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;

        // Animate in
        setTimeout(() => {
          toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
          toast.style.transform = 'translateX(-50%) translateY(-100%)';
          setTimeout(() => toast.remove(), 400);
        }, 3000);
      });
    }
  });

  // ============================================
  // Order Status Update (Orders Page)
  // ============================================

  const statusUpdateButtons = document.querySelectorAll('.action-buttons .btn[title="تحديث الحالة"]');

  statusUpdateButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('tr');
      const statusBadge = row.querySelector('.badge');

      const statuses = [
        { text: 'قيد الانتظار', class: 'bg-secondary' },
        { text: 'قيد التحضير', class: 'bg-warning' },
        { text: 'قيد التوصيل', class: 'bg-info' },
        { text: 'مكتمل', class: 'bg-success' },
        { text: 'ملغي', class: 'bg-danger' }
      ];

      const currentStatus = statusBadge.textContent.trim();
      const currentIndex = statuses.findIndex(s => s.text === currentStatus);
      const nextIndex = (currentIndex + 1) % statuses.length;
      const nextStatus = statuses[nextIndex];

      statusBadge.textContent = nextStatus.text;
      statusBadge.className = `badge ${nextStatus.class}`;
    });
  });

  // ============================================
  // Print Functionality
  // ============================================

  // Add print button functionality if needed
  document.querySelectorAll('.btn[title="تصدير"]').forEach(btn => {
    btn.addEventListener('click', function() {
      window.print();
    });
  });

  // ============================================
  // Responsive Table Scroll
  // ============================================

  const tableResponsive = document.querySelectorAll('.table-responsive');

  tableResponsive.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  });

  // ============================================
  // Smooth Scroll
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // Console Welcome
  // ============================================

  console.log('%c بيتزا إيطاليا - لوحة التحكم ', 'background: #e74c3c; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
  console.log('%c Admin Dashboard Loaded Successfully ', 'color: #27ae60; font-size: 14px;');

})();
