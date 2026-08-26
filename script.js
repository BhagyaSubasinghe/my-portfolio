// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Close mobile nav when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact Form via EmailJS Integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const EMAILJS_CONFIG = {
    publicKey: 'ZMSHNazqKnQqHc71x',
    serviceId: 'service_d2nb0zo',
    templateId: 'template_nrhf8xn'
  };

  if (window.emailjs && EMAILJS_CONFIG.publicKey) {
    window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const statusText = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      statusText.textContent = 'Please fill out all fields.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusText.textContent = 'Sending your message...';

    window.emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        to_email: 'chamodi2002bhagya@gmail.com'
      })
      .then(() => {
        statusText.textContent = 'Message sent successfully!';
        contactForm.reset();
      })
      .catch(() => {
        statusText.textContent = 'Failed to send message. Please try again.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  });
}