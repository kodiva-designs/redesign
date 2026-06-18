/* ==========================================================================
   Kodiva Studio - Premium Landing Page Interactions
   Frameworks: Vanilla JS + GSAP (GreenSock Animation Platform)
   ========================================================================== */

// Configuration: Toggle frontend analytics console HUD
const ENABLE_ANALYTICS_CONSOLE = true;

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Initialize all modules
  initCustomCursor();
  initNavbarScroll();
  initCollageParallax();
  initScrollReveals();
  initBeforeAfterSlider();
  initFaqAccordion();
  initAnalyticsConsole();
  initFormSubmit();
});

/* --------------------------------------------------------------------------
   1. Analytics Logger HUD System
   -------------------------------------------------------------------------- */
const analyticsLogs = [];
function logAnalyticsEvent(eventName, params = {}) {
  const timestamp = new Date().toLocaleTimeString();
  const logObj = { event: eventName, ...params };
  analyticsLogs.push({ time: timestamp, data: logObj });

  // Console logging
  console.log(`[Analytics] ${eventName}:`, params);

  // Update UI console if enabled
  if (ENABLE_ANALYTICS_CONSOLE) {
    const consoleBody = document.getElementById('analyticsLogsContainer');
    if (consoleBody) {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = `
        <span class="log-time">[${timestamp}]</span> 
        <span class="log-event">${eventName}</span>: 
        <span class="log-meta">${JSON.stringify(params)}</span>
      `;
      consoleBody.appendChild(entry);
      // Auto scroll to bottom
      consoleBody.scrollTop = consoleBody.scrollHeight;
    }
  }
}

function initAnalyticsConsole() {
  const drawer = document.getElementById('analyticsDrawer');
  const header = document.getElementById('analyticsHeader');

  if (!ENABLE_ANALYTICS_CONSOLE) {
    if (drawer) {
      drawer.style.display = 'none';
    }
    return;
  }

  if (header && drawer) {
    header.addEventListener('click', () => {
      drawer.classList.toggle('minimized');
    });
  }

  // Initial log
  logAnalyticsEvent('page_load', { section: 'global', timestamp: Date.now() });
}

/* --------------------------------------------------------------------------
   2. Custom Cursor Module
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Use GSAP ticker for smooth lag-interpolated cursor follow
  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;
    gsap.set(cursor, { x: cursorX, y: cursorY });
  });

  // Interactive hovers
  const viewHoverables = document.querySelectorAll('.hover-view');
  viewHoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
    });
  });

  const ctaHoverables = document.querySelectorAll('.hover-cta-state');
  ctaHoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('redesign-hovered');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('redesign-hovered');
    });
  });
}

/* --------------------------------------------------------------------------
   3. Navbar Dynamic State
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobileMenu');
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu toggles
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const spans = toggleBtn.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        logAnalyticsEvent('mobile_menu_open');
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        logAnalyticsEvent('mobile_menu_close');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = toggleBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Scroll events for CTA button
  const viewDesignsBtns = document.querySelectorAll('.scroll-to-work');
  viewDesignsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });

        // Log event
        const ctaLabel = btn.innerText.trim();
        const parentSection = btn.closest('section') ? btn.closest('section').id : 'navbar';
        logAnalyticsEvent('hero_cta_click', { section: parentSection, cta_label: ctaLabel });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Parallax Collage (Hero Section)
   -------------------------------------------------------------------------- */
function initCollageParallax() {
  const items = document.querySelectorAll('.collage-item');
  if (items.length === 0) return;

  // Parallax elements moving at different rates based on mouse hover in hero
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { width, height } = hero.getBoundingClientRect();
      const xVal = (e.clientX - width / 2) / (width / 2); // -1 to 1
      const yVal = (e.clientY - height / 2) / (height / 2); // -1 to 1

      gsap.to(items[0], { x: xVal * 15, y: yVal * 15, duration: 1, ease: 'power2.out' });
      gsap.to(items[1], { x: xVal * -25, y: yVal * -20, duration: 1, ease: 'power2.out' });
      gsap.to(items[2], { x: xVal * 10, y: yVal * -12, duration: 1, ease: 'power2.out' });
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
      items.forEach(item => {
        gsap.to(item, { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
      });
    });
  }

  // Vertical Parallax Scroll Effect
  gsap.to(items[0], {
    y: '-10%',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to(items[1], {
    y: '-30%',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to(items[2], {
    y: '-18%',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal & Metrics Animations
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  // Stagger reveal for section headings
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const kicker = sec.querySelector('.kicker');
    const h2 = sec.querySelector('h2');
    const p = sec.querySelector('p.lead');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    if (kicker) timeline.from(kicker, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
    if (h2) timeline.from(h2, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    if (p) timeline.from(p, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    // Trigger Section Views Analytics
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        if (sec.id === 'work') {
          logAnalyticsEvent('showcase_section_view', { section: 'work' });
        }
      }
    });
  });

  // Problem Cards Reveal
  gsap.from('.pain-card', {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#problem',
      start: 'top 75%'
    }
  });

  // Benefit Bullets Reveal
  gsap.from('.bullet-item', {
    opacity: 0,
    x: -30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#transformation',
      start: 'top 75%'
    }
  });

  // Tech Diagram Node pulse
  gsap.to('.diagram-node', {
    scale: 1.3,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    stagger: 0.3
  });

  // Showcase Cards Reveal
  gsap.from('.showcase-card', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#work',
      start: 'top 70%'
    }
  });

  // Industry Cards Reveal & View Track
  gsap.from('.industry-card', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#industries',
      start: 'top 75%',
      onEnter: () => {
        logAnalyticsEvent('industry_card_view', { section: 'industries' });
      }
    }
  });

  // Process Timeline connecting line animation
  const stepItems = document.querySelectorAll('.process-step-item');
  stepItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 75%',
      onEnter: () => {
        item.classList.add('active-step');
        gsap.fromTo(item.querySelector('p'), { opacity: 0 }, { opacity: 1, duration: 0.5 });
      }
    });
  });

  // Add click trackers to showcase cards
  const cards = document.querySelectorAll('.showcase-card');
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      const designTitle = this.querySelector('.card-title').innerText.trim();
      const industry = this.querySelector('.card-industry').innerText.trim();
      const targetUrl = this.getAttribute('data-url');

      logAnalyticsEvent('showcase_card_click', {
        section: 'work',
        design_title: designTitle,
        industry: industry,
        target_url: targetUrl
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Before/After Split Drag Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterSlider');
  const afterPanel = document.getElementById('afterPanel');
  const handle = document.getElementById('sliderHandle');

  if (!container || !afterPanel || !handle) return;

  // Set initial split variable
  container.style.setProperty('--slide-percent', '50');

  let isDragging = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    // Bounds check
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;

    // Update widths, position, and CSS variable for child image alignment
    afterPanel.style.width = `${percent}%`;
    container.style.setProperty('--slide-percent', percent);
    handle.style.left = `${percent}%`;
  };

  // Mouse events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  // Touch events (mobile support)
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  });

  // Click anywhere on container to move slider
  container.addEventListener('click', (e) => {
    // Avoid double trigger if clicking handle itself
    if (e.target === handle || handle.contains(e.target)) return;
    moveSlider(e.clientX);
    logAnalyticsEvent('slider_interact', { section: 'before_after', xPosition: e.clientX });
  });
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion Module
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open items
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;

        // Log analytics event
        const questionText = trigger.querySelector('h3').innerText.trim();
        logAnalyticsEvent('faq_expand', { section: 'faq', question: questionText });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Redesign Consultation Request Form Submission
   -------------------------------------------------------------------------- */
function initFormSubmit() {
  const form = document.getElementById('redesignForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const url = document.getElementById('formUrl').value;
    const email = document.getElementById('formEmail').value;

    // Log submission event
    logAnalyticsEvent('final_cta_click', {
      section: 'contact',
      cta_label: 'Submit Request',
      user_name: name,
      user_website: url,
      user_email: email
    });

    // Visual success feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'REQUEST RECEIVED';
    submitBtn.style.backgroundColor = '#ffffff';
    submitBtn.style.color = '#07090d';
    submitBtn.disabled = true;

    // Show visual confirmation modal or overlay in form
    const formSuccessBox = document.createElement('div');
    formSuccessBox.className = 'log-entry';
    formSuccessBox.style.marginTop = '20px';
    formSuccessBox.style.borderColor = 'var(--accent-lime)';
    formSuccessBox.innerHTML = `
      <span style="color: var(--accent-lime); font-weight: bold;">[SUCCESS] Redesign Audit Scheduled!</span><br>
      <span style="color: var(--text-secondary);">We will review ${url || 'your website'} within 24 hours. Check your inbox: ${email}.</span>
    `;
    form.appendChild(formSuccessBox);

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
      formSuccessBox.remove();
    }, 6000);
  });

  // Secondary CTA "Start Your Redesign" links scrolling to form
  const startBtns = document.querySelectorAll('.scroll-to-contact');
  startBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });

        const ctaLabel = btn.innerText.trim();
        const parentSection = btn.closest('section') ? btn.closest('section').id : 'navbar';
        logAnalyticsEvent('secondary_audit_cta_click', { section: parentSection, cta_label: ctaLabel });
      }
    });
  });
}
