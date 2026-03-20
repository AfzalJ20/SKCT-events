// ================================================
// Navigation & Scroll Effects
// ================================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

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

// ================================================
// Registration Form Handling
// ================================================

const regForm = document.getElementById('regForm');

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(regForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateRegistrationForm(data)) {
            return;
        }
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        regForm.reset();
    });
}

function validateRegistrationForm(data) {
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate event selection
    if (!data.event) {
        alert('Please select an event');
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'modal active';
    successModal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2>Registration Successful!</h2>
            <p style="color: var(--medium-gray); margin-bottom: 2rem;">
                Thank you for registering! You will receive a payment QR code and event pass via email within 5 minutes.
            </p>
            <div style="background: var(--off-white); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Next Steps:</h3>
                <ol style="text-align: left; color: var(--medium-gray); line-height: 1.8;">
                    <li>Check your email for the payment QR code</li>
                    <li>Complete the payment within 24 hours</li>
                    <li>Your event pass will be sent after payment confirmation</li>
                    <li>Show the pass at the event venue</li>
                </ol>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="submit-btn" style="margin-top: 1rem;">
                <span>Got it!</span>
            </button>
        </div>
    `;
    document.body.appendChild(successModal);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        successModal.remove();
    }, 10000);
}

// ================================================
// Login Modal
// ================================================

const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const closeModal = document.querySelector('.close-modal');

// Open login modal
document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
    });
});

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
}

// Close modal on outside click
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
}

// Handle login form
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login
        alert('Login functionality will be connected to backend. For demo purposes, login successful!');
        loginModal.classList.remove('active');
        loginForm.reset();
    });
}

// ================================================
// Feedback Form Handling
// ================================================

const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        alert('Thank you for your feedback! We appreciate your input and will respond within 24 hours.');
        
        // Reset form
        feedbackForm.reset();
    });
}

// ================================================
// Scroll Animations
// ================================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.event-card, .perk-card, .winner-card, .testimonial-card, .contact-card, .terms-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ================================================
// Event Card Hover Effects
// ================================================

const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================================
// Gallery Hover Effect
// ================================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.transform = 'translateY(0)';
        overlay.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.transform = 'translateY(20px)';
        overlay.style.opacity = '0';
    });
});

// ================================================
// Dynamic Stats Counter Animation
// ================================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(start));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const values = [48, 50, 15, 500]; // hrs, K, events, participants
                setTimeout(() => {
                    stat.textContent = '0';
                    if (index === 0) stat.textContent = '48hrs';
                    else if (index === 1) stat.textContent = '₹50K+';
                    else animateCounter(stat, values[index], 1500);
                }, index * 100);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ================================================
// Form Input Animations
// ================================================

const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 0 20px rgba(6, 255, 165, 0.3)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// ================================================
// Button Ripple Effect
// ================================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const rippleEffect = button.querySelector('.ripple');
    if (rippleEffect) {
        rippleEffect.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .event-btn, .submit-btn');

buttons.forEach(button => {
    // Add relative positioning if not already set
    if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
    
    button.addEventListener('click', createRipple);
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ================================================
// Parallax Effect for Hero
// ================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGlows = document.querySelectorAll('.hero-glow');
    
    heroGlows.forEach((glow, index) => {
        const speed = 0.5 + (index * 0.1);
        glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ================================================
// Toast Notification System
// ================================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#06FFA5' : '#0066FF'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

// ================================================
// Image Lazy Loading Simulation
// ================================================

// Simulate image loading for gallery items
const loadImage = (item, index) => {
    setTimeout(() => {
        item.style.background = `linear-gradient(135deg, 
            ${['#0066FF', '#9D4EDD', '#FF006E', '#06FFA5'][index % 4]}, 
            ${['#9D4EDD', '#FF006E', '#FFB703', '#00B4D8'][index % 4]})`;
    }, index * 100);
};

galleryItems.forEach((item, index) => {
    loadImage(item, index);
});

// ================================================
// Keyboard Navigation Support
// ================================================

document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => modal.classList.remove('active'));
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ================================================
// Print Event Details Function
// ================================================

function printEventDetails(eventName) {
    window.print();
}

// ================================================
// Copy to Clipboard Function
// ================================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// ================================================
// Loading Animation
// ================================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ================================================
// Performance Optimization
// ================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    updateActiveNav();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ================================================
// Console Welcome Message
// ================================================

console.log('%c🎉 Welcome to SKCT Events! 🎉', 'color: #0066FF; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for students, by students', 'color: #06FFA5; font-size: 14px;');
console.log('%cInterested in the code? Check out our GitHub!', 'color: #9D4EDD; font-size: 12px;');

// ================================================
// Initialize
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ SKCT Events website loaded successfully!');
    
    // Show welcome toast
    setTimeout(() => {
        showToast('Welcome to SKCT Events! 🎉', 'success');
    }, 1000);
});
