/**
 * Quote Calculator Implementation
 * For Romford Auto Services Website
 * 
 * Creates an interactive form that calculates estimated service prices
 * based on vehicle type, service type, and other factors.
 */

// Service price data by vehicle and service type
const servicePrices = {
    // Vehicle type: small-car, medium-car, large-car, van, motorcycle
    'mot': {
        'small-car': 45,
        'medium-car': 50,
        'large-car': 55,
        'van': 65,
        'motorcycle': 35
    },
    'service-basic': {
        'small-car': 120,
        'medium-car': 140,
        'large-car': 160,
        'van': 180,
        'motorcycle': 90
    },
    'service-full': {
        'small-car': 190,
        'medium-car': 220,
        'large-car': 250,
        'van': 280,
        'motorcycle': 150
    },
    'brakes': {
        'small-car': 150,
        'medium-car': 170,
        'large-car': 190,
        'van': 220,
        'motorcycle': 120
    },
    'clutch': {
        'small-car': 350,
        'medium-car': 450,
        'large-car': 550,
        'van': 650,
        'motorcycle': 250
    },
    'engine-diagnostics': {
        'small-car': 60,
        'medium-car': 60,
        'large-car': 70,
        'van': 80,
        'motorcycle': 50
    },
    'exhaust': {
        'small-car': 120,
        'medium-car': 150,
        'large-car': 180,
        'van': 200,
        'motorcycle': 80
    },
    'custom': {
        'small-car': 'Custom',
        'medium-car': 'Custom',
        'large-car': 'Custom',
        'van': 'Custom',
        'motorcycle': 'Custom'
    }
};

// Age multipliers for older vehicles
const ageMultipliers = {
    'new': 1.0,      // 0-3 years
    'recent': 1.05,  // 4-7 years
    'older': 1.15,   // 8-12 years
    'vintage': 1.25  // 13+ years
};

