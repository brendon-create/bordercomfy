/* ===================================
   BorderComfy 舒適邊境 - 主 JavaScript
   玩家級露營枕官方網站
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化導航功能
  initNavigation();
  
  // 初始化 FAQ 折疊功能
  initFAQ();
  
  // 初始化滾動動畫
  initScrollAnimations();
});

/* --- 導航功能 --- */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // 點擊選單連結後關閉選單
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
    
    // 點擊其他地方關閉選單
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }
  
  // 更新導航列中當前頁面的連結狀態
  updateActiveNavLink();
}

/* --- 更新當前頁面導航狀態 --- */
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- FAQ 折疊功能 --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        // 關閉其他已開啟的項目
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
          }
        });
        
        // 切換當前項目的狀態
        item.classList.toggle('open');
      });
    }
  });
}

/* --- 滾動動畫 --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .retailer-card, .link-card');
  
  // 使用 Intersection Observer 來檢測元素是否可見
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  } else {
    // 對於不支持 IntersectionObserver 的瀏覽器，直接顯示
    animatedElements.forEach(el => el.classList.add('fade-in'));
  }
}

/* --- 表單處理（Contact Form）--- */
function setupContactForm() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 收集表單資料
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // 這裡可以添加表單提交邏輯
      // 例如：發送到 Google Forms 或 email服務
      console.log('表單資料：', data);
      
      // 顯示成功訊息
      alert('感謝您的留言！我們會尽快回覆您。');
      form.reset();
    });
  }
}

/* --- 滾動到頂部功能 --- */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 讓 scrollToTop 可以被外部呼叫
window.scrollToTop = scrollToTop;

/* --- 平滑滾動到錨點 --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#top') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* --- 延遲載入圖片（Lazy Loading）--- */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // 立即載入所有圖片
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}