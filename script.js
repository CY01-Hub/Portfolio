document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Preloader Safe Dismissal ---
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        if (loader.parentNode) loader.remove();
      }, 500);
    }, 150);
  }

  // --- 2. Custom Dual Cursor System with Active Animations ---
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");

  if (cursorDot && cursorOutline && window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Universal Hover Activation for all Cards, Buttons, and Glow Elements
    const hoverables = document.querySelectorAll(
      "a, button, input, textarea, .glass, .tag, .glow-box, .project-card, .skill-category-block"
    );
    
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-hover"));
    });
  }

  // --- 3. Expanded Interactive Code Particle Canvas Engine ---
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Enriched technical code symbols
    const tokens = [
      "def", "class", "SELECT * FROM", "O(1)", "0101", "{ }", "</>", "=>", "&&", 
      "git commit", "O(log n)", "async/await", "lambda", "malloc()", "0xFF", 
      "REST API", "SQL", "Thread.run()", "[ ]", "struct"
    ];
    
    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.text = tokens[Math.floor(Math.random() * tokens.length)];
        this.fontSize = Math.floor(Math.random() * 5) + 11;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        ctx.fillStyle = isLight ? "rgba(37, 99, 235, 0.25)" : "rgba(96, 165, 250, 0.28)";
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mousePos = { x: -1000, y: -1000 };
    window.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    const animateBg = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const lineColor = isLight ? "rgba(37, 99, 235, 0.08)" : "rgba(59, 130, 246, 0.08)";

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect neighboring code particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Active cursor web connections
        const mdx = particles[i].x - mousePos.x;
        const mdy = particles[i].y - mousePos.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 160) {
          ctx.beginPath();
          ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.2)" : "rgba(96, 165, 250, 0.22)";
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateBg);
    };

    animateBg();
  }

  // --- 4. Scroll Engine (Progress Bar & Back to Top) ---
  const progressBar = document.getElementById("progressBar");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
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

  // --- 5. Navigation Bar Hide on Scroll ---
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

  // --- 6. Mobile Drawer ---
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

  // --- 7. Typing Text Engine ---
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

  // --- 8. Reveal Observer for Fade Elements and Skill Bars ---
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          const bars = entry.target.querySelectorAll(".skill-progress-bar");
          bars.forEach((bar) => {
            bar.style.width = bar.getAttribute("data-progress");
          });

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  scrollRevealElements.forEach((el) => revealObserver.observe(el));

  // --- 9. Theme Controller ---
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