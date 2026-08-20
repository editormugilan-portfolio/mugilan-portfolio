document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  const hasScroll = typeof ScrollTrigger !== 'undefined';

  const showAll = () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.line-inner').forEach((el) => {
      el.style.transform = 'none';
    });
  };

  if (!hasGsap || reduceMotion) {
    showAll();
    bindPlayback();
    return;
  }

  if (hasScroll) gsap.registerPlugin(ScrollTrigger);
  const ease = 'power3.out';

  gsap.from('nav', {
    y: -24,
    opacity: 0,
    duration: 0.7,
    ease,
    delay: 0.1
  });

  const heroRedesign = document.querySelector('.hero-redesign');
  if (heroRedesign) {
    const tl = gsap.timeline({ defaults: { ease } });
    tl.from('.main-logo-img', { x: -36, opacity: 0, duration: 1.1 }, 0.15);
    tl.from('.hero-title-col > *', { x: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.28);
    tl.from('.experience-col > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.55);
    tl.from('.hero-headshot', { y: 24, opacity: 0, duration: 0.9 }, 0.85);
    tl.from('.stat-block, .stat-divider', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 1);
  }

  const heroTitle = document.querySelector('.hero-content h1, .gsap-hero-text');
  if (heroTitle && !heroRedesign) {
    gsap.from(heroTitle, {
      y: 48,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.25
    });
  }

  const contactTitle = document.querySelector('.contact-section h1');
  if (contactTitle && !document.querySelector('.hero') && !heroRedesign) {
    gsap.from(contactTitle, {
      y: 48,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.2
    });
  }

  const workTitle = document.querySelector('section > .reveal > h1');
  if (workTitle && !document.querySelector('.hero') && !heroRedesign) {
    gsap.from(workTitle, {
      y: 48,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.2
    });
    const workSubtitle = workTitle.parentElement.querySelector('p');
    if (workSubtitle) {
      gsap.from(workSubtitle, {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease,
        delay: 0.4
      });
    }
  }

  if (hasScroll) {
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.closest('.hero-redesign') || el.classList.contains('video-card')) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    document.querySelectorAll('.work-grid').forEach((grid) => {
      const cards = grid.querySelectorAll('.video-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: Math.min(i * 0.08, 0.4),
            ease,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true
            }
          }
        );
      });
    });

    document.querySelectorAll('.about-image, .contact-image').forEach((img) => {
      gsap.from(img, {
        opacity: 0,
        y: 24,
        duration: 1,
        ease,
        scrollTrigger: {
          trigger: img,
          start: 'top 82%',
          once: true
        }
      });
    });

    const toolTags = document.querySelectorAll('.tool-tag');
    if (toolTags.length) {
      gsap.from(toolTags, {
        opacity: 0,
        y: 8,
        duration: 0.4,
        stagger: 0.06,
        ease,
        scrollTrigger: {
          trigger: toolTags[0].parentElement,
          start: 'top 82%',
          once: true
        }
      });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      gsap.from(contactForm, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease,
        scrollTrigger: {
          trigger: contactForm,
          start: 'top 85%',
          once: true
        }
      });
    }
  }

  const footerWrapper = document.querySelector('.footer-reveal-container');
  const giantText = document.querySelector('.footer-giant-bg-text');
  if (footerWrapper && hasScroll && giantText) {
    gsap.fromTo(
      giantText,
      { y: 40, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: footerWrapper,
          start: 'top 90%',
          end: 'bottom bottom',
          scrub: 1
        }
      }
    );
  }

  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      });
    });
  });

  const normalFooter = document.querySelector('.normal-footer');
  if (normalFooter && hasScroll) {
    gsap.from(normalFooter.querySelectorAll('.footer-left, .footer-right, .footer-bottom'), {
      scrollTrigger: {
        trigger: normalFooter,
        start: 'top 95%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  bindPlayback();

  function bindPlayback() {
    const isTouchDevice = () =>
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);

    const mutedIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    const unmutedIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L8 8H4v8h4l4 4V4zm4.5 4v8c1.33-1 2.25-2.6 2.25-4.5S17.83 7 16.5 8zM16.5 2c3.16 1.8 5.25 5.27 5.25 9.5s-2.09 7.7-5.25 9.5v-2.1c2.1-1.48 3.5-3.9 3.5-6.9s-1.4-5.42-3.5-6.9V2z"/></svg>';

    document.querySelectorAll('.video-container').forEach((container) => {
      const video = container.querySelector('video');
      if (!video) return;

      const playVideo = () => {
        video.play().then(() => container.classList.add('is-playing')).catch(() => {});
      };
      const pauseVideo = () => {
        video.pause();
        container.classList.remove('is-playing');
      };

      if (isTouchDevice()) {
        new IntersectionObserver((entries) => {
          entries.forEach((e) => (e.isIntersecting ? playVideo() : pauseVideo()));
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
          unmuteBtn.innerHTML = video.muted ? mutedIcon : unmutedIcon;
        });
      }
    });

    const heroVideos = document.querySelectorAll('.hero-video-wrapper video');
    const heroUnmuteBtns = document.querySelectorAll('.hero-unmute-btn-class');

    heroUnmuteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const first = heroVideos[0];
        if (!first) return;
        const nextMuted = !first.muted;
        heroVideos.forEach((v) => {
          v.muted = nextMuted;
        });
        const icon = nextMuted ? mutedIcon : unmutedIcon;
        heroUnmuteBtns.forEach((b) => {
          b.innerHTML = icon;
          b.setAttribute('aria-label', nextMuted ? 'Unmute' : 'Mute');
        });
      });
    });
  }
});
