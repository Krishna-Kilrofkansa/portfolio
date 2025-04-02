// DOM Elements
const loadingScreen = document.getElementById("loadingScreen");
const sections = document.querySelectorAll("section");
const darkModeToggle = document.getElementById("darkModeToggle");
const monoModeToggle = document.getElementById("monoModeToggle");
const navLinks = document.querySelectorAll(".nav-link");

/**
 * Removes the loading screen with a fade-out animation
 */
function hideLoadingScreen() {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 1500);
}

/**
 * Sets up the intersection observer to animate sections when they become visible
 */
function setupSectionObserver() {
  const observerOptions = { threshold: 0.1 };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach((section) => observer.observe(section));
}

/**
 * Updates the active navigation link based on scroll position
 */
function updateActiveNavLink() {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
}

/**
 * Updates the skills display with the provided skills
 * @param {string} skillsText - Comma-separated skills text
 */
function updateSkillsDisplay(skillsText) {
  // Split by comma and trim each skill
  const skillsDisplay = document.getElementById("skillsDisplay");
  if (!skillsDisplay) return;
  
  const skills = skillsText.split(",").map(skill => skill.trim()).filter(skill => skill);
  skillsDisplay.innerHTML = "";
  
  skills.forEach(skill => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = skill;
    skillsDisplay.appendChild(span);
  });
}

/**
 * Updates the contact display with the provided contact information
 */
function updateContactDisplay() {
  const contactDisplay = document.getElementById("contactDisplay");
  if (!contactDisplay) return;
  
  const address = document.getElementById("addressInput").value;
  const phone = document.getElementById("phoneInput").value;
  const email = document.getElementById("emailInput").value;
  const linkedin = document.getElementById("linkedinInput").value;
  const portfolio = document.getElementById("portfolioInput").value;

  contactDisplay.innerHTML = `
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    <p><strong>LinkedIn:</strong> <a href="https://${linkedin}" target="_blank">${linkedin}</a></p>
    <p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>
  `;
}

/**
 * Initialize form event listeners
 */
function setupFormListeners() {
  const skillsForm = document.getElementById("skillsForm");
  const contactForm = document.getElementById("contactForm");
  
  if (skillsForm) {
    const skillsInput = document.getElementById("skillsInput");
    if (skillsInput) {
      updateSkillsDisplay(skillsInput.value);
    }
    
    skillsForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const skillsText = document.getElementById("skillsInput").value;
      updateSkillsDisplay(skillsText);
    });
  }
  
  if (contactForm) {
    updateContactDisplay();
    
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      updateContactDisplay();
    });
  }
}

// Event Listeners
window.addEventListener("load", hideLoadingScreen);
window.addEventListener("scroll", updateActiveNavLink);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

monoModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("monospace-mode");
});

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  setupSectionObserver();
  setupFormListeners();
});