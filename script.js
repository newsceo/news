document.addEventListener('DOMContentLoaded', () => {
    
    // --- 3D CAROUSEL LOGIC ---
    const carousel = document.querySelector('.carousel');
    const cells = document.querySelectorAll('.carousel__cell');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let cellCount = cells.length;
    let selectedIndex = 0;
    const cellWidth = carousel.offsetWidth;
    const cellHeight = carousel.offsetHeight;
    // Radius calculation for 3 items to form a triangle/circle
    const radius = Math.round((cellWidth / 2) / Math.tan(Math.PI / cellCount)) + 50; 

    function rotateCarousel() {
        const angle = selectedIndex / cellCount * -360;
        carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
    }

    // Initial positioning of cells
    for (let i = 0; i < cellCount; i++) {
        const cell = cells[i];
        const cellAngle = i / cellCount * 360;
        cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        selectedIndex--;
        rotateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        selectedIndex++;
        rotateCarousel();
    });

    // Initialize
    rotateCarousel();


    // --- CUSTOM CURSOR LOGIC ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Check if device is not touch-based
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Main dot follows instantly
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Follower has delay via requestAnimationFrame for smoothness
        function animateCursor() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const links = document.querySelectorAll('a, button, .menu-icon');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(2)';
                follower.style.borderColor = '#fff';
                cursor.style.background = '#fff';
            });
            link.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'rgba(207, 181, 59, 0.5)';
                cursor.style.background = '#cfb53b';
            });
        });
    }

    // --- SCROLL REVEAL ANIMATION ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.text-block p, .article-title, .glass-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
