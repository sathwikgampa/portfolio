// ============================================================
//  PORTFOLIO SCRIPT
//  Gampa Sathwik — SDE Student Portfolio
// ============================================================

/* ── Navbar Scroll Behavior ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for blur effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ── Mobile Hamburger ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ── Typing Animation (Hero subtitle) ── */
const phrases = [
  'Full-Stack Web Developer',
  'Backend Systems Builder',
  'React & Node.js Engineer',
  'Problem Solver & Builder',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingEl = document.getElementById('typed-text');

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

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIdx === currentPhrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

/* ── Scroll Progress Floating Button ── */
const scrollTopBtn = document.getElementById('scroll-to-top');
const progressCircle = document.querySelector('.progress-ring-circle');

if (scrollTopBtn && progressCircle) {
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius; // ~131.95
  
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollHeight > 0) {
      const percent = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      const offset = circumference - (percent * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }

    if (scrollTop > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('resize', updateScrollProgress);
  
  updateScrollProgress();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ── Scroll Reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill Tags Stagger ── */
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, i) => {
  tag.style.transitionDelay = `${i * 30}ms`;
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Hero Stat Counter Animation ── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = el.dataset.suffix || '';

  const step = () => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      return;
    }
    el.textContent = Math.floor(start) + suffix;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.hero-stat-num[data-target]');
      counters.forEach(counter => {
        animateCounter(counter, parseInt(counter.dataset.target), 1200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Active nav link on page load ── */
window.dispatchEvent(new Event('scroll'));

/* ── Project card tilt effect ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -3;
    const rotY = ((x - centerX) / centerX) * 3;
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
