window.addEventListener("load", function () {
  // Remove Preloader after all resources are loaded
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500); // Delay to allow fading effect

  // Show Hero Section
  const hero = document.getElementById("hero");
  hero.style.opacity = "1";

  // Function to apply animation to multiple elements
  function applyAnimation(selector, animation) {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.animation = animation;
    });
  }
  // Fade in nav and footer separately after preloader is removed
  document.querySelector("nav").style.opacity = "1";
  document.querySelector("footer").style.opacity = "1";
  // Apply animations correctly
  applyAnimation(".hero-content", "showContent 1s 0s ease-in-out forwards");
  applyAnimation(
    "#hero-content-h1",
    "showContent 1s 0.4s ease-in-out forwards"
  );
  applyAnimation(
    "#home-h1-humanity",
    "showContent 1.2s 0.7s ease-in-out forwards"
  );
});

function addGlitchEffect() {
  const title = document.querySelector("#home-h1-humanity"); // Select single element
  if (!title) return; // Ensure element exists

  const originalText = title.textContent;
  const middleText = "A.I";

  title.addEventListener("mouseover", function () {
    let iterations = 0;
    let randomText = [];
    title.style.color = "red";
    const interval = setInterval(() => {
      for (let i = 0; i < originalText.length; i++) {
        randomText[i] = "!@#$%^&*()?><"[Math.floor(Math.random() * 13)];
        if (i == 3 && iterations != 8) randomText[i] = "A";
        if (i == 4 && iterations != 8) randomText[i] = "I";
      }
      title.textContent = randomText.join("");
      iterations += 1;
      if (iterations >= 500 / 30) {
        clearInterval(interval);
        title.textContent = randomText.join("");
        // Make the text red when it becomes "A.I"

        // Start reverting back to original text after a delay
        setTimeout(() => revertToOriginal(), 0);
      }
    }, 39);
  });

  function revertToOriginal() {
    let iterations1 = 0;
    const interval1 = setInterval(() => {
      title.style.color = "";
      title.textContent = originalText
        .split("")
        .map((letter, index) => {
          if (index < iterations1) {
            return originalText[index];
          }
          return "!@#$%^&*()?><"[Math.floor(Math.random() * 13)];
        })
        .join("");

      iterations1 += 1 / 3;
      if (iterations1 >= originalText.length) {
        clearInterval(interval1);
        title.textContent = originalText;
        // Reset color to default
      }
    }, 30);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addGlitchEffect();
});
