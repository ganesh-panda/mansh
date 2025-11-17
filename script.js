// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Hero Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slideTexts = document.querySelectorAll('.slide-text');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (totalSlides === 0) return;

        // Prevent out-of-range index
        index = (index + totalSlides) % totalSlides;

        slides.forEach(slide => slide.classList.remove('active'));
        slideTexts.forEach(text => text.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) slides[index].classList.add('active');
        if (slideTexts[index]) slideTexts[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Navigation areas
    const prevNav = document.querySelector('.carousel-nav.prev');
    const nextNav = document.querySelector('.carousel-nav.next');

    if (prevNav) prevNav.addEventListener('click', prevSlide);
    if (nextNav) nextNav.addEventListener('click', nextSlide);

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play carousel (only if slides exist)
    let autoPlayInterval = null;
    if (totalSlides > 0) {
        showSlide(0);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel && autoPlayInterval) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.value-card, .testimonial-card, .product-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Scroll-to-top button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Process Section Carousel
    const processSlides = document.querySelectorAll('.process-slide');
    const processPrevBtn = document.querySelector('.process-nav.prev');
    const processNextBtn = document.querySelector('.process-nav.next');
    let currentProcessSlide = 0;

    function showProcessSlide(index) {
        if (processSlides.length === 0) return;
        index = (index + processSlides.length) % processSlides.length;

        processSlides.forEach(slide => slide.classList.remove('active'));
        processSlides[index].classList.add('active');
    }

    if (processPrevBtn && processNextBtn && processSlides.length > 0) {
        processPrevBtn.addEventListener('click', () => {
            currentProcessSlide = (currentProcessSlide - 1 + processSlides.length) % processSlides.length;
            showProcessSlide(currentProcessSlide);
        });

        processNextBtn.addEventListener('click', () => {
            currentProcessSlide = (currentProcessSlide + 1) % processSlides.length;
            showProcessSlide(currentProcessSlide);
        });
    }
});
