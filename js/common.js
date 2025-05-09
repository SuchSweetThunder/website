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

/**
 * Fixed Nav with Smooth Transition
 */
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('main-navbar');
    const navbarSpacer = document.getElementById('navbar-spacer');
    const scrollThreshold = 100;
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-fixed');
            navbarSpacer.classList.add('active');
        } else {
            navbar.classList.remove('navbar-fixed');
            navbarSpacer.classList.remove('active');
        }
    });
});


/**
 * Manifesto animation
 */
// Updated manifesto animation with scroll-triggered highlights - add to common.js
// Updated JavaScript to handle both emphasis styles
document.addEventListener('DOMContentLoaded', function() {
    // Animate manifesto paragraphs on scroll
    const manifestoItems = document.querySelectorAll('.manifesto-item');
    
    // Select all accent types
    const highlightElements = document.querySelectorAll('.highlight-text');
    const underlineElements = document.querySelectorAll('.underline-text');
    const sideAccentElements = document.querySelectorAll('.side-accent-text');
    const weightElements = document.querySelectorAll('.weight-text');
    
    // Combined array of all emphasis elements for debugging
    const allEmphasisElements = [
        ...highlightElements, 
        ...underlineElements, 
        ...sideAccentElements, 
        ...weightElements
    ];
    console.log(`Total emphasis elements: ${allEmphasisElements.length}`);
    
    function isElementInViewport(el, offset = 0) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * (0.75 - offset) &&
            rect.bottom >= 0
        );
    }
    
    function handleScroll() {
        // Animate manifesto paragraphs
        manifestoItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, parseInt(item.dataset.delay) || 0);
            }
        });
        
        // Function to handle any type of emphasis element
        function handleEmphasisElements(elements, delay = 0) {
            elements.forEach((element, index) => {
                if (isElementInViewport(element, 0.1 * index)) {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, 400 + delay + (index * 150));
                } else if (!isElementInViewport(element, -0.5)) {
                    // Reset when scrolled far away (optional)
                    element.classList.remove('active');
                }
            });
        }
        
        // Apply to all emphasis types with slight timing variations
        handleEmphasisElements(highlightElements, 0);
        handleEmphasisElements(underlineElements, 100);
        handleEmphasisElements(sideAccentElements, 200);
        handleEmphasisElements(weightElements, 300);
    }
    
    // Initial check on page load
    setTimeout(handleScroll, 800);
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Special effect for emphasis text
    const emphasisText = document.querySelector('.emphasis-text');
    if (emphasisText) {
        window.addEventListener('scroll', function() {
            if (isElementInViewport(emphasisText)) {
                emphasisText.style.transform = 'scale(1.02)';
                emphasisText.style.textShadow = '0 0 15px rgba(255, 80, 5, 0.4)';
            } else {
                emphasisText.style.transform = 'scale(1)';
                emphasisText.style.textShadow = 'none';
            }
        });
    }
});

// Page Transitions - Add to common.js
document.addEventListener('DOMContentLoaded', function() {
    // Create initial loading screen
    const initialLoad = document.createElement('div');
    initialLoad.classList.add('initial-load');
    initialLoad.innerHTML = `
		<div class="load-content" style="display: flex; flex-direction: column; align-items: center;">
            <img src="public/image/img-creme-emblem-250px-200h.png" class="load-logo" alt="Jockamo Barnes">
            <div class="load-text">Cultural Instigators</div>
        </div>
    `;
    document.body.appendChild(initialLoad);
    
    // Create page transition overlay
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    pageTransition.innerHTML = `
        <div class="transition-content">
            <img src="public/image/img-creme-emblem-250px-200h.png" class="transition-logo" alt="Jockamo Barnes">
        </div>
    `;
    document.body.appendChild(pageTransition);
    
    // Hide loading screen after content loads
    window.addEventListener('load', function() {
        // Delay to ensure animations have time to play
        setTimeout(function() {
            initialLoad.classList.add('loaded');
            
            // Remove from DOM after transition completes
            setTimeout(function() {
                initialLoad.remove();
            }, 800);
            
            // Start content animations after load screen disappears
            startPageAnimations();
        }, 1500);
    });
    
    // Handle internal link navigation with transitions
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links that aren't anchors or mailto
        const href = link.getAttribute('href');
        if (
            href && 
            link.hostname === window.location.hostname && 
            !href.startsWith('#') && 
            !href.startsWith('mailto:')
        ) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                
                // Show transition overlay
                pageTransition.classList.add('active');
                
                // Navigate after transition animation
                setTimeout(function() {
                    window.location.href = targetUrl;
                }, 800);
            });
        }
    });
    
    // Function to start page animations
    function startPageAnimations() {
        // Animate manifesto items if they exist
        const manifestoItems = document.querySelectorAll('.manifesto-item');
        manifestoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, 300 + (index * 150));
        });
        
        // Animate any other elements with animation classes
        document.querySelectorAll('.animate__animated').forEach((element, index) => {
            // Get any animation delay from data attribute or style
            let delay = element.getAttribute('data-delay') || 
                       (element.style.animationDelay ? parseInt(element.style.animationDelay) : 0);
            
            // Convert to number if it's a string
            if (typeof delay === 'string') {
                delay = parseInt(delay.replace('ms', '').replace('s', '')) || 0;
            }
            
            // Add animation class after delay
            setTimeout(() => {
                // Get animation class from data attribute
                const animationClass = element.getAttribute('data-animation') || 'fadeIn';
                element.classList.add(`animate__${animationClass}`);
            }, 300 + delay);
        });
    }
});

