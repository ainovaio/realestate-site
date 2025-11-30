// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Dropdown Menu Functionality
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Service Card Hover Animation
const serviceCards = document.querySelectorAll('.service-card[data-animate="card"]');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

const counters = document.querySelectorAll('.stat-number[data-target]');
counters.forEach(counter => counterObserver.observe(counter));

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterForm.reset();
    });
}

// Chat Functionality
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatBox.classList.add('active');
        chatButton.style.display = 'none';
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatBox.classList.remove('active');
        chatButton.style.display = 'flex';
    });
}

// Chat send message
const chatFooter = document.querySelector('.chat-footer');
if (chatFooter) {
    const chatInput = chatFooter.querySelector('input');
    const chatSendBtn = chatFooter.querySelector('button');
    const chatBody = document.querySelector('.chat-body');

    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.innerHTML = `<p>${message}</p>`;
            chatBody.appendChild(userMsg);
            
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.innerHTML = `<p>Thank you for your message! Our team will respond shortly.</p>`;
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    };

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Image Carousel for Property Listings
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(index) {
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Auto-advance carousel
if (slides.length > 0) {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Carousel indicators click
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Filter Counter Functions
function incrementCounter(id, step = 1) {
    const input = document.getElementById(id);
    if (input) {
        input.value = parseInt(input.value) + step;
    }
}

function decrementCounter(id, step = 1) {
    const input = document.getElementById(id);
    if (input && parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - step;
    }
}

// Property Detail Page - Image Gallery
let currentPropertyImage = 0;
const propertyImages = [
    'images/property1.webp',
    'images/property2.webp'
];

function changePropertyImage(direction) {
    currentPropertyImage += direction;
    if (currentPropertyImage < 0) currentPropertyImage = propertyImages.length - 1;
    if (currentPropertyImage >= propertyImages.length) currentPropertyImage = 0;
    
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = propertyImages[currentPropertyImage];
    }
    
    updateThumbnails();
}

function setPropertyImage(index) {
    currentPropertyImage = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = propertyImages[index];
    }
    updateThumbnails();
}

function updateThumbnails() {
    const thumbs = document.querySelectorAll('.gallery-thumbs img');
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentPropertyImage);
    });
}

// Contact Modal
function showContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (modal && e.target === modal) {
        closeContactModal();
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });
}

// Listing Form Submission
const listingForm = document.getElementById('listingForm');
if (listingForm) {
    listingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success modal
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.add('active');
        }
        
        // Reset form
        listingForm.reset();
        
        // Clear image preview
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.innerHTML = '';
        }
    });
}

// Close success modal
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
    }
    // Redirect to home page
    window.location.href = 'index.html';
}

// File Upload Preview
const fileInput = document.getElementById('propertyImages');
if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        const preview = document.getElementById('imagePreview');
        
        if (preview) {
            preview.innerHTML = '';
            
            files.slice(0, 5).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const div = document.createElement('div');
                        div.className = 'preview-item';
                        div.innerHTML = `
                            <img src="${e.target.result}" alt="Preview ${index + 1}">
                            <button type="button" class="remove-image" onclick="removeImage(${index})">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        preview.appendChild(div);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    });
}

// Remove image from preview
function removeImage(index) {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        const items = preview.querySelectorAll('.preview-item');
        if (items[index]) {
            items[index].remove();
        }
    }
}

// Click on file upload box to trigger file input
const fileUploadBox = document.querySelector('.file-upload-box');
if (fileUploadBox && fileInput) {
    fileUploadBox.addEventListener('click', () => {
        fileInput.click();
    });
}

// Smooth Scroll for Anchor Links
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

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone);
}

// Add active class to current page in navigation
const currentLocation = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-card, .property-card, .testimonial-card').forEach(el => {
    animateOnScroll.observe(el);
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Back to Top Button (if implemented)
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

console.log('WeHomes website loaded successfully!');

// Loader Script
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 800); // Loader shows for 800ms after page loads
});