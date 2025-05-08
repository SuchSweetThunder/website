/**
 * Jockamo Barnes Website
 * Common JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Initialize animations if the animation library is loaded
    if (typeof animateOnReveal !== 'undefined') {
        initAnimations();
    }
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const burgerButton = document.querySelector('.burger-button');
    const closeButton = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (burgerButton && closeButton && mobileMenu) {
        // Open mobile menu
        burgerButton.addEventListener('click', function() {
            mobileMenu.classList.add('teleport-show');
        });
        
        // Close mobile menu
        closeButton.addEventListener('click', function() {
            mobileMenu.classList.remove('teleport-show');
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('teleport-show');
            });
        });
    }
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Check if the element has the data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
        const animation = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        const duration = element.getAttribute('data-duration') || '1s';
        
        // Add animation classes
        element.classList.add('animate__animated', `animate__${animation}`);
        
        // Set animation delay and duration
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = duration;
    });
}

/**
 * Helper function to check if an element is in viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