// Initialize Quote Calculator
function initQuoteCalculator() {
    const quoteForm = document.getElementById('quote-form');
    const customServiceGroup = document.getElementById('custom-service-group');
    const serviceTypeSelect = document.getElementById('service-type');
    const quoteResult = document.querySelector('.quote-result');
    const quoteMessage = document.querySelector('.quote-message');
    const quoteAmount = document.querySelector('.quote-amount');
    const quoteDetails = document.querySelector('.quote-details');
    const bookNowBtn = document.querySelector('.book-now-btn');
    
    if (!quoteForm || !serviceTypeSelect) return;
    
    // Show/hide custom service field based on service type selection
    serviceTypeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customServiceGroup.style.display = 'block';
        } else {
            customServiceGroup.style.display = 'none';
        }
    });
    
    // Handle form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const vehicleType = document.getElementById('vehicle-type').value;
        const serviceType = document.getElementById('service-type').value;
        const vehicleYear = parseInt(document.getElementById('vehicle-year').value);
        const vehicleMake = document.getElementById('vehicle-make').value;
        const vehicleModel = document.getElementById('vehicle-model').value;
        
        // Validate form
        if (!vehicleType || !serviceType || !vehicleYear || !vehicleMake || !vehicleModel) {
            quoteMessage.textContent = 'Please fill out all fields to receive an estimate.';
            quoteAmount.style.display = 'none';
            quoteDetails.style.display = 'none';
            bookNowBtn.style.display = 'none';
            return;
        }
        
        // Calculate quote
        const quote = calculateQuote(vehicleType, serviceType, vehicleYear);
        
        // Display quote result
        displayQuote(quote, vehicleType, serviceType, vehicleYear, vehicleMake, vehicleModel);
    });
    
    // Reset form
    quoteForm.addEventListener('reset', function() {
        customServiceGroup.style.display = 'none';
        quoteMessage.textContent = 'Please fill out the form to receive an estimate.';
        quoteAmount.style.display = 'none';
        quoteDetails.style.display = 'none';
        bookNowBtn.style.display = 'none';
    });
    
    /**
     * Calculate quote based on vehicle type, service type, and vehicle year
     * @param {string} vehicleType - The type of vehicle
     * @param {string} serviceType - The type of service
     * @param {number} vehicleYear - The year the vehicle was manufactured
     * @returns {object} The calculated quote details
     */
    function calculateQuote(vehicleType, serviceType, vehicleYear) {
        // Get base price for vehicle and service type
        let basePrice = 0;
        
        if (serviceType === 'custom') {
            // Custom services require consultation - return a message instead
            return {
                total: 'Consultation required',
                isCustom: true,
                basePrice: 'Varies',
                ageMultiplier: 'N/A',
                ageCategory: getAgeCategory(vehicleYear)
            };
        } else {
            basePrice = servicePrices[serviceType][vehicleType];
        }
        
        // Determine age category and multiplier
        const ageCategory = getAgeCategory(vehicleYear);
        const ageMultiplier = ageMultipliers[ageCategory];
        
        // Calculate final price
        const total = Math.round(basePrice * ageMultiplier);
        
        return {
            total: total,
            isCustom: false,
            basePrice: basePrice,
            ageMultiplier: ageMultiplier,
            ageCategory: ageCategory
        };
    }
    
    /**
     * Determine the age category based on vehicle year
     * @param {number} year - The year the vehicle was manufactured
     * @returns {string} The age category
     */
    function getAgeCategory(year) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        
        if (age <= 3) return 'new';
        if (age <= 7) return 'recent';
        if (age <= 12) return 'older';
        return 'vintage';
    }
    
    /**
     * Display the calculated quote to the user
     * @param {object} quote - The quote details
     * @param {string} vehicleType - The type of vehicle
     * @param {string} serviceType - The type of service
     * @param {number} vehicleYear - The year the vehicle was manufactured
     * @param {string} vehicleMake - The make of the vehicle
     * @param {string} vehicleModel - The model of the vehicle
     */
    function displayQuote(quote, vehicleType, serviceType, vehicleYear, vehicleMake, vehicleModel) {
        // Hide the initial message
        quoteMessage.style.display = 'none';
        
        // Show amount and details
        quoteAmount.style.display = 'block';
        quoteDetails.style.display = 'block';
        bookNowBtn.style.display = 'block';
        
        // Format vehicle type for display
        const vehicleTypeDisplay = vehicleType
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        // Format service type for display
        const serviceTypeDisplay = serviceType === 'mot' 
            ? 'MOT Test' 
            : serviceType
                .replace('service-', '')
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        
        if (quote.isCustom) {
            // Display message for custom services
            document.querySelector('.amount').textContent = 'Custom Quote';
            quoteDetails.innerHTML = `
                <h4>Service Details</h4>
                <p>Thank you for your interest in our custom services. Due to the specialized nature of your request, 
                we'll need to assess your vehicle in person to provide an accurate quote.</p>
                <p>Please use the "Book Now" button below to schedule a consultation, or call us directly at +44 1708 728900.</p>
                <ul>
                    <li><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleTypeDisplay})</li>
                    <li><strong>Service:</strong> Custom Service</li>
                    <li><strong>Vehicle Age Category:</strong> ${quote.ageCategory.charAt(0).toUpperCase() + quote.ageCategory.slice(1)}</li>
                </ul>
            `;
        } else {
            // Display calculated price
            document.querySelector('.amount').textContent = `£${quote.total.toFixed(2)}`;
            quoteDetails.innerHTML = `
                <h4>Quote Breakdown</h4>
                <ul>
                    <li><span>Vehicle:</span> <span>${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleTypeDisplay})</span></li>
                    <li><span>Service:</span> <span>${serviceTypeDisplay}</span></li>
                    <li><span>Base Price:</span> <span>£${quote.basePrice.toFixed(2)}</span></li>
                    <li><span>Vehicle Age:</span> <span>${quote.ageCategory.charAt(0).toUpperCase() + quote.ageCategory.slice(1)} (${(quote.ageMultiplier * 100 - 100).toFixed(0)}% adjustment)</span></li>
                    <li><span>Total Estimate:</span> <span>£${quote.total.toFixed(2)}</span></li>
                </ul>
            `;
        }
    }
}

// If the script loads after the DOM is already ready, initialize quote calculator
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initQuoteCalculator, 1);
}
