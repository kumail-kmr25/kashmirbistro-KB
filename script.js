/* ========================================
   GOURMET BISTRO - JAVASCRIPT FUNCTIONALITY
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionalities
    initMobileNavigation();
    initStickyHeader();
    initSmoothScroll();
    initMenuTabs();
    initScrollAnimations();
    initBackToTop();
    initFormValidation();
    initCounterAnimation();
});

/* ===== MOBILE NAVIGATION ===== */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ===== STICKY HEADER ===== */
function initStickyHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== MENU TABS ===== */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get target panel
            const targetTab = this.getAttribute('data-tab');

            // Hide all panels
            menuPanels.forEach(panel => panel.classList.remove('active'));
            // Show target panel
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    // Add scroll-animate class to elements
    const elementsToAnimate = document.querySelectorAll(
        '.about-content, .menu-card, .gallery-item, .testimonial-card, .info-item, .contact-form-wrapper'
    );

    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animate');
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });
}

/* ===== BACK TO TOP BUTTON ===== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        }

        // Validate Phone
        if (!validatePhone(phoneInput.value.trim())) {
            showError(phoneInput);
            isValid = false;
        }

        // Validate Email (if provided)
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        }

        if (isValid) {
            // Show success message
            showFormSuccess();
            // Reset form
            form.reset();
        }
    });

    // Real-time validation
    [nameInput, phoneInput, emailInput].forEach(input => {
        input.addEventListener('input', function () {
            this.parentElement.classList.remove('error');
        });
    });
}

function showError(input) {
    input.parentElement.classList.add('error');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{8,}$/;
    return re.test(phone) && phone.trim() !== '';
}

function showFormSuccess() {
    // Create success modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 40px 50px;
        border-radius: 20px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: fadeInUp 0.5s ease;
    `;

    modal.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.8rem; margin-bottom: 10px;">Reservation Confirmed!</h3>
        <p style="font-size: 1rem; opacity: 0.9;">Thank you! We'll contact you shortly.</p>
    `;

    document.body.appendChild(modal);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    document.body.appendChild(overlay);

    // Remove modal after 3 seconds
    setTimeout(() => {
        modal.remove();
        overlay.remove();
    }, 3500);
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
    const counterElement = document.querySelector('.experience-badge .number');
    if (!counterElement) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counterElement, 15);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterElement);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

/* ===== GALLERY LIGHTBOX ===== */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
}

function openLightbox(src) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    lightbox.innerHTML = `
        <span style="position: absolute; top: 30px; right: 30px; color: white; font-size: 3rem; cursor: pointer; z-index: 10001;" onclick="this.parentElement.remove();">&times;</span>
        <img src="${src}" style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
    `;

    document.body.appendChild(lightbox);

    // Close on click outside
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            lightbox.remove();
        }
    });
}

// Initialize lightbox
initGalleryLightbox();

/* ===== PARALLAX EFFECT ON HERO ===== */
function initParallax() {
    window.addEventListener('scroll', function () {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax on larger screens
if (window.innerWidth > 768) {
    initParallax();
}

/* ===== TESTIMONIALS AUTO-SCROLL ===== */
function initTestimonialAutoScroll() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonialCards.length === 0) return;

    // Highlight card on interval
    setInterval(() => {
        testimonialCards.forEach((card, index) => {
            card.style.transform = index === currentIndex ? 'scale(1.05)' : 'scale(1)';
            card.style.boxShadow = index === currentIndex ? '0 25px 50px rgba(0,0,0,0.3)' : 'var(--shadow-md)';
        });

        currentIndex = (currentIndex + 1) % testimonialCards.length;
    }, 4000);
}

// Initialize testimonial auto-scroll
initTestimonialAutoScroll();

/* ===== LAZY LOAD IMAGES ===== */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ===== CURRENCY FORMATTER ===== */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

/* ===== NAVBAR BRAND EFFECT ===== */
function initNavbarBrandEffect() {
    const logo = document.querySelector('.nav-logo');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            logo.style.transform = 'scale(0.95)';
        } else {
            logo.style.transform = 'scale(1)';
        }
    });
}

initNavbarBrandEffect();

/* ===== MENU ITEM QUICK VIEW ===== */
function initMenuQuickView() {
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('dblclick', function () {
            const name = this.querySelector('h4').textContent;
            const price = this.querySelector('.price').textContent;
            const desc = this.querySelector('p').textContent;
            const img = this.querySelector('img').src;

            openMenuModal(name, price, desc, img);
        });
    });
}

function openMenuModal(name, price, desc, img) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div style="background: white; max-width: 600px; width: 100%; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; animation: fadeInUp 0.4s ease;">
            <div style="position: relative;">
                <img src="${img}" style="width: 100%; height: 250px; object-fit: cover;">
                <span onclick="this.parentElement.parentElement.parentElement.remove();" style="position: absolute; top: 15px; right: 15px; width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.5rem; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">&times;</span>
            </div>
            <div style="padding: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="font-size: 1.8rem; color: #1a1a2e; margin: 0;">${name}</h3>
                    <span style="font-size: 2rem; font-weight: 700; color: #c17f3e; font-family: 'Playfair Display', serif;">${price}</span>
                </div>
                <p style="color: #6b6b6b; font-size: 1.05rem; line-height: 1.8; margin-bottom: 25px;">${desc}</p>
                <button onclick="alert('Item added to order!')" style="width: 100%; padding: 18px; background: linear-gradient(135deg, #c17f3e 0%, #d4965a 100%); color: white; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-shopping-cart"></i> Order Now
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });
}

initMenuQuickView();

/* ===== CONSOLE WELCOME MESSAGE ===== */
console.log('%c🍽️ Gourmet Bistro Website', 'font-size: 24px; font-weight: bold; color: #c17f3e;');
console.log('%cWelcome to our fine dining experience!', 'font-size: 14px; color: #1a1a2e;');
console.log('%cDesigned with ❤️ for local businesses', 'font-size: 12px; color: #6b6b6b;');
