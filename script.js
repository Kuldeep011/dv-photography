
// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
hamburger.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        navMenu.classList.toggle('active');
    }
});

// Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(n) {
    slideIndex = n;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === slideIndex);
        slide.setAttribute('aria-hidden', i !== slideIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIndex);
        dot.setAttribute('aria-selected', i === slideIndex);
        dot.tabIndex = i === slideIndex ? 0 : -1;
    });
}

prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
    dot.addEventListener('keypress', e => {
        if (e.key === 'Enter') showSlide(i);
    });
});

// Auto slide every 6 seconds
setInterval(() => showSlide(slideIndex + 1), 6000);
showSlide(0);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.querySelector('.close-lightbox');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    closeLightboxBtn.focus();
}
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}
closeLightboxBtn.addEventListener('click', closeLightbox);
closeLightboxBtn.addEventListener('keypress', e => {
    if (e.key === 'Enter') closeLightbox();
});
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// Contact form (mock sending with feedback)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation (already required in inputs)
    const name = contactForm.user_name.value.trim();
    const email = contactForm.user_email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
        showMessage('Please fill in all fields.', false);
        return;
    }

    // Simulate sending message
    showMessage('Sending message...', true);
    setTimeout(() => {
        showMessage('Message sent successfully!', true);
        contactForm.reset();
    }, 1500);
});

function showMessage(text, success) {
    formMessage.textContent = text;
    formMessage.className = 'message ' + (success ? 'success' : 'error');
    formMessage.style.display = 'block';
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}
