
  // Apply animation when elements enter the viewport
  document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
      ".image-item, .intro-section h1, .intro-section p"
    );

    const observerOptions = {
      root: null, // Viewport
      threshold: 0.1, // Trigger animation when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate"); // Remove animation class when the element exits the viewport
        }
      });
    }, observerOptions);

    // Add the 'hidden' class initially and observe each element
    animatedElements.forEach((el) => {
      el.classList.add("hidden");
      observer.observe(el);
    });
  });

