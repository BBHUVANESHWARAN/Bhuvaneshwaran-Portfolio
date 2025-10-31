
(function () {
  // Mobile menu toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function () {
      const navLinks = document.querySelector('.nav-links');
      if (!navLinks) return;
      navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
          const navLinks = document.querySelector('.nav-links');
          if (navLinks) navLinks.style.display = 'none';
        }
      }
    });
  });

  // Add scroll effect to header
  window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
    } else {
      header.style.backgroundColor = 'var(--dark)';
    }
  });

  // Contact form AJAX submission
  const form = document.getElementById('contactForm');
  if (form) {
    const statusEl = document.getElementById('formStatus');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };
      statusEl.textContent = 'Sending...';
      try {
        const resp = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (!resp.ok || !data.ok) throw new Error(data.error || 'Failed to send');
        statusEl.textContent = data.msg || 'Sent!';
        form.reset();
      } catch (err) {
        statusEl.textContent = 'Error: ' + err.message;
      }
    });
  }
})();
