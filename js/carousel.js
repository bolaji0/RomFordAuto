/**
 * Customer Reviews Carousel Implementation
 * For Romford Auto Services Website
 * 
 * Creates an interactive carousel/slider for customer reviews with
 * auto-scrolling functionality and manual navigation controls.
 */

// Carousel configuration
const carouselConfig = {
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds per slide
    animationSpeed: 500, // 0.5 seconds transition
    pauseOnHover: true
};

// Initialize Reviews Carousel
function initCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.reviews-track');
    const slides = carousel.querySelectorAll('.review-card');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    // Calculate the total width of all slides
    const slideWidth = 100; // 100% of carousel width
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayInterval = null;
    let isHovering = false;
    
    // Set up the track and slides
    setupCarousel();
    
    // Create dots for navigation
    createDots();
    
    // Add event listeners
    if (prevButton) prevButton.addEventListener('click', goToPreviousSlide);
    if (nextButton) nextButton.addEventListener('click', goToNextSlide);
    
    // Add hover pause functionality
    if (carouselConfig.pauseOnHover) {
        carousel.addEventListener('mouseenter', pauseAutoplay);
        carousel.addEventListener('mouseleave', resumeAutoplay);
        
        // Touch equivalent for mobile
        carousel.addEventListener('touchstart', pauseAutoplay, { passive: true });
        carousel.addEventListener('touchend', resumeAutoplay);
    }
    
    // Handle window resize
    window.addEventListener('resize', debounceCarousel(setupCarousel, 200));
    
    // Start autoplay if enabled
    if (carouselConfig.autoplay) {
        startAutoplay();
    }
    
    /**
     * Set up the carousel track and slides
     */
    function setupCarousel() {
        // Set track width to accommodate all slides
        track.style.width = `${slideWidth * totalSlides}%`;
        
        // Set each slide's width
        slides.forEach(slide => {
            slide.style.width = `${slideWidth / totalSlides}%`;
        });
        
        // Reset to current slide (in case of resize)
        goToSlide(currentIndex, false);
    }
    
    /**
     * Create navigation dots based on the number of slides
     */
    function createDots() {
        if (!dotsContainer) return;
        
        // Clear any existing dots
        dotsContainer.innerHTML = '';
        
        // Create a dot for each slide
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            
            // Add click event to navigate to this slide
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    /**
     * Navigate to a specific slide
     * @param {number} index - The slide index to navigate to
     * @param {boolean} animate - Whether to animate the transition
     */
    function goToSlide(index, animate = true) {
        // Handle index bounds
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Calculate new position
        const position = -1 * (slideWidth / totalSlides) * currentIndex;
        
        // Apply transition only if animation is enabled
        if (animate) {
            track.style.transition = `transform ${carouselConfig.animationSpeed}ms ease`;
        } else {
            track.style.transition = 'none';
        }
        
        // Move to new position
        track.style.transform = `translateX(${position}%)`;
        
        // Update active dot
        updateActiveDot();
        
        // Reset autoplay if it's enabled
        if (carouselConfig.autoplay && !isHovering) {
            startAutoplay();
        }
    }
    
    /**
     * Navigate to the previous slide
     */
    function goToPreviousSlide() {
        goToSlide(currentIndex - 1);
    }
    
    /**
     * Navigate to the next slide
     */
    function goToNextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    /**
     * Update the active state of navigation dots
     */
    function updateActiveDot() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * Start the autoplay functionality
     */
    function startAutoplay() {
        // Clear any existing interval
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        
        // Set new interval
        autoplayInterval = setInterval(() => {
            if (!isHovering) {
                goToNextSlide();
            }
        }, carouselConfig.autoplaySpeed);
    }
    
    /**
     * Pause the autoplay on hover
     */
    function pauseAutoplay() {
        isHovering = true;
    }
    
    /**
     * Resume the autoplay after hover
     */
    function resumeAutoplay() {
        isHovering = false;
    }
    
    // Initialize by moving to first slide with no animation
    goToSlide(0, false);
    
    // When transition ends, remove the transition property
    track.addEventListener('transitionend', function() {
        track.style.transition = 'none';
    });
}

/**
 * Debounce function for carousel
 */
function debounceCarousel(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// If the script loads after the DOM is already ready, initialize carousel
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initCarousel, 1);
}
