/**
 * Sreya Sunil Kumar - Portfolio Application Script
 * Vanilla JavaScript (ES6+) for theme toggling, mobile menu,
 * active navigation tracking, and client-side form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode with Persistence)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Determine initial theme: localStorage > system preference > default dark
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Accessible Keyboard Navigation
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggleBtn.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll (IntersectionObserver)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 4. Back to Top Button
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Contact Form Validation & Anti-Spam Security
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const honeypotInput = document.getElementById('website_hp');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset feedback
      clearErrors();
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';

      // Security: Honeypot verification (Bots auto-fill hidden fields; humans do not)
      if (honeypotInput && honeypotInput.value.trim() !== '') {
        console.warn('Spam submission detected and blocked.');
        showFeedback('Thank you for your message!', 'success');
        contactForm.reset();
        return;
      }

      let isValid = true;

      // Validate Name
      const nameValue = nameInput ? nameInput.value.trim() : '';
      if (!nameValue || nameValue.length < 2) {
        markError(nameInput);
        isValid = false;
      }

      // Validate Email (RFC 5322 regex approximation)
      const emailValue = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue || !emailRegex.test(emailValue)) {
        markError(emailInput);
        isValid = false;
      }

      // Validate Message length
      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (!messageValue || messageValue.length < 10) {
        markError(messageInput);
        isValid = false;
      }

      if (!isValid) {
        showFeedback('Please correct the highlighted fields before submitting.', 'error');
        return;
      }

      // Simulation of successful secure client submission
      // Note: In deployment, connect this to Web3Forms / Formspree or your own backend API
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
      }

      setTimeout(() => {
        showFeedback('Thank you, Sreya! Your message has been received.', 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Message';
        }
      }, 800);
    });

    // Realtime error clearing on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const parentGroup = input.closest('.form-group');
          if (parentGroup && parentGroup.classList.contains('has-error')) {
            parentGroup.classList.remove('has-error');
          }
        });
      }
    });
  }

  function markError(inputElement) {
    if (!inputElement) return;
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.add('has-error');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.form-group.has-error').forEach((group) => {
      group.classList.remove('has-error');
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
  }

  // -------------------------------------------------------------------------
  // 6. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});
