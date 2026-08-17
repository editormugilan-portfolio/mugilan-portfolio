document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================================
     1. PAGE LOAD — Nav + Hero entrance (immediate, no scroll needed)
     ======================================================================== */
  
  // Nav slides down
  gsap.from('nav', {
    y: -50, opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  });

  // Hero title — dramatic scale entrance
  const heroTitle = document.querySelector('.hero-content h1, .gsap-hero-text');
  if (heroTitle) {
    gsap.from(heroTitle, {
      y: 80, opacity: 0, scale: 0.95,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.5
    });
  }

  // Hero subtitle + paragraph + buttons — staggered entrance
  const heroChildren = document.querySelectorAll('.hero-content .hero-subtitle, .hero-content p, .hero-buttons');
  if (heroChildren.length) {
    gsap.fromTo(heroChildren, 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8
      }
    );
  }

  // Contact page hero text (no .hero section, so target directly)
  const contactTitle = document.querySelector('.contact-section h1');
  if (contactTitle && !document.querySelector('.hero')) {
    gsap.from(contactTitle, {
      y: 80, opacity: 0, scale: 0.95,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.4
    });
  }

  // Work page title
  const workTitle = document.querySelector('section > .reveal > h1');
  if (workTitle && !document.querySelector('.hero')) {
    gsap.set(workTitle.closest('.reveal'), { opacity: 1, visibility: 'visible' });
    gsap.from(workTitle, {
      y: 80, opacity: 0, scale: 0.95,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.4
    });
    const workSubtitle = workTitle.parentElement.querySelector('p');
    if (workSubtitle) {
      gsap.from(workSubtitle, {
        y: 30, opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      });
    }
  }

  /* ========================================================================
     2. SCROLL REVEALS — Elements animate in as you scroll down
     ======================================================================== */

  // Make hero content visible immediately (it's animated by the hero entrance above)
  gsap.set('.hero-content', { opacity: 1, visibility: 'visible' });

  // All .reveal elements that scroll into view
  document.querySelectorAll('.reveal').forEach(el => {
    // Skip if already in viewport (hero content)
    if (el.classList.contains('hero-content')) return;
    
    gsap.fromTo(el,
      { opacity: 0, y: 50, visibility: 'hidden' },
      {
        opacity: 1, y: 0, visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  /* ========================================================================
     3. SECTION HEADINGS — Slide in with character
     ======================================================================== */
  document.querySelectorAll('h2').forEach(h2 => {
    // Skip footer headings
    if (h2.closest('.cinematic-footer')) return;
    
    gsap.from(h2, {
      x: -40, opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: h2,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ========================================================================
     4. IMAGES — Subtle scale reveal
     ======================================================================== */
  document.querySelectorAll('.about-image, .contact-image').forEach(img => {
    gsap.from(img, {
      scale: 1.1, opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 80%',
        once: true
      }
    });
  });

  /* ========================================================================
     5. VIDEO CARDS — Staggered grid entrance
     ======================================================================== */
  document.querySelectorAll('.work-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.video-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95, visibility: 'hidden' },
        {
          opacity: 1, y: 0, scale: 1, visibility: 'visible',
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  });

  /* ========================================================================
     6. TOOL TAGS — Pop in one by one
     ======================================================================== */
  const toolTags = document.querySelectorAll('.tool-tag');
  if (toolTags.length) {
    gsap.from(toolTags, {
      scale: 0, opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: toolTags[0].parentElement,
        start: 'top 80%',
        once: true
      }
    });
  }

  /* ========================================================================
     7. CONTACT LINKS — Stagger slide in (REMOVED due to rendering bug)
     ======================================================================== */
  // Animations removed for .contact-link to prevent color/opacity issues

  /* ========================================================================
     8. CONTACT FORM — Fade up
     ======================================================================== */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.from(contactForm, {
      y: 40, opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactForm,
        start: 'top 85%',
        once: true
      }
    });
  }

  /* ========================================================================
     9. PARALLAX — Subtle depth on scroll for images
     ======================================================================== */
  document.querySelectorAll('.about-image img, .contact-image img').forEach(img => {
    gsap.to(img, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  /* ========================================================================
     10. CINEMATIC FOOTER ANIMATIONS
     ======================================================================== */
  const footerWrapper = document.querySelector('.footer-reveal-container');
  const giantText = document.querySelector('.footer-giant-bg-text');
  const staggers = document.querySelectorAll('.footer-stagger');

  if (footerWrapper) {
    if (giantText) {
      gsap.fromTo(giantText,
        { y: '10vh', scale: 0.8, opacity: 0 },
        {
          y: '0vh', scale: 1, opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerWrapper,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          }
        }
      );
    }

    if (staggers.length > 0) {
      gsap.fromTo(staggers,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerWrapper,
            start: 'top 40%',
            end: 'bottom bottom',
            scrub: 1,
          }
        }
      );
    }
  }

  /* ========================================================================
     11. MAGNETIC BUTTON EFFECT
     ======================================================================== */
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.4, y: y * 0.4,
        rotationX: -y * 0.15, rotationY: x * 0.15,
        scale: 1.05,
        ease: 'power2.out',
        duration: 0.4,
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        rotationX: 0, rotationY: 0,
        scale: 1,
        ease: 'elastic.out(1, 0.3)',
        duration: 1.2,
      });
    });
  });

  /* ========================================================================
     12. CTA BUTTON — Subtle pulse on idle
     ======================================================================== */
  const ctaBtn = document.querySelector('.cta-button');
  if (ctaBtn) {
    gsap.to(ctaBtn, {
      scale: 1.03,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2.5
    });
  }

  /* ========================================================================
     13. VIDEO PLAYBACK LOGIC
     ======================================================================== */
  const isTouchDevice = () => (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  );

  document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    if (!video) return;

    const playVideo = () => {
      video.play().then(() => container.classList.add('is-playing'))
        .catch(() => {});
    };
    const pauseVideo = () => {
      video.pause();
      container.classList.remove('is-playing');
    };

    if (isTouchDevice()) {
      new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting ? playVideo() : pauseVideo());
      }, { threshold: 0.6 }).observe(container);
    } else {
      container.addEventListener('mouseenter', playVideo);
      container.addEventListener('mouseleave', pauseVideo);
    }

    const unmuteBtn = container.querySelector('.unmute-btn');
    if (unmuteBtn) {
      unmuteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        video.muted = !video.muted;
        unmuteBtn.innerHTML = video.muted
          ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L8 8H4v8h4l4 4V4zm4.5 4v8c1.33-1 2.25-2.6 2.25-4.5S17.83 7 16.5 8zM16.5 2c3.16 1.8 5.25 5.27 5.25 9.5s-2.09 7.7-5.25 9.5v-2.1c2.1-1.48 3.5-3.9 3.5-6.9s-1.4-5.42-3.5-6.9V2z"/></svg>';
      });
    }
  });

  // Hero Video Unmute Logic
  const heroVideo = document.querySelector('.hero-video-wrapper video');
  const heroUnmuteBtn = document.getElementById('hero-unmute-btn');
  if (heroVideo && heroUnmuteBtn) {
    heroUnmuteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      heroVideo.muted = !heroVideo.muted;
      heroUnmuteBtn.innerHTML = heroVideo.muted
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L8 8H4v8h4l4 4V4zm4.5 4v8c1.33-1 2.25-2.6 2.25-4.5S17.83 7 16.5 8zM16.5 2c3.16 1.8 5.25 5.27 5.25 9.5s-2.09 7.7-5.25 9.5v-2.1c2.1-1.48 3.5-3.9 3.5-6.9s-1.4-5.42-3.5-6.9V2z"/></svg>';
    });
  }
});
