document.addEventListener('DOMContentLoaded', () => {

  // ===== TYPED TEXT EFFECT =====
  const phrases = [
    'intelligent automation solutions.',
    'RPA bots that save thousands of hours.',
    'AI-powered workflows.',
    'scalable enterprise automations.',
    'the bridge between RPA and AI.',
  ];

  const typedEl = document.getElementById('typedText');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseMs = 0;

  function typeLoop() {
    const current = phrases[phraseIdx];

    if (pauseMs > 0) {
      const wait = pauseMs;
      pauseMs = 0;
      setTimeout(typeLoop, wait);
      return;
    }

    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        pauseMs = 2000;
      }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 30 : 60;
    setTimeout(typeLoop, speed);
  }

  typeLoop();

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ===== SCROLL ANIMATIONS =====
  const animateEls = document.querySelectorAll('.animate-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animateEls.forEach(el => observer.observe(el));

  // ===== COUNT-UP ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          animateCount(el, target);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => countObserver.observe(el));

  function animateCount(el, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function tick() {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        return;
      }
      el.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(tick);
    }

    tick();
  }

  // ===== SKILL BAR ANIMATION =====
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  barFills.forEach(el => barObserver.observe(el));

  // ===== CONTACT FORM (BASIC) =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action');
      if (action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        alert('Thank you for reaching out! (Set up Formspree or EmailJS to enable real submissions.)');
        form.reset();
      }
    });
  }

});
