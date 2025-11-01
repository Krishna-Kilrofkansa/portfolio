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
 * Toggles the visibility of skill category content
 * @param {HTMLElement} header - The clicked header element
 */
function toggleSkillCategory(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.toggle-arrow');
  
  if (content.classList.contains('collapsed')) {
    content.classList.remove('collapsed');
    arrow.style.transform = 'rotate(90deg)';
  } else {
    content.classList.add('collapsed');
    arrow.style.transform = 'rotate(0deg)';
  }
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

/**
 * Scroll to top functionality
 */
function setupScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Search functionality
 */
function setupSearch() {
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchToggle = document.getElementById('searchToggle');
  const closeSearch = document.getElementById('closeSearch');
  
  const searchData = [
    { title: 'Python', content: 'Programming language', section: 'skills' },
    { title: 'Machine Learning', content: 'AI/ML expertise', section: 'skills' },
    { title: 'React.js', content: 'Frontend framework', section: 'skills' },
    { title: 'AWS', content: 'Cloud services', section: 'skills' },
    { title: 'Smart India Hackathon', content: 'SIH Finalist', section: 'accomplishments' },
    { title: 'VIT Chennai', content: 'Computer Science student', section: 'about' }
  ];
  
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
  });
  
  closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
  
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  });
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query)
    );
    
    searchResults.innerHTML = results.map(result => `
      <div class="search-result" onclick="navigateToSection('${result.section}')">
        <div class="search-result-title">${result.title}</div>
        <div class="search-result-content">${result.content}</div>
      </div>
    `).join('');
  });
}

/**
 * Navigate to section from search
 */
function navigateToSection(sectionId) {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

/**
 * Typewriter effect for roles
 */
function setupTypewriter() {
  const roles = [
    'Software Engineer Intern',
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Computer Science Student',
    'Problem Solver',
    'Tech Innovator'
  ];
  
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  setTimeout(type, 4000);
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
  setupScrollToTop();
  setupSearch();
  setupTypewriter();
  
  // Initialize skill categories as collapsed
  document.querySelectorAll('.skill-content').forEach(content => {
    content.classList.add('collapsed');
  });
});