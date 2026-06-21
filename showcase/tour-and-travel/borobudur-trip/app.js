/* ============================================================
   BOROBUDUR TRIP — Stone and Light
   GSAP Animations, Scroll Interactions, Performance
   ============================================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ---- PRELOADER ----
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  const line = document.querySelector('.preloader__line');

  if (!preloader) return;

  // Start loading animation
  if (line) {
    line.classList.add('preloader__line--loading');
  }

  // Wait for loading then fade out
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.pointerEvents = 'none';
      initPageAnimations();
    }
  });

  tl.to(preloader, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    delay: 1.2,
  })
  .set(preloader, { display: 'none' });
}

// ---- NAVIGATION ----
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.nav__mobile');

  // Scroll behavior
  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('nav__toggle--active');
      mobile.classList.toggle('nav__mobile--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Animate mobile links
      if (isOpen) {
        gsap.fromTo(mobile.querySelectorAll('a'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.15
          }
        );
      }
    });

    // Close on link click
    mobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('nav__toggle--active');
        mobile.classList.remove('nav__mobile--open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ---- HERO ANIMATIONS ----
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 1.2 });

  tl.fromTo('.hero__bg img',
    { scale: 1.2 },
    { scale: 1.1, duration: 1.8, ease: 'power2.out' }
  )
  .fromTo('.hero__eyebrow',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=1.2'
  )
  .fromTo('.hero__title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.6'
  )
  .fromTo('.hero__bottom-grid',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.5'
  )
  .fromTo('.hero__scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power2.out' },
    '-=0.2'
  );

  // Parallax on hero image
  gsap.to('.hero__bg img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    }
  });

  // Fade out hero content and scroll indicator on scroll
  gsap.to(['.hero__content', '.hero__scroll'], {
    opacity: 0,
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: '40% top',
      end: 'bottom top',
      scrub: 0.5,
    }
  });
}

// ---- SCROLL REVEAL ANIMATIONS ----
function initScrollAnimations() {
  // Generic reveal up
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Reveal from left
  gsap.utils.toArray('.reveal--left').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Reveal from right
  gsap.utils.toArray('.reveal--right').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Scale reveal
  gsap.utils.toArray('.reveal--scale').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Stagger children in grids
  gsap.utils.toArray('.stagger-children').forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Parallax for images
  gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      }
    });
  });

  // Cinematic banner parallax
  const cinematicBg = document.querySelector('.cinematic__bg img');
  if (cinematicBg) {
    gsap.fromTo(cinematicBg,
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.cinematic',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      }
    );
  }

  // Discovery image parallax
  const discoveryMedia = document.querySelector('.discovery__media-grid img');
  if (discoveryMedia) {
    gsap.to(discoveryMedia, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.discovery__media-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      }
    });
  }
}

// ---- STAT COUNTER ANIMATION ----
function initCounterAnimation() {
  const statNums = document.querySelectorAll('.discovery__stat-item span:first-child, .trust__stat-num');

  statNums.forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d,\.]+)(.*)/);
    if (!match) return;

    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2] || '';
    const hasComma = match[1].includes(',');
    const hasDecimal = match[1].includes('.');

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        let display;
        if (hasDecimal) {
          display = obj.val.toFixed(1);
        } else if (hasComma) {
          display = Math.round(obj.val).toLocaleString();
        } else {
          display = Math.round(obj.val).toString();
        }
        el.textContent = display + suffix;
      }
    });
  });
}

// ---- CUSTOM CURSOR ----
function initCustomCursor() {
  if (window.innerWidth <= 1024) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;
  let isHovered = false;
  let currentScale = 1;
  let targetScale = 1;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    targetScale = isHovered ? 1.55 : 1;
    currentScale += (targetScale - currentScale) * 0.15;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .exp-card, .featured-card, .editorial-card, .faq__question');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovered = true;
      ring.style.borderColor = 'rgba(181, 111, 76, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      isHovered = false;
      ring.style.borderColor = 'rgba(181, 111, 76, 0.4)';
    });
  });
}

// ---- FAQ ACCORDION ----
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    // Initialize state
    if (item.classList.contains('faq__item--open')) {
      gsap.set(answer, { height: 'auto', opacity: 1 });
    } else {
      gsap.set(answer, { height: 0, opacity: 0 });
    }

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');

      // Close all
      items.forEach(other => {
        if (other.classList.contains('faq__item--open')) {
          other.classList.remove('faq__item--open');
          const otherAnswer = other.querySelector('.faq__answer');
          if (otherAnswer) {
            gsap.to(otherAnswer, {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        }
      });

      // Open clicked if wasn't open
      if (!isOpen) {
        item.classList.add('faq__item--open');
        gsap.fromTo(answer,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }
        );
      }
    });
  });
}

// ---- MODALS (PLANNING & STORY READER) ----
function initModals() {
  // --- PLANNING MODAL ---
  const planningModal = document.getElementById('planning-modal');
  const planCTAs = document.querySelectorAll('.nav__cta, .conversion__cta');
  const planningForm = document.getElementById('planning-form');
  const planningSuccess = document.getElementById('planning-success');

  // Open Planning Modal
  planCTAs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(planningModal);
    });
  });

  // Submit Planning Form
  if (planningForm) {
    planningForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Animate transition to success view
      gsap.to(planningForm, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          planningForm.style.display = 'none';
          planningSuccess.style.display = 'flex';
          planningSuccess.style.opacity = 0;
          planningSuccess.style.transform = 'translateY(10px)';
          gsap.to(planningSuccess, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // --- STORY READER MODAL ---
  const storyModal = document.getElementById('story-modal');
  const editorialCards = document.querySelectorAll('.editorial-card');

  // Stories content dictionary
  const storiesData = {
    stupas: {
      tag: "Architecture",
      title: "The 72 Stupas: A Guide to Borobudur's Crown",
      date: "May 2026",
      image: "https://images.pexels.com/photos/4090091/pexels-photo-4090091.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
      body: `
        <p>Rising like a stone crown at the summit of Borobudur are seventy-two bell-shaped, perforated stupas. Arranged in three concentric circular terraces, these monuments represent the transition from the world of form (Rupadhatu) to the world of formlessness (Arupadhatu).</p>
        <p>Each perforated dome contains a seated Buddha statue, visible through diamond or square-shaped lattices. In Javanese lore, reaching through the lattice to touch the hands of the Buddha inside brings good fortune and inner peace. However, their architectural purpose is far more profound: they act as spiritual lenses, focusing the morning sun directly onto the central stupa that dominates the summit.</p>
        <p>Constructed entirely without mortar or adhesives, these heavy volcanic stones have stood the test of centuries, resisting earthquakes and eruptions. Standing among them at dawn, one witnesses a masterclass in cosmic alignment, where architecture and spirituality merge seamlessly under the morning light.</p>
      `
    },
    countryside: {
      tag: "Landscape",
      title: "Beyond the Temple: Java's Living Countryside",
      date: "April 2026",
      image: "https://images.pexels.com/photos/5547181/pexels-photo-5547181.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
      body: `
        <p>While Borobudur is the undisputed highlight, the true soul of Central Java resides in the emerald valleys that surround it. The Kedu Plain, nestled between active volcanic peaks, is a fertile paradise sustained by centuries of Javanese agricultural heritage.</p>
        <p>Walking through the countryside reveals a slow, poetic rhythm of life. Farmers guide water buffalo through flooded rice paddies, women weave bamboo baskets in the shade of teak trees, and local potters shape clay using traditional wooden wheels. This is not a landscape frozen in time, but a living, breathing heritage.</p>
        <p>Exploring the village pathways by bicycle or foot allows visitors to connect with Java's warm hospitality. A simple cup of Javanese ginger tea (Wedang Jahe) shared in a village home offers an authentic warmth that complements the grand stone monuments nearby. To experience Java is to walk the temple, but also to wander the fields.</p>
      `
    }
  };

  // Open Story Modal
  editorialCards.forEach(card => {
    card.addEventListener('click', () => {
      const storyId = card.getAttribute('data-story');
      const data = storiesData[storyId];
      if (!data) return;

      // Populate details
      document.getElementById('story-modal-img').src = data.image;
      document.getElementById('story-modal-img').alt = data.title;
      document.getElementById('story-modal-tag').textContent = data.tag;
      document.getElementById('story-modal-title').textContent = data.title;
      document.getElementById('story-modal-date').textContent = data.date;
      document.getElementById('story-modal-body').innerHTML = data.body;

      openModal(storyModal);
    });

    // Support keyboard trigger (Enter/Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // --- GENERAL MODAL LOGIC ---
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    const overlay = modal.querySelector('.modal__overlay');
    const closeBtn = modal.querySelector('.modal__close');
    const successCloseBtn = modal.querySelector('.modal__close-success');

    const closeHandler = () => closeModal(modal);

    if (overlay) overlay.addEventListener('click', closeHandler);
    if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeHandler);
  });

  // Escape key support
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal--open');
      if (openModalEl) closeModal(openModalEl);
    }
  });

  function openModal(modal) {
    if (!modal) return;
    
    // Stop body scroll
    document.body.style.overflow = 'hidden';
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');

    // Reset planning form if it was submitted before
    if (modal.id === 'planning-modal' && planningForm && planningSuccess) {
      planningForm.style.display = 'flex';
      planningForm.style.opacity = 1;
      planningForm.reset();
      planningSuccess.style.display = 'none';
    }

    // GSAP animation for container
    const container = modal.querySelector('.modal__container');
    gsap.fromTo(container,
      { scale: 0.95, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', delay: 0.1 }
    );
  }

  function closeModal(modal) {
    if (!modal) return;
    
    // Resume body scroll
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');

    // GSAP animation for container closing
    const container = modal.querySelector('.modal__container');
    gsap.to(container, {
      scale: 0.95,
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        modal.classList.remove('modal--open');
      }
    });
  }
}

// ---- SMOOTH SCROLL (Lenis) ----
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ---- MAGNETIC BUTTON EFFECT ----
function initMagneticButtons() {
  if (window.innerWidth <= 1024) return;

  const buttons = document.querySelectorAll('.hero__cta, .conversion__cta, .nav__cta');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ---- TEXT SPLIT ANIMATION ----
function initTextSplitAnimations() {
  const headings = document.querySelectorAll('.split-text');

  headings.forEach(heading => {
    const text = heading.textContent;
    heading.innerHTML = '';

    // Split into words
    const words = text.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = word + (i < words.length - 1 ? '\u00A0' : '');

      span.appendChild(inner);
      heading.appendChild(span);
    });

    const innerSpans = heading.querySelectorAll('span > span');

    gsap.fromTo(innerSpans,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ---- HORIZONTAL SCROLL FOR EXPERIENCE CARDS (MOBILE) ----
function initMobileHorizontalScroll() {
  if (window.innerWidth > 640) return;

  const grid = document.querySelector('.experiences__grid');
  if (!grid) return;

  // Make horizontal scroll on mobile
  grid.style.display = 'flex';
  grid.style.overflowX = 'auto';
  grid.style.scrollSnapType = 'x mandatory';
  grid.style.gap = '16px';
  grid.style.padding = '0 20px';
  grid.style.WebkitOverflowScrolling = 'touch';

  Array.from(grid.children).forEach(card => {
    card.style.minWidth = '280px';
    card.style.scrollSnapAlign = 'start';
    card.style.flexShrink = '0';
  });
}

// ---- IMAGE LAZY LOADING ----
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(img => observer.observe(img));
  } else {
    // Fallback
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// ---- MAIN PAGE ANIMATION INIT ----
function initPageAnimations() {
  initHeroAnimations();
  initScrollAnimations();
  initCounterAnimation();
  initTextSplitAnimations();
}

// ---- INITIALIZE EVERYTHING ----
document.addEventListener('DOMContentLoaded', () => {
  // Init critical first
  initNavigation();
  initFAQ();
  initModals();
  initLazyLoading();

  // Init smooth scroll
  initSmoothScroll();

  // Init preloader animation then page
  initPreloader();

  // Non-critical
  initCustomCursor();
  initMagneticButtons();

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
});


