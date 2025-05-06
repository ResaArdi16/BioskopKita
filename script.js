document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds
    
    // Initialize slider
    function initSlider() {
        updateSlider();
        startSlideInterval();
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        // Indicator clicks
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.dataset.index);
                goToSlide(slideIndex);
                resetInterval();
            });
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        });
        
        sliderTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideInterval();
        });
    }
    
    // Move to specific slide
    function goToSlide(index) {
        currentSlide = (index + slideCount) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Update slider position and indicators
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
    
    // Auto-slide functions
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Initialize the slider
    initSlider();
});