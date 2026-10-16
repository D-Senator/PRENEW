/* ============================================================
   PRINIU ENERGY INTERNATIONAL
   Client-side JavaScript
   ------------------------------------------------------------
   Features:
     1. Mobile menu toggle
     2. Navbar scroll shadow
     3. Active navigation link highlight
     4. Scroll-reveal animations (IntersectionObserver)
     5. Gallery filter (category switching)
     6. Contact form submission feedback
     7. Animated stat counters
     8. Smooth scroll for anchor links
   ============================================================ */


/* ============================================================
   1. MOBILE MENU TOGGLE
   ------------------------------------------------------------
   Toggles .active class on the mobile menu + hamburger icon
   when the hamburger is clicked.
   ============================================================ */
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger  = document.querySelector('.hamburger');

  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}


/* ============================================================
   2. NAVBAR SCROLL SHADOW
   ------------------------------------------------------------
   Adds .scrolled class to navbar once the user scrolls past 50px
   to deepen the shadow for visual separation.
   ============================================================ */
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================================
   3. PAGE-LEVEL BEHAVIOR (runs on DOMContentLoaded)
   ------------------------------------------------------------
   Bundles: active link highlighting + scroll-reveal animation.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ----- 3a. Highlight current page in nav ----- */
  // Detect current page file name and mark matching link active.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  /* ----- 3b. Scroll-reveal animation ----- */
  // Cards fade-in & rise into view as the user scrolls.
  const fadeElements = document.querySelectorAll(
    '.service-card, .why-card, .value-card, .stat-card, ' +
    '.hse-card, .equipment-card, .partner-card'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Initial state + staggered transition for each card.
  fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition =
      `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(element);
  });
});


/* ============================================================
   4. GALLERY FILTER
   ------------------------------------------------------------
   Filters gallery items based on data-category attribute.
   Used on the Gallery page.
   ============================================================ */
function filterGallery(category) {
  const items   = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.gallery-filters .btn');

  // Reset all buttons to outline style
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  // Highlight the clicked button
  if (window.event && window.event.target) {
    window.event.target.classList.remove('btn-outline');
    window.event.target.classList.add('btn-primary');
  }

  // Show/hide items by category (or show all)
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}


/* ============================================================
   5. CONTACT FORM SUBMISSION
   ------------------------------------------------------------
   Intercepts the form, prevents real submission, and shows a
   confirmation alert. Replace this with a real endpoint in
   production (e.g., Formspree, custom backend, etc.).
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name     = formData.get('name') || 'User';

    alert(`Thank you, ${name}! Your message has been received. ` +
          `We will contact you shortly.`);
    this.reset();
  });
});


/* ============================================================
   6. STAT COUNTER ANIMATION
   ------------------------------------------------------------
   Animates .stat-number values from 0 to their final value
   once the stats section scrolls into view.
   ============================================================ */
function animateCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const text = stat.textContent;

    // Only animate numeric values with + or % suffix
    if (text.includes('+') || text.includes('%')) {
      const num       = parseInt(text);
      const suffix    = text.includes('+') ? '+' : '%';
      let current     = 0;
      const increment = num / 50;
      const timer     = setInterval(() => {
        current += increment;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 30);
    }
  });
}

/* Trigger counter animation when stats section is visible */
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entries[0].target);   // Only run once
    }
  }, { threshold: 0.3 });
  counterObserver.observe(statsSection);
}


/* ============================================================
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   ------------------------------------------------------------
   Enables smooth scrolling for any in-page anchor (e.g. #wireline).
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


/* ============================================================
   8. INITIALIZATION LOG
   ============================================================ */
console.log('Priniu Energy website loaded successfully');



/* ==========================================
    9. CONTACT FORM SUBMIT LOADING STATE
 ========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function () {

        const submitBtn = contactForm.querySelector("button[type='submit']");

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

    });
}