// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth'
        });

        if (navLinks) {
            navLinks.classList.remove('open');
        }
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Simple fade-in animation for sections
const sections = document.querySelectorAll('section');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
}

// Contact form via EmailJS (direct send, no custom backend)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const EMAILJS_CONFIG = {
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        serviceId: 'YOUR_EMAILJS_SERVICE_ID',
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
    };

    const isEmailJsConfigured =
        EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
        EMAILJS_CONFIG.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
        EMAILJS_CONFIG.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID';

    if (window.emailjs && isEmailJsConfigured) {
        window.emailjs.init({
            publicKey: EMAILJS_CONFIG.publicKey
        });
    }

    contactForm.addEventListener('submit', function(e){
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const statusText = document.getElementById('form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        if (!nameInput || !emailInput || !messageInput) {
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            if (statusText) {
                statusText.textContent = 'Please fill all fields before sending.';
            }
            return;
        }

        if (!window.emailjs || !isEmailJsConfigured) {
            if (statusText) {
                statusText.textContent = 'Email form is not configured yet. Please add your EmailJS keys in script.js.';
            }
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        if (statusText) {
            statusText.textContent = 'Sending your message...';
        }

        window.emailjs
            .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'chamodi2002bhagya@gmail.com'
            })
            .then(() => {
                if (statusText) {
                    statusText.textContent = 'Message sent successfully. Thank you!';
                }
                contactForm.reset();
            })
            .catch(() => {
                if (statusText) {
                    statusText.textContent = 'Message failed to send. Please try again.';
                }
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            });
    });
}


