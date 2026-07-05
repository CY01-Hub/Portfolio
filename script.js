document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Immediate Preloader Safe Dismissal ---
  const loader = document.getElementById("loader");
  if (loader) {
    // Automatically hide preloader shortly after execution starts
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        if (loader.parentNode) loader.remove();
      }, 500);
    }, 150);
  }

  // --- 2. Interactive Background Glow Track ---
  const customCursor = document.getElementById("customCursor");
  if (customCursor) {
    document.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });
  }

  // --- 3. Scroll Engine Framework (Progress & Top Button) ---
  const progressBar = document.getElementById("progressBar");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 4. Responsive Header Visibility Controller ---
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (navbar) {
      if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // --- 5. Mobile Menu Navigation Drawer ---
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    if (hamburgerMenu && navMenu) {
      hamburgerMenu.classList.toggle("active");
      navMenu.classList.toggle("active");
    }
  };

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // --- 6. Dynamic Automated Typographic Engine ---
  const roles = [
    "Software Engineer",
    "C/Python Developer",
    "Systems Thinker",
    "Security Enthusiast",
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingSpan = document.querySelector(".typing-text");

  const runTypingEngine = () => {
    if (!typingSpan) return;
    const currentText = roles[roleIdx];

    if (isDeleting) {
      typingSpan.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingSpan.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentText.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 300;
    }

    setTimeout(runTypingEngine, speed);
  };

  if (typingSpan) {
    setTimeout(runTypingEngine, 600);
  }

  // --- 7. Intersection Observer for Scroll Animations ---
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // Animate progress bars if they exist inside revealed block
          const bars = entry.target.querySelectorAll(".skill-progress-bar");
          bars.forEach((bar) => {
            bar.style.width = bar.getAttribute("data-progress");
          });

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  scrollRevealElements.forEach((el) => revealObserver.observe(el));

  // --- 8. Navigation Active State Visibility Monitor ---
  const sections = document.querySelectorAll("section");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((sec) => navObserver.observe(sec));

  // --- 9. Tactical Component Interaction Ripple Engine ---
  const rippleButtons = document.querySelectorAll(".ripple");
  rippleButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // --- 10. Mouse Perspective Parallax Interaction ---
  const heroFrame = document.getElementById("home");
  const profileCard = document.querySelector(".profile-card-glass");

  if (heroFrame && profileCard) {
    heroFrame.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.clientX) / 40;
      const yAxis = (window.innerHeight / 2 - e.clientY) / 40;
      profileCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    heroFrame.addEventListener("mouseleave", () => {
      profileCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
      profileCard.style.transition = "transform 0.5s ease";
    });

    heroFrame.addEventListener("mouseenter", () => {
      profileCard.style.transition = "none";
    });
  }

  // --- 11. Light/Dark UI Theme Controller ---
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    const toggleIcon = themeToggleBtn.querySelector("i");
    const currentTheme = localStorage.getItem("theme") || "dark";

    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "light" && toggleIcon) {
      toggleIcon.className = "fas fa-sun";
    }

    themeToggleBtn.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        if (toggleIcon) toggleIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        if (toggleIcon) toggleIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "dark");
      }
    });
  }
});

const profileCardObj = document.querySelector(".profile-card-glass");
const customCursorObj = document.getElementById("customCursor");
const imageBgGlow = document.querySelector(".image-bg-glow");

if (profileCardObj) {
  profileCardObj.addEventListener("mouseenter", () => {
    if (customCursorObj) customCursorObj.style.opacity = "0";
    if (imageBgGlow) imageBgGlow.style.opacity = "0";
  });

  profileCardObj.addEventListener("mouseleave", () => {
    if (customCursorObj) customCursorObj.style.opacity = "1";
    if (imageBgGlow) imageBgGlow.style.opacity = "0.7"; // returns to original opacity
  });
}
