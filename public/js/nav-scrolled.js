window.addEventListener("scroll", function () {
  let navbar = document.querySelector("nav");
  if (window.scrollY > 200) {
    // When scrolled down 50px
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