// Enhanced Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Handle fixed navigation
    setupFixedNavigation();
    
    // Enhance mobile menu
    enhanceMobileMenu();
    
    // Function to handle fixed navigation
    function setupFixedNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Create spacer element if it doesn't exist
        let navSpacer = document.querySelector('.nav-spacer');
        if (!navSpacer) {
            navSpacer = document.createElement('div');
            navSpacer.classList.add('nav-spacer');
            navbar.parentNode.insertBefore(navSpacer, navbar.nextSibling);
        }
        
        // Handle scroll events
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-fixed');
                navSpacer.classList.add('active');
            } else {
                navbar.classList.remove('navbar-fixed');
                navSpacer.classList.remove('active');
            }
        });
        
        // Check initial scroll position
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-fixed');
            navSpacer.classList.add('active');
        }
    }
    
    // Function to enhance mobile menu
    function enhanceMobileMenu() {
        const burgerButton = document.querySelector('.burger-button');
        const closeButton = document.querySelector('.close-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!burgerButton || !closeButton || !mobileMenu) return;
        
        // Stagger mobile menu item animations
        const menuItems = mobileMenu.querySelectorAll('.burger-menu');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.4s ease ${0.3 + (index * 0.1)}s, transform 0.4s ease ${0.3 + (index * 0.1)}s`;
        });
        
        // When mobile menu opens, animate items
        burgerButton.addEventListener('click', function() {
            // Animate menu items
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 300 + (index * 100));
            });
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
        
        // When mobile menu closes, reset animations
        closeButton.addEventListener('click', function() {
            // Reset menu items after closing
            setTimeout(() => {
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                });
            }, 600);
            
            // Restore body scrolling
            document.body.style.overflow = '';
        });
        
        // Close mobile menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('teleport-show')) {
                closeButton.click();
            }
        });
        
        // Add hover animation for nav links
        const navLinks = document.querySelectorAll('.nav-link, .burger-menu');
        navLinks.forEach(link => {
            // Create subtle pulse effect on hover
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'color 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
                this.style.color = '#ffffff';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transition = 'color 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                this.style.color = '';
            });
        });
    }
    
    // Add subtle text animation to navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .nav-text');
    
    allNavLinks.forEach(link => {
        // Store original text
        const originalText = link.textContent;
        let isAnimating = false;
        
        // Add subtle animation on hover
        link.addEventListener('mouseenter', function() {
            if (isAnimating) return;
            isAnimating = true;
            
            // Add subtle animation
            this.style.transition = 'color 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
            
            // Animate to white
            this.style.color = '#ffffff';
            this.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.4)';
        });
        
        link.addEventListener('mouseleave', function() {
            // Animate back to original color
            this.style.transition = 'color 0.5s cubic-bezier(0.19, 1, 0.22, 1), text-shadow 0.5s ease';
            this.style.color = '';
            this.style.textShadow = 'none';
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    });
});

/**
 * Simplified Services Section Animation
 * A more subtle approach with minimal animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only initialize animations if we're on the what-we-do page
  if (document.querySelector('.services-section') || document.querySelector('#what-we-do')) {
    initSimplifiedServicesAnimation();
  }
});

/**
 * Initialize simplified animations for horizontal services layout
 */
function initSimplifiedServicesAnimation() {
  // Get service categories
  const serviceCategories = document.querySelectorAll('.service-category');
  
  // If no services content found, exit early
  if (serviceCategories.length === 0) return;
  
  // Create an intersection observer for triggering animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When services section enters viewport
      if (entry.isIntersecting) {
        // Simple fade-in for all categories together
        serviceCategories.forEach(category => {
          // Start with opacity 0
          category.style.opacity = '0';
          category.style.transform = 'translateY(15px)';
          category.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          
          // Short delay before animation starts
          setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
          }, 300);
        });
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: '0px 0px -5% 0px' // Adjust trigger point
  });
  
  // Start observing the services section
  const servicesSection = document.querySelector('.services-row') || 
                          document.querySelector('.services-section');
  if (servicesSection) {
    observer.observe(servicesSection);
  }
  
  // Simplified hover effects for each category
  serviceCategories.forEach(category => {
    // Get the heading
    const heading = category.querySelector('.services-heading');
    
    // Add restrained hover effect for the entire category
    category.addEventListener('mouseenter', () => {
      // Subtle color change for the heading only
      if (heading) {
        heading.style.color = 'var(--color-primary-2)';
        heading.style.transition = 'color 0.3s ease';
      }
    });
    
    category.addEventListener('mouseleave', () => {
      // Reset color on mouse leave
      if (heading) {
        heading.style.color = '';
      }
    });
  });
}