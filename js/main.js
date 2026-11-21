// Kirpa Accountancy & Advisory Ltd — site behaviour
(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header shadow once the page scrolls
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form validation
  var form = document.getElementById('enquiry-form');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var validate = function (field) {
      var input = field.querySelector('input, select, textarea');
      if (!input || !input.hasAttribute('required')) return true;
      var value = input.value.trim();
      var ok = value.length > 0 && (input.type !== 'email' || emailRe.test(value));
      field.classList.toggle('invalid', !ok);
      return ok;
    };

    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, select, textarea');
      if (input) input.addEventListener('blur', function () { validate(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('.field').forEach(function (field) {
        if (!validate(field)) valid = false;
      });
      if (!valid) {
        var first = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (first) first.focus();
        return;
      }
      // TODO: connect to a form handler (e.g. Formspree, Netlify Forms or your own endpoint).
      form.reset();
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('show');
        success.focus();
      }
    });
  }
})();
