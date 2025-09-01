// Burger menu for mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple fade-in animation for sections
const sections = document.querySelectorAll('section');

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

// Contact form alert
document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you for your message!');
});


