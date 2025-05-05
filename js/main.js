document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBackToTop();
    initFormValidation();
    initServicesExpand();
    initNewsExpand();
    initOpeningHoursIndicator();
    
    // Initialize parallax effect and other components that need to be loaded separately
    if (document.querySelector('.hero-section')) {
        loadScript('js/parallax.js', function() {
            initParallax();
        });
    }
    
    if (document.querySelector('.achievement-number')) {
        loadScript('js/counters.js', function() {
            initCounters();
        });
    }
    
    if (document.querySelector('.comparison-slider')) {
        loadScript('js/slider.js', function() {
            initBeforeAfterSliders();
        });
    }
    
    if (document.querySelector('.reviews-carousel')) {
        loadScript('js/carousel.js', function() {
            initCarousel();
        });
    }
    
    if (document.getElementById('quote-form')) {
        loadScript('js/quote-calculator.js', function() {
            initQuoteCalculator();
        });
    }
});

/**
 * Navigation functionality
 * Handles smooth scrolling, mobile menu toggle, and header state on scroll
 */
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Header scroll state
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth scrolling for navigation links
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinkElements.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', debounce(function() {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinkElements.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === currentSection) {
                navLink.classList.add('active');
            }
        });
    }, 100));
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact form and quote form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const quoteForm = document.getElementById('quote-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const formStatus = document.getElementById('form-status');
            
            if (!name || !email || !phone || !message) {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                formStatus.textContent = 'Please enter a valid phone number.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll simulate a successful submission
            formStatus.textContent = 'Your message has been sent successfully! We will get back to you soon.';
            formStatus.classList.add('success');
            formStatus.classList.remove('error');
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }
}

/**
 * Services "Learn More" expand functionality
 */
function initServicesExpand() {
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceDetails = serviceCard.querySelector('.service-details');
            
            if (serviceDetails.classList.contains('active')) {
                serviceDetails.classList.remove('active');
                this.textContent = 'Learn More';
            } else {
                // Close any other open details
                document.querySelectorAll('.service-details.active').forEach(openDetails => {
                    if (openDetails !== serviceDetails) {
                        openDetails.classList.remove('active');
                        openDetails.previousElementSibling.textContent = 'Learn More';
                    }
                });
                
                serviceDetails.classList.add('active');
                this.textContent = 'Show Less';
            }
        });
    });
}

/**
 * News "Read More" expand functionality
 */
function initNewsExpand() {
    const newsExpandButtons = document.querySelectorAll('.news-expand-btn');
    
    newsExpandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsItem = this.closest('.news-item');
            const newsContent = newsItem.querySelector('.news-content');
            
            if (newsContent.classList.contains('active')) {
                newsContent.classList.remove('active');
                this.textContent = 'Read More';
            } else {
                // Close any other open content
                document.querySelectorAll('.news-content.active').forEach(openContent => {
                    if (openContent !== newsContent) {
                        openContent.classList.remove('active');
                        openContent.previousElementSibling.textContent = 'Read More';
                    }
                });
                
                newsContent.classList.add('active');
                this.textContent = 'Show Less';
            }
        });
    });
}

/**
 * Opening hours indicator in footer
 * Shows if the business is currently open or closed
 */
function initOpeningHoursIndicator() {
    const statusIndicator = document.getElementById('status-indicator');
    
    if (!statusIndicator) return;
    
    // Business hours: 8am to 8pm, 7 days a week
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 8 && hour < 20) {
        statusIndicator.textContent = 'Open';
        statusIndicator.classList.add('open');
    } else {
        statusIndicator.textContent = 'Closed';
        statusIndicator.classList.add('closed');
    }
}

/**
 * Utility function to dynamically load scripts
 */
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

/**
 * Debounce function to limit how often a function can fire
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
