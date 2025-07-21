document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    
    if (!track) {
        return;
    }

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('#carousel-next');
    const prevButton = document.querySelector('#carousel-prev');
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const moveToSlide = (targetIndex) => {
        track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        currentIndex = targetIndex;
    }


    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });


    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; 
        track.style.transform = 'translateX(-' + newSlideWidth * currentIndex + 'px)';
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out'; 
        }, 50);
    });

    const ctaButton = document.querySelector('a[href="#new-slider-section"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#new-slider-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});