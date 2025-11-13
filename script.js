// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
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
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    slideTexts.forEach(text => text.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current
    slides[index].classList.add('active');
    slideTexts[index].classList.add('active');
    dots[index].classList.add('active');
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

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause on hover
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

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
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
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

// Observe elements with animation
document.querySelectorAll('.value-card, .testimonial-card, .product-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll-to-top button logic
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
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

// Contact Form Handler (for contact page)
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Show success message
//         alert('Thank you! We will get back to you soon.');
        
//         // Reset form
//         contactForm.reset();
//     });
// }


// ✅ Final working version
// document.getElementById('contactForm').addEventListener('submit', async function(e) {
//   e.preventDefault();

//   const form = e.target;
//   const payload = {
//     name: form.name.value.trim(),
//     email: form.email.value.trim(),
//     phone: form.phone.value.trim(),
//     message: form.message.value.trim()
//   };

//   if (!payload.name || !payload.email || !payload.message) {
//     alert('Please fill name, email and message.');
//     return;
//   }

//   try {
//     const res = await fetch('https://script.google.com/macros/s/AKfycbxZ6E8nWvOLv4wy2q3J1wxcsdhcoi28SkaLYnyGv7dMxzKG5iMVi2-VWTD6uW-SE60_/exec', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });

//     const json = await res.json();

//     if (json.status === 'success') {
//       alert('Message sent — thanks!');
//       form.reset();
//     } else {
//       console.error(json);
//       alert('Server error: ' + (json.message || 'unknown'));
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Network or server error. Check console for details.');
//   }
// });


function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById('AKfycbzpyK27rIS9wICJz9RGzIwO-7RLaLScegQiZW1yoKEBfMetLw2xhOREQvusOsHWVYw_').getSheetByName('Responses');
    sheet.appendRow([new Date(), data.name, data.email, data.phone, data.message]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Data added' })
    ).setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// Handle preflight (OPTIONS) requests
function doGet(e) {
  return ContentService.createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
