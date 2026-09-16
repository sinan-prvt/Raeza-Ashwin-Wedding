document.addEventListener('DOMContentLoaded', () => {
    
    const openBtn = document.getElementById('open-invitation');
    const entrance = document.getElementById('entrance');
    const mainContent = document.getElementById('main-content');
    
    // Elements to animate on load
    const loadElements = document.querySelectorAll('.fade-in, .fade-in-up');

    // Handle entrance button click
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // Fade out the entrance overlay
            entrance.classList.add('fade-out');
            
            // Show main content
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            // Trigger initial animations
            setTimeout(() => {
                loadElements.forEach(el => {
                    el.classList.add('is-visible');
                });
            }, 300); // Small delay to sync with entrance fade out
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Parallax effect on hero section elements (optional enhancement)
    const hero = document.getElementById('hero');
    const coupleNames = document.querySelector('.couple-names');
    const heroDate = document.querySelector('.hero-date');
    
    if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                if (coupleNames) coupleNames.style.transform = `translateY(${scrollY * 0.2}px)`;
                if (heroDate) heroDate.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        });
    }
});
