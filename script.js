// ============================================================
//  PORTFOLIO SCRIPT
//  Gampa Sathwik — Software Engineer Portfolio
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  
  /* ── Navbar Scroll Behavior & Active Link Highlight ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileNavLinks = document.querySelectorAll('.nav-mobile a');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    // Scrolled class for visual border/bg update
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Fallback for very bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      currentSection = 'contact';
    }

    // Update desktop nav link active state
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Update mobile nav link active state
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  // Run on load
  handleNavbarScroll();


  /* ── Mobile Navigation Drawer ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const mobileOverlay = document.getElementById('nav-mobile-overlay');

  function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    // Toggle scroll lock on body
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Close mobile nav on links click
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  /* ── Typing Animation (Hero Subtitle) ── */
  const phrases = [
    'Software Engineering Student',
    'Full-Stack Developer',
    'AI Systems & Backend Builder',
    'Open Source Contributor'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typed-text');

  function typeEffect() {
    if (!typingEl) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.slice(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = currentPhrase.slice(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, delay);
  }

  if (typingEl) {
    typeEffect();
  }


  /* ── Floating Scroll-to-Top Button ── */
  const scrollTopBtn = document.getElementById('scroll-to-top');

  function handleScrollTopVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollTopVisibility);

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /* ── Scroll Reveal Observer ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── Hero Stats Counter Animation ── */
  const statsSection = document.querySelector('.hero-stats');
  const statNumbers = document.querySelectorAll('.hero-stat-num[data-target]');

  function animateCounter(element, target, duration = 1200) {
    let startTime = null;
    const suffix = element.getAttribute('data-suffix') || '';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      const currentVal = Math.floor(progressPercent * target);
      
      element.textContent = currentVal + suffix;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target + suffix;
      }
    }
    
    window.requestAnimationFrame(step);
  }

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => {
            const targetVal = parseInt(num.getAttribute('data-target'), 10);
            if (!isNaN(targetVal)) {
              animateCounter(num, targetVal);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    statsObserver.observe(statsSection);
  }


  /* ── Contact Form Submission Handler ── */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button & show sending state
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending Message...';
    formFeedback.className = 'form-feedback';
    formFeedback.style.display = 'none';

    // Extract form values
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Perform validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields.', 'error');
      return;
    }

    // Mock API call to simulate sending message
    setTimeout(() => {
      // Simulate success response
      showFeedback(`Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`, 'success');
      contactForm.reset();
    }, 1000);
  });

  function showFeedback(msg, type) {
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
    
    // Reset button state
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = 'Send Message';
  }

});
