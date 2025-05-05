// /**
//  * Animated Counters Implementation
//  * For Romford Auto Services Website
//  * 
//  * Creates counting animations for numerical statistics when they scroll into view.
//  * Each counter element should have a data-count attribute with the target number.
//  */

// // Initialize Counters
// function initCounters() {
//     const counterElements = document.querySelectorAll('.achievement-number');
    
//     if (counterElements.length === 0) return;
    
//     // Create Intersection Observer to detect when counters come into view
//     const counterObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             // Start animation when counter is in view and hasn't been animated yet
//             if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
//                 const target = parseInt(entry.target.getAttribute('data-count'));
//                 animateCounter(entry.target, target);
//                 entry.target.classList.add('counted');
                
//                 // Stop observing after animation starts
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, {
//         threshold: 0.1 // Trigger when at least 10% of the element is visible
//     });
    
//     // Observe all counter elements
//     counterElements.forEach(counter => {
//         counterObserver.observe(counter);
//     });
// }

// /**
//  * Animate a counter from 0 to the target value
//  * @param {HTMLElement} element - The element to update
//  * @param {number} target - The target number to count to
//  */
// function animateCounter(element, target) {
//     // Reset counter to zero
//     let current = 0;
    
//     // Determine animation duration and step size based on target value
//     const duration = 2000; // 2 seconds for all counters
//     const step = Math.ceil(target / (duration / 16)); // Update roughly every 16ms for 60fps
    
//     // Use requestAnimationFrame for smooth animation
//     function updateCounter(timestamp) {
//         if (!startTime) var startTime = timestamp;
//         const elapsed = timestamp - startTime;
        
//         // Calculate current value based on elapsed time
//         current = Math.min(Math.floor((elapsed / duration) * target), target);
        
//         // Format the number with commas if it's a large number
//         element.textContent = formatNumber(current);
        
//         // Continue animation until target is reached
//         if (current < target) {
//             requestAnimationFrame(updateCounter);
//         }
//     }
    
//     // Start the animation
//     let startTime = null;
//     requestAnimationFrame(updateCounter);
// }

// /**
//  * Format a number with commas for thousands separator
//  * @param {number} number - The number to format
//  * @returns {string} Formatted number string
//  */
// function formatNumber(number) {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// // If the script loads after the DOM is already ready, initialize counters
// if (document.readyState === 'complete' || document.readyState === 'interactive') {
//     setTimeout(initCounters, 1);
// }


document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".achievement-number");
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-count");
            const speed = 200; // lower is faster
            const increment = Math.ceil(target / speed);
            let current = 0;

            const update = () => {
                current += increment;
                if (current > target) current = target;
                counter.textContent = current.toLocaleString();
                if (current < target) {
                    requestAnimationFrame(update);
                }
            };

            update();
        });

        hasAnimated = true;
    }

    // Trigger when section enters the viewport
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector("#about"));
});
