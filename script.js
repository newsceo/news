
js_code = '''// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 800);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HERO PARTICLES ANIMATION
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function revealOnScroll() {
    const elements = document.querySelectorAll(
        '.story-content p, .highlight-box, .quote-block, .reaction-card, .timeline-item, .claim-item, .context-card'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with hidden state
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.story-content p, .highlight-box, .quote-block, .reaction-card, .timeline-item, .claim-item, .context-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ========================================
// GALLERY IMAGE HOVER EFFECT
// ========================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.style.zIndex = '1';
        }, 300);
    });
});

// ========================================
// TIMELINE MARKER ACTIVE STATE
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');

function updateTimelineMarkers() {
    timelineItems.forEach((item, index) => {
        const marker = item.querySelector('.timeline-marker');
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 200) {
            marker.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateTimelineMarkers);

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// INTERACTIVE COUNTER ANIMATION
// ========================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========================================
// TEXT TYPING EFFECT FOR QUOTE
// ========================================
const quoteText = document.querySelector('.quote-text');
let hasTyped = false;

function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Trigger typing effect when quote is in view
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            const originalText = quoteText.textContent;
            typeWriter(originalText, quoteText, 40);
        }
    });
}, { threshold: 0.5 });

if (quoteText) {
    quoteObserver.observe(quoteText);
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ========================================
// IMAGE LAZY LOADING WITH FADE IN
// ========================================
const images = document.querySelectorAll('.gallery-item img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            observer.unobserve(img);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #d4af37, #f5576c);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

createScrollIndicator();

// ========================================
// CURSOR GLOW EFFECT (Desktop Only)
// ========================================
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    function animateCursor() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
const buttons = document.querySelectorAll('.category-tag, .insider-badge');

buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c🎬 Entertainment News', 'font-size: 24px; font-weight: bold; color: #d4af37;');
console.log('%cPremium Cinematic Experience', 'font-size: 14px; color: #b3b3b3;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'font-size: 12px; color: #666;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
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

// Apply debounce to scroll-heavy operations
const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedTimeline = debounce(updateTimelineMarkers, 10);

window.removeEventListener('scroll', revealOnScroll);
window.removeEventListener('scroll', updateTimelineMarkers);
window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedTimeline);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Focus visible styles for better accessibility
const focusableElements = document.querySelectorAll('a, button, [tabindex]');
focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid #d4af37';
        el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

console.log('✨ Website fully loaded and optimized!');
'''

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("JavaScript file created successfully!")

 # Result 
JavaScript file created successfully!
