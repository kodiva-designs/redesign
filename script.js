/* ===================================================================
   KODIVA — Interactions
   Lenis smooth scroll + GSAP ScrollTrigger choreography
   =================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  const hasST = typeof ScrollTrigger !== 'undefined';
  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------------
     1. PRELOADER
     --------------------------------------------------------------- */
  function runPreloader(done) {
    const preloader = document.querySelector('[data-preloader]');
    if (!preloader) return done && done();

    const progress = preloader.querySelector('[data-preload-progress]');
    const countEl = preloader.querySelector('[data-preload-count]');
    const words = preloader.querySelectorAll('[data-preload-words] span');

    if (reduceMotion || !hasGSAP) {
      preloader.classList.add('is-done');
      return done && done();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        preloader.classList.add('is-done');
        done && done();
      },
    });

    tl.to(words, {
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.05,
    });

    tl.to(progress, {
      width: '100%',
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        const v = Math.round(this.progress() * 100);
        if (countEl) countEl.textContent = v;
      },
    }, 0.2);

    tl.to(words, {
      y: -120,
      duration: 0.7,
      ease: 'expo.in',
      stagger: 0.03,
    }, '+=0.25');
  }

  /* ---------------------------------------------------------------
     2. LENIS SMOOTH SCROLL
     --------------------------------------------------------------- */
  let lenis = null;
  function initLenis() {
    if (reduceMotion || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // anchor links → lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -20, duration: 1.3 });
            // close mobile menu if open
            closeMobileMenu();
          }
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     3. CUSTOM CURSOR
     --------------------------------------------------------------- */
  function initCursor() {
    if (isTouch || reduceMotion) return;
    const cursor = document.querySelector('[data-cursor]');
    if (!cursor) return;
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    window.addEventListener('mouseup', () => cursor.classList.remove('is-down'));

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('[data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  /* ---------------------------------------------------------------
     4. MAGNETIC BUTTONS
     --------------------------------------------------------------- */
  function initMagnetic() {
    if (isTouch || reduceMotion) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------------
     5. LINE-MASK + BLOCK REVEALS  (class-based — robust)
     --------------------------------------------------------------- */
  // Assign --line-i to each line inside a title so CSS can stagger them
  function indexTitleLines(title) {
    title.querySelectorAll('.line').forEach((l, i) => l.style.setProperty('--line-i', i));
  }

  function revealTitle(title) {
    if (title.classList.contains('is-revealed')) return;
    indexTitleLines(title);
    title.classList.add('is-revealed');
  }

  function initReveals() {
    // Assign indices up front so delays are ready
    document.querySelectorAll('.section-title, .hero__title, .final__title').forEach(indexTitleLines);

    // Block reveals via IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('[data-reveal-block], [data-reveal-line]').forEach((el) => io.observe(el));

    // Section title line reveals — stagger via CSS when in view
    const titleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealTitle(entry.target);
            titleIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -5% 0px' }
    );
    document.querySelectorAll('.section-title, .final__title').forEach((t) => titleIO.observe(t));
  }

  function animateHero() {
    // Hero lines reveal shortly after preloader finishes (class-based, reliable)
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      indexTitleLines(heroTitle);
      requestAnimationFrame(() => revealTitle(heroTitle));
    }
    // hero sub-blocks fade in
    const io = new IntersectionObserver(() => {});
    document.querySelectorAll('.hero [data-reveal-block]').forEach((el) => {
      el.classList.add('is-in');
    });
    if (hasST) ScrollTrigger.refresh();
  }

  /* ---------------------------------------------------------------
     6. NAV — scrolled state + mobile menu
     --------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('[data-nav]');
    const burger = document.querySelector('[data-burger]');
    const menu = document.querySelector('[data-mobile-menu]');

    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && menu) {
      burger.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        menu.setAttribute('aria-hidden', !open);
        burger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (lenis) open ? lenis.stop() : lenis.start();
      });
    }
  }
  function closeMobileMenu() {
    const menu = document.querySelector('[data-mobile-menu]');
    const burger = document.querySelector('[data-burger]');
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    burger.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  /* ---------------------------------------------------------------
     7. HERO PARALLAX BLOBS
     --------------------------------------------------------------- */
  function initParallax() {
    if (reduceMotion || isTouch) return;
    const blobs = document.querySelectorAll('[data-parallax]');
    if (!blobs.length) return;
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      blobs.forEach((b) => {
        const depth = parseFloat(b.dataset.parallax) || 0.05;
        b.style.transform = `translate(${x * depth * 100}px, ${y * depth * 100}px)`;
      });
    });
  }

  /* ---------------------------------------------------------------
     8. STATS COUNTERS
     --------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const val = (target * eased).toFixed(decimals);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------------------------------------------------------------
     9. BEFORE / AFTER SLIDER
     --------------------------------------------------------------- */
  function initBeforeAfter() {
    const wrap = document.querySelector('[data-ba]');
    if (!wrap) return;
    const overlay = wrap.querySelector('[data-ba-overlay]');
    const handle = wrap.querySelector('[data-ba-handle]');
    let dragging = false;

    function setPos(clientX) {
      const r = wrap.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      overlay.style.width = pct + '%';
      handle.style.left = pct + '%';
    }

    const onDown = (e) => {
      dragging = true;
      setPos(e.touches ? e.touches[0].clientX : e.clientX);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      setPos(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => (dragging = false);

    handle.addEventListener('mousedown', onDown);
    handle.addEventListener('touchstart', onDown, { passive: false });
    wrap.addEventListener('mousedown', onDown);
    wrap.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    // intro animation
    if (hasGSAP && hasST && !reduceMotion) {
      gsap.set(overlay, { width: '100%' });
      gsap.set(handle, { left: '100%' });
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(overlay, {
            width: '50%',
            duration: 1.4,
            ease: 'expo.out',
          });
          gsap.to(handle, {
            left: '50%',
            duration: 1.4,
            ease: 'expo.out',
          });
        },
      });
    }
  }

  /* ---------------------------------------------------------------
     10. HORIZONTAL SHOWCASE
     --------------------------------------------------------------- */
  function initShowcase() {
    const section = document.querySelector('.showcase');
    const pin = document.querySelector('[data-showcase-pin]');
    const track = document.querySelector('[data-showcase-track]');
    const progress = document.querySelector('[data-showcase-progress]');
    if (!section || !pin || !track) return;

    // On mobile/native, fall back to native horizontal overflow scroll
    const desktop = window.matchMedia('(min-width: 769px)').matches;
    if (!desktop || !hasGSAP || !hasST || reduceMotion) {
      pin.style.height = 'auto';
      track.style.overflowX = 'auto';
      track.style.scrollSnapType = 'x mandatory';
      track.querySelectorAll('.case').forEach((c) => (c.style.scrollSnapAlign = 'start'));
      if (progress && progress.parentElement) progress.parentElement.style.display = 'none';
      return;
    }

    let scrollWidth = 0;
    function recalc() {
      scrollWidth = track.scrollWidth - window.innerWidth + 64; // gutter compensation
      if (scrollWidth < 0) scrollWidth = 0;
    }
    recalc();

    const st = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const x = -self.progress * scrollWidth;
        gsap.set(track, { x });
        if (progress) progress.style.width = self.progress * 100 + '%';
      },
    });

    window.addEventListener('resize', () => {
      recalc();
      st.refresh();
    });
  }

  /* ---------------------------------------------------------------
     11. FAQ accordion (native details, just close others on open)
     --------------------------------------------------------------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach((other) => { if (other !== item) other.open = false; });
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     12. LEAD MAGNET FORM (demo)
     --------------------------------------------------------------- */
  function initLeadForm() {
    const form = document.querySelector('[data-leadmag-form]');
    if (!form) return;
    const success = form.querySelector('[data-leadmag-success]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        if (success) {
          success.hidden = false;
          input.value = '';
          setTimeout(() => (success.hidden = true), 4000);
        }
      }
    });
  }

  /* ---------------------------------------------------------------
     INIT
     --------------------------------------------------------------- */
  function init() {
    initCursor();
    initMagnetic();
    initNav();
    initParallax();
    initCounters();
    initBeforeAfter();
    initFAQ();
    initLeadForm();
    initReveals();

    runPreloader(() => {
      document.body.classList.add('is-loaded');
      initLenis();
      initShowcase();
      animateHero();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
