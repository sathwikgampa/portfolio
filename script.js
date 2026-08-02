// ============================================================
//  PORTFOLIO SCRIPT
//  Gampa Sathwik — Software Engineer Portfolio
//  High-Performance rAF Throttling, Passive Scroll Listeners & Real Form Handler
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Cache Critical DOM References
  const navbar = document.getElementById('navbar');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const mobileNavLinks = Array.from(document.querySelectorAll('.nav-mobile a'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const scrollTopBtn = document.getElementById('scroll-to-top');

  /* ── Throttled Scroll Engine using requestAnimationFrame (Zero Layout Thrashing) ── */
  let isTicking = false;

  function updateScrollState() {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // 1. Navbar Scrolled Styling
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 2. Active Link Highlight Engine
    let currentSectionId = '';
    
    if ((innerHeight + scrollY) >= scrollHeight - 50) {
      currentSectionId = 'contact';
    } else {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
          break;
        }
      }
    }

    if (currentSectionId) {
      const activeHash = `#${currentSectionId}`;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === activeHash);
      });
      mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === activeHash);
      });
    }

    // 3. Floating Scroll-To-Top Button Visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    isTicking = false;
  }

  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(updateScrollState);
      isTicking = true;
    }
  }

  // Bind passive listener for max performance on main thread
  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollState();

  /* ── Mobile Navigation Drawer ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const mobileOverlay = document.getElementById('nav-mobile-overlay');

  function toggleMobileMenu() {
    const isOpen = mobileNav?.classList.toggle('open');
    hamburger?.classList.toggle('open', isOpen);
    mobileOverlay?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  /* ── Scroll To Top Smooth Execution ── */
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Typing Subtitle Animation ── */
  const typingEl = document.getElementById('typed-text');
  if (typingEl) {
    const phrases = [
      'Software Engineering Student',
      'Full-Stack Developer',
      'AI Systems & Backend Builder',
      'Open Source Contributor'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function typeEffect() {
      const currentPhrase = phrases[phraseIdx];
      typingEl.textContent = isDeleting
        ? currentPhrase.slice(0, charIdx - 1)
        : currentPhrase.slice(0, charIdx + 1);

      charIdx += isDeleting ? -1 : 1;
      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(typeEffect, delay);
    }
    typeEffect();
  }

  /* ── Scroll Reveal Observer ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Hero Stats Counter Animation ── */
  const statsSection = document.querySelector('.hero-stats');
  const statNumbers = document.querySelectorAll('.hero-stat-num[data-target]');

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => animateCounter(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    const duration = 1200;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.floor(progress * target);
      el.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  /* ── Production Web3Forms Async Contact Handler ── */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending Message...';
    formFeedback.style.display = 'none';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showFeedback('Message delivered! I will get back to you shortly.', 'success');
        contactForm.reset();
      } else {
        // Fallback for missing key or API limits
        window.location.href = `mailto:gampasathwik2220@gmail.com?subject=${encodeURIComponent(formData.get('subject') || 'Inquiry')}&body=${encodeURIComponent(formData.get('message') || '')}`;
        showFeedback('Opening email client...', 'success');
      }
    } catch (err) {
      // Direct mailto fallback on network fail
      window.location.href = `mailto:gampasathwik2220@gmail.com?subject=Portfolio%20Inquiry&body=${encodeURIComponent(formData.get('message') || '')}`;
      showFeedback('Redirecting to mail client...', 'success');
    } finally {
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    }
  });

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
  }

});
