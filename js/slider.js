// /**
//  * Before & After Image Comparison Slider Implementation
//  * For Romford Auto Services Website
//  * 
//  * Creates interactive before/after sliders where users can drag a handle
//  * to reveal different portions of before and after images.
//  */

// // Initialize Before & After Sliders
// function initBeforeAfterSliders() {
//     const sliders = document.querySelectorAll('.comparison-slider');
    
//     if (sliders.length === 0) return;
    
//     sliders.forEach(slider => {
//         setupSlider(slider);
//     });
// }

// /**
//  * Set up a single comparison slider with event listeners
//  * @param {HTMLElement} slider - The slider container element
//  */
// function setupSlider(slider) {
//     const sliderHandle = slider.querySelector('.slider-handle');
//     const beforeImage = slider.querySelector('.before-image');
    
//     if (!sliderHandle || !beforeImage) return;
    
//     // Set initial position (50%)
//     moveSliderTo(slider, 50);
    
//     // Mouse and touch event listeners
//     sliderHandle.addEventListener('mousedown', startDragging);
//     sliderHandle.addEventListener('touchstart', startDragging, { passive: false });
    
//     // Click anywhere on slider to move the handle
//     slider.addEventListener('click', function(e) {
//         // Ignore clicks on the handle itself
//         if (e.target === sliderHandle || sliderHandle.contains(e.target)) return;
        
//         // Calculate click position as percentage of slider width
//         const rect = slider.getBoundingClientRect();
//         const position = ((e.clientX - rect.left) / rect.width) * 100;
        
//         // Move slider to clicked position
//         moveSliderTo(slider, position);
//     });
    
//     /**
//      * Start dragging the slider handle
//      * @param {Event} e - Mouse or touch event
//      */
//     function startDragging(e) {
//         e.preventDefault();
        
//         // Get starting positions
//         const isTouch = e.type === 'touchstart';
//         const startX = isTouch ? e.touches[0].clientX : e.clientX;
//         const sliderRect = slider.getBoundingClientRect();
//         const startPosition = ((sliderHandle.getBoundingClientRect().left + sliderHandle.offsetWidth/2) - sliderRect.left) / sliderRect.width * 100;
        
//         // Event listeners for dragging
//         document.addEventListener(isTouch ? 'touchmove' : 'mousemove', dragHandle);
//         document.addEventListener(isTouch ? 'touchend' : 'mouseup', stopDragging);
        
//         /**
//          * Handle drag movement
//          * @param {Event} e - Mouse or touch event
//          */
//         function dragHandle(e) {
//             // Calculate the new position
//             const currentX = isTouch ? e.touches[0].clientX : e.clientX;
//             const deltaX = currentX - startX;
//             const deltaPosition = (deltaX / sliderRect.width) * 100;
//             const newPosition = Math.max(0, Math.min(100, startPosition + deltaPosition));
            
//             // Move the slider to the new position
//             moveSliderTo(slider, newPosition);
//         }
        
//         /**
//          * Stop dragging and remove event listeners
//          */
//         function stopDragging() {
//             document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', dragHandle);
//             document.removeEventListener(isTouch ? 'touchend' : 'mouseup', stopDragging);
//         }
//     }
// }

// /**
//  * Move the slider to a specific position
//  * @param {HTMLElement} slider - The slider container element
//  * @param {number} position - The position as a percentage (0-100)
//  */
// function moveSliderTo(slider, position) {
//     const beforeImage = slider.querySelector('.before-image');
//     const sliderHandle = slider.querySelector('.slider-handle');
    
//     if (!beforeImage || !sliderHandle) return;
    
//     // Ensure position is between 0 and 100
//     position = Math.max(0, Math.min(100, position));
    
//     // Update the before image clip path
//     beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    
//     // Update the handle position
//     sliderHandle.style.left = `${position}%`;
// }

// // If the script loads after the DOM is already ready, initialize sliders
// if (document.readyState === 'complete' || document.readyState === 'interactive') {
//     setTimeout(initBeforeAfterSliders, 1);
// }
