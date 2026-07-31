// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth scrolling + active link highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      e.preventDefault();
      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu after click
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
      // update url without jumping
      history.pushState(null, null, targetId);
    }
  });
});

// Contact form simulation (no backend, just toast message)
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill all fields.';
      formFeedback.style.color = '#dc2626';
      setTimeout(() => { formFeedback.innerHTML = ''; }, 2500);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      formFeedback.innerHTML = '<i class="fas fa-envelope"></i> Enter a valid email.';
      formFeedback.style.color = '#dc2626';
      setTimeout(() => { formFeedback.innerHTML = ''; }, 2500);
      return;
    }
    
    // simulate success
    formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thanks ' + name + '! I\'ll get back soon.';
    formFeedback.style.color = '#16a34a';
    contactForm.reset();
    setTimeout(() => {
      formFeedback.innerHTML = '';
    }, 4000);
  });
}

console.log("Portfolio ready — Certificates section added");