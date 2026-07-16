// Hegland's Creative Landscapes — site interactions

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header transforms on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('mobile-open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Estimate forms: AJAX submit with inline confirmation (Formspree)
  document.querySelectorAll('.fs-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORM_ID')) {
        console.warn('Formspree form ID not set. Update the form "action" in index.html.');
        return; // let it submit normally so the gap is visible during testing
      }
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const note = form.querySelector('.form-note');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (response.ok) {
          form.reset();
          if (note) {
            note.textContent = "Thanks! Your request has been sent — we'll be in touch soon.";
            note.style.color = '#3d5a44';
            note.style.fontWeight = '600';
          }
        } else if (note) {
          note.textContent = 'Something went wrong. Please call us at (507) 273-2360.';
          note.style.color = '#8a3f35';
        }
      } catch (err) {
        if (note) {
          note.textContent = 'Something went wrong. Please call us at (507) 273-2360.';
          note.style.color = '#8a3f35';
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
});
