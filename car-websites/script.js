// Moon icon click karne par Light/Dark mode toggle hoga
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// Har "Get Started" button (Home aur About) pe click hone par blue color toggle hoga
const heroAboutButtons = document.querySelectorAll(".hero-content .btn, .about-content .btn");

heroAboutButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("btn-clicked");
  });
});

// "Add to Cart" buttons - click hone par text aur color dono change honge
const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const isAdded = this.classList.toggle("btn-clicked");

    if (isAdded) {
      this.textContent = "Added to Cart ✔";
    } else {
      this.textContent = "Add to Cart";
    }
  });
});

// Contact form submit
const contactForm = document.querySelector(".contact-right form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector('input[type="text"]').value.trim();
  const phone = document.querySelector('input[type="tel"]').value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const feedback = document.querySelector("textarea").value.trim();

  if (name === "" || phone === "" || email === "" || feedback === "") {
    alert("Meherbani karke tamam fields fill karein.");
    return;
  }

  alert("Shukriya " + name + "! Aap ka message mil gaya hai. Hum jald hi rabta karenge.");
  contactForm.reset();
});