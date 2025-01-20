document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".clickable");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    let currentSlideIndex = 0;
  
    images.forEach(image => {
      image.addEventListener("click", () => {
        const group = image.dataset.group;
  
        // Show modal
        modal.style.display = "flex";
  
        // Show images in the same group
        const modalImages = document.querySelectorAll(".modal-image");
        modalImages.forEach(img => {
          img.style.display = img.classList.contains(group) ? "block" : "none";
        });
  
        // Set initial slide
        const groupImages = document.querySelectorAll(`.modal-image.${group}`);
        currentSlideIndex = 0; // Start at first image
        updateSlide(groupImages);
      });
    });
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Close modal on clicking outside content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Close modal when ESC key is pressed
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    });
  
    // Change slide in slider
    function changeSlide(direction) {
      const group = document.querySelector(".modal-image").classList[1];
      const groupImages = document.querySelectorAll(`.modal-image.${group}`);
      currentSlideIndex += direction;
  
      if (currentSlideIndex >= groupImages.length) {
        currentSlideIndex = 0;
      } else if (currentSlideIndex < 0) {
        currentSlideIndex = groupImages.length - 1;
      }
  
      updateSlide(groupImages);
    }
  
    // Update the slide view
    function updateSlide(images) {
      const slidesContainer = document.querySelector(".slides");
      slidesContainer.style.transform = `translateX(-${currentSlideIndex * (100 + 20)}%)`; // Account for 20px gap
    }
  
    // Expose functions to buttons
    window.changeSlide = changeSlide;
  
    // Enable dragging the slider (click, hold, and drag)
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.querySelector(".slider");
  
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grabbing";  // Change cursor to grabbing when clicked
    });
  
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.style.cursor = "grab"; // Change cursor back to grab
    });
  
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.style.cursor = "grab"; // Change cursor back to grab
    });
  
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return; // Don't move if the mouse is not pressed down
      e.preventDefault(); // Prevent selection while dragging
      const x = e.pageX - slider.offsetLeft; // Calculate the current mouse position
      const walk = (x - startX); // Calculate how far the mouse has moved
      slider.scrollLeft = scrollLeft - walk; // Move the slider by the calculated distance
    });
  });
