document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const gifs = document.querySelectorAll(".gif");
    const slider = document.querySelector(".image-slider");
    const slides = document.querySelectorAll(".image-slide");
    const nextButton = document.querySelector("#next-slide"); // The next button
    let currentSlide = 0; // Start with the first slide
    let isScrolling = false;

    // Function to scroll to the next section
    function scrollToSection(direction) {
        if (isScrolling) return;
        isScrolling = true;

        let currentSectionIndex = Array.from(sections).findIndex(section => {
            return section.getBoundingClientRect().top <= window.innerHeight / 2 && section.getBoundingClientRect().bottom >= window.innerHeight / 2;
        });

        let nextSectionIndex = currentSectionIndex + direction;

        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            const targetSection = sections[nextSectionIndex];
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });

            // Check if the target section contains a GIF and trigger it
            if (targetSection.querySelector(".gif")) {
                const gif = targetSection.querySelector(".gif");
                if (!gif.classList.contains("played")) {
                    playGif(gif);
                }
            }
        }

        // Allow scrolling again after 500ms
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    // Function to play GIF when in the viewport
    function playGif(gif) {
        gif.classList.add("played");
        const src = gif.src;
        gif.src = "";
        gif.src = src;
    }

    // Listen for mouse wheel scroll event
    window.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
            scrollToSection(1); // Scrolling down (next section)
        } else {
            scrollToSection(-1); // Scrolling up (previous section)
        }
    });

    // Smooth scrolling for course details button
    document.querySelector("a").addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
        });

        if (targetSection.querySelector(".gif")) {
            const gif = targetSection.querySelector(".gif");
            if (!gif.classList.contains("played")) {
                playGif(gif);
            }
        }
    });

    // Check if the GIFs are already in the viewport and play them once when the page is loaded
    gifs.forEach(gif => {
        if (isInViewport(gif) && !gif.classList.contains("played")) {
            playGif(gif);
        }
    });

    // Function to check if an element is in the viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    // Optional: Function to detect if GIF should play when it's in the viewport
    function checkAndPlayGif() {
        gifs.forEach(gif => {
            if (isInViewport(gif) && !gif.classList.contains("played")) {
                playGif(gif);
            }
        });
    }

    // Check GIF visibility on scroll and when page loads
    window.addEventListener("scroll", checkAndPlayGif);
    checkAndPlayGif(); // Initial check on page load

    // Function to go to the next slide (image slider)
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Loop to the first slide after the last one
        updateSliderPosition();
        updateButtonText();
    }

    // Function to go to the previous slide (image slider)
    function goToPreviousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop to the last slide if at the first
        updateSliderPosition();
        updateButtonText();
    }

    // Function to update the slider's position
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Function to update the button text based on the current slide
    function updateButtonText() {
        if (currentSlide === 0) {
            nextButton.textContent = "Next"; // If we're at the first slide, show "Next"
        } else {
            nextButton.textContent = "Previous"; // Otherwise, show "Previous"
        }
    }

    // Add event listener for the Next button click
    nextButton.addEventListener("click", function () {
        if (currentSlide === 0) {
            goToNextSlide(); // If we're at the first slide, go next
        } else {
            goToPreviousSlide(); // If we're not at the first slide, go previous
        }
    });
});
