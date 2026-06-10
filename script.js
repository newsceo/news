/* ============================================
   CINEMATIC PREMIUM WEBSITE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- Loading Screen ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Fallback: hide loader after 4 seconds regardless
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 4000);

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Particle Generation ---
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 6;
            const randomDuration = 4 + Math.random() * 4;
            const randomSize = 2 + Math.random() * 3;

            particle.style.left = randomLeft + '%';
            particle.style.animationDelay = randomDelay + 's';
            particle.style.animationDuration = randomDuration + 's';
            particle.style.width = randomSize + 'px';
            particle.style.height = randomSize + 'px';

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // --- Scroll Reveal Animation ---
    function revealOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .timeline-item, .reaction-card, .insider-card, .gallery-item');

        elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- Timeline Marker Activation ---
    function activateTimelineMarkers() {
        const markers = document.querySelectorAll('.timeline-marker');

        markers.forEach(function(marker) {
            const markerRect = marker.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (markerRect.top < windowHeight - 50) {
                marker.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateTimelineMarkers);

    // --- Parallax Effect on Hero ---
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // --- Typing Effect for Quote ---
    const quoteBlock = document.querySelector('.quote-block');

    if (quoteBlock) {
        const originalText = quoteBlock.textContent.trim();
        quoteBlock.textContent = '';
        quoteBlock.style.opacity = '1';

        let charIndex = 0;

        function typeQuote() {
            if (charIndex < originalText.length) {
                quoteBlock.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeQuote, 30);
            }
        }

        // Start typing when quote comes into view
        const quoteObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    setTimeout(typeQuote, 500);
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        quoteObserver.observe(quoteBlock);
    }

    // --- Stat Counter Animation ---
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(function(stat) {
            const targetValue = parseInt(stat.textContent);
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.round(easedProgress * targetValue);

                stat.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');

    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // --- Image Lazy Loading ---
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // --- Scroll Progress Indicator ---
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // --- Cursor Glow Effect (Desktop Only) ---
    if (window.innerWidth > 768) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', function(e) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // --- Keyboard Accessibility ---
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // --- Performance: Debounce scroll events ---
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    // Apply debounce to heavy scroll handlers
    const debouncedReveal = debounce(revealOnScroll, 50);
    const debouncedTimeline = debounce(activateTimelineMarkers, 50);

    window.removeEventListener('scroll', revealOnScroll);
    window.removeEventListener('scroll', activateTimelineMarkers);
    window.addEventListener('scroll', debouncedReveal);
    window.addEventListener('scroll', debouncedTimeline);

    console.log('%c Celebrity News Website Loaded', 'color: #d4af37; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned with cinematic premium aesthetics', 'color: #b0b0b0; font-size: 12px;');
});
