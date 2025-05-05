/**
 * Parallax Effect Implementation
 * For Romford Auto Services Website
 * 
 * Creates a subtle parallax scrolling effect on elements with the data-parallax attribute.
 * Primary use is on the hero section background.
 */

// Initialize Parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax="scroll"]');
    
    if (parallaxElements.length === 0) return;
    
    // Set initial background positions
    updateParallaxPositions();
    
    // Update positions on scroll
    window.addEventListener('scroll', function() {
        window.requestAnimationFrame(updateParallaxPositions);
    });
    
    // Handle resize events
    window.addEventListener('resize', debounceParallax(function() {
        updateParallaxPositions();
    }, 200));
}

/**
 * Update the position of all parallax elements based on scroll position
 */
function updateParallaxPositions() {
    const parallaxElements = document.querySelectorAll('[data-parallax="scroll"]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Only apply parallax if element is visible
        if (scrollPosition + viewportHeight > elementTop && 
            scrollPosition < elementTop + elementHeight) {
            
            // Calculate the parallax offset (slower scroll rate for background)
            const parallaxOffset = (scrollPosition - elementTop) * 0.4;
            
            // Apply transform for better performance instead of background-position
            element.style.backgroundPosition = `center ${-parallaxOffset}px`;
        }
    });
}

/**
 * Debounce function to limit how often the parallax calculations run
 * especially during scroll and resize events
 */
function debounceParallax(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// If the script loads after the DOM is already ready, initialize parallax
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initParallax, 1);
}
