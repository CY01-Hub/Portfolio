/* ============================================================
   PORTFOLIO — PREMIUM ANIMATION & INTERACTION ENGINE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ========================================================
       GLOBAL SETTINGS
       ======================================================== */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  /* ========================================================
       PRELOADER
       ======================================================== */

  const loader = document.getElementById("loader");

  if (loader) {
    const progressBar = document.getElementById("loader-progress-bar");

    const percent = document.getElementById("loader-percent");

    const status = document.getElementById("loader-status");

    const messages = [
      "INITIALIZING SYSTEM",
      "LOADING BACKEND",
      "CONNECTING AI MODULES",
      "LOADING SECURITY PROTOCOLS",
      "COMPILING PORTFOLIO",
      "SYSTEM READY",
    ];

    let progress = 0;

    const loaderInterval = setInterval(() => {
      progress += Math.random() * 3 + 1.5;

      if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
      }

      const value = Math.floor(progress);

      if (progressBar) {
        progressBar.style.width = `${value}%`;
      }

      if (percent) {
        percent.textContent = `${value}%`;
      }

      if (status) {
        const index = Math.min(Math.floor(value / 17), messages.length - 1);

        status.textContent = messages[index];
      }

      if (value >= 100) {
        setTimeout(() => {
          loader.classList.add("loaded");

          setTimeout(() => {
            if (loader && loader.parentNode) {
              loader.remove();
            }
          }, 700);
        }, 250);
      }
    }, 70);
  }

  /* ========================================================
       CUSTOM CURSOR
       ======================================================== */

  const cursorDot = document.getElementById("cursorDot");

  const cursorOutline = document.getElementById("cursorOutline");

  if (cursorDot && cursorOutline && finePointer && !reduceMotion) {
    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      },
      { passive: true },
    );

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.14;
      outlineY += (mouseY - outlineY) * 0.14;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const cursorTargets = document.querySelectorAll(
      "a, button, input, textarea, " +
        ".glass, .tag, .glow-box, " +
        ".project-card, .f-card, " +
        ".skill-category-block",
    );

    cursorTargets.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
      });
    });
  }

  /* ========================================================
       BACKGROUND CODE / PARTICLE NETWORK
       ======================================================== */

  const canvas = document.getElementById("bg-canvas");

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const tokens = [
      "def",
      "class",
      "return",
      "Python",
      "Flask",
      "MySQL",
      "SQL",
      "REST API",
      "JSON",
      "AI",
      "LLM",
      "API",
      "JWT",
      "SSH",
      "TCP",
      "UDP",
      "AES",
      "RSA",
      "HASH",
      "CYBER",
      "0101",
      "1010",
      "O(1)",
      "O(log n)",
      "O(n)",
      "SELECT *",
      "async",
      "await",
      "lambda",
      "git",
      "push",
      "pull",
      "404",
      "NULL",
      "0xFF",
      "{ }",
      "[ ]",
      "</>",
      "=>",
      "&&",
      "||",
      ";",
    ];

    const particles = [];

    const particleCount = Math.min(Math.floor(width / 20), 60);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.vx = (Math.random() - 0.5) * 0.45;

        this.vy = (Math.random() - 0.5) * 0.45;

        this.text = tokens[Math.floor(Math.random() * tokens.length)];

        this.fontSize = Math.floor(Math.random() * 5) + 10;

        this.alpha = Math.random() * 0.22 + 0.06;
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
        const theme = document.documentElement.getAttribute("data-theme");

        ctx.fillStyle =
          theme === "light"
            ? `rgba(37,99,235,${this.alpha})`
            : `rgba(96,165,250,${this.alpha})`;

        ctx.font = `${this.fontSize}px monospace`;

        ctx.fillText(this.text, this.x, this.y);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouse = {
      x: -1000,
      y: -1000,
    };

    window.addEventListener(
      "mousemove",
      (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      },
      { passive: true },
    );

    function animateBackground() {
      ctx.clearRect(0, 0, width, height);

      const theme = document.documentElement.getAttribute("data-theme");

      const lineColor =
        theme === "light" ? "rgba(37,99,235,.08)" : "rgba(59,130,246,.08)";

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;

          const dy = particle.y - particles[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = 1;

            ctx.moveTo(particle.x, particle.y);

            ctx.lineTo(particles[j].x, particles[j].y);

            ctx.stroke();
          }
        }

        const mouseDX = particle.x - mouse.x;

        const mouseDY = particle.y - mouse.y;

        const mouseDistance = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);

        if (mouseDistance < 160) {
          ctx.beginPath();

          ctx.strokeStyle =
            theme === "light" ? "rgba(37,99,235,.18)" : "rgba(96,165,250,.20)";

          ctx.lineWidth = 1;

          ctx.moveTo(particle.x, particle.y);

          ctx.lineTo(mouse.x, mouse.y);

          ctx.stroke();
        }
      });

      requestAnimationFrame(animateBackground);
    }

    animateBackground();

    window.addEventListener(
      "resize",
      () => {
        width = canvas.width = window.innerWidth;

        height = canvas.height = window.innerHeight;
      },
      { passive: true },
    );
  }

  /* ========================================================
       SCROLL PROGRESS
       ======================================================== */

  const progressBar = document.getElementById("progressBar");

  const backToTop = document.getElementById("backToTop");

  let scrollTicking = false;

  function updateScrollUI() {
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }

    scrollTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateScrollUI);

        scrollTicking = true;
      }
    },
    { passive: true },
  );

  updateScrollUI();

  /* ========================================================
       BACK TO TOP
       ======================================================== */

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  /* ========================================================
       TYPING ENGINE
       ======================================================== */

  const typingElement = document.querySelector(".typing-text");

  const roles = [
    "Software Engineer",
    "C/Python Developer",
    "Backend Developer",
    "Systems Thinker",
    "Security Enthusiast",
    "AI Application Developer",
  ];

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typingEngine() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
      characterIndex++;

      typingElement.textContent = currentRole.substring(0, characterIndex);
    } else {
      characterIndex--;

      typingElement.textContent = currentRole.substring(0, characterIndex);
    }

    let speed = deleting ? 40 : 75;

    if (!deleting && characterIndex === currentRole.length) {
      speed = 1500;
      deleting = true;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;

      roleIndex = (roleIndex + 1) % roles.length;

      speed = 300;
    }

    setTimeout(typingEngine, speed);
  }

  if (typingElement) {
    setTimeout(typingEngine, 700);
  }

  /* ========================================================
       SCROLL REVEAL
       ======================================================== */

  const revealElements = document.querySelectorAll(".scroll-reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("revealed");
    });
  }

  /* ========================================================
       AUTOMATIC REVEAL TARGETS
       ======================================================== */

  if (!reduceMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".section-title, " +
        ".timeline-item, " +
        ".project-card, " +
        ".f-card, " +
        ".skill-category-block, " +
        ".contact-left, " +
        ".contact-right, " +
        ".about-left, " +
        ".about-right",
    );

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    targets.forEach((element, index) => {
      if (!element.classList.contains("scroll-reveal")) {
        element.classList.add("scroll-reveal");
      }

      element.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);

      observer.observe(element);
    });
  }

  /* ========================================================
       SKILL BARS
       ======================================================== */

  const skillBars = document.querySelectorAll(".skill-progress-bar");

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const bar = entry.target;

          const value = bar.getAttribute("data-progress");

          if (value) {
            bar.style.width = value;
          }

          requestAnimationFrame(() => {
            bar.classList.add("skill-animated");
          });

          observer.unobserve(bar);
        });
      },
      {
        threshold: 0.35,
      },
    );

    skillBars.forEach((bar) => {
      skillObserver.observe(bar);
    });
  } else {
    skillBars.forEach((bar) => {
      bar.style.width = bar.getAttribute("data-progress") || "0%";

      bar.classList.add("skill-animated");
    });
  }

  /* ========================================================
       3D PROJECT / CARD TILT
       ======================================================== */

  if (finePointer && !reduceMotion) {
    const cards = document.querySelectorAll(
      ".project-card, " +
        ".f-card, " +
        ".skill-category-block, " +
        ".timeline-card",
    );

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const percentX = x / rect.width;

        const percentY = y / rect.height;

        const rotateY = (percentX - 0.5) * 8;

        const rotateX = (0.5 - percentY) * 8;

        card.style.setProperty("--mx", `${x}px`);

        card.style.setProperty("--my", `${y}px`);

        card.style.transform = `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-6px)
                             scale(1.012)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";

        card.style.removeProperty("--mx");

        card.style.removeProperty("--my");
      });
    });
  }

  /* ========================================================
       CURSOR FOLLOWING LIGHT
       ======================================================== */

  if (finePointer && !reduceMotion) {
    const lightingElements = document.querySelectorAll(
      ".project-card, " +
        ".f-card, " +
        ".skill-category-block, " +
        ".timeline-card, " +
        ".glow-box",
    );

    lightingElements.forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();

        element.style.setProperty("--mx", `${event.clientX - rect.left}px`);

        element.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ========================================================
       MAGNETIC BUTTONS
       ======================================================== */

  if (finePointer && !reduceMotion) {
    const magneticElements = document.querySelectorAll(
      ".btn, " + ".theme-toggle, " + ".hamburger",
    );

    magneticElements.forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;

        const centerY = rect.top + rect.height / 2;

        const moveX = (event.clientX - centerX) * 0.14;

        const moveY = (event.clientY - centerY) * 0.14;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });
  }

  /* ========================================================
       HERO PARALLAX
       ======================================================== */

  if (finePointer && !reduceMotion) {
    const hero = document.querySelector(".hero-section");

    const heroCard = document.querySelector(".profile-card-glass");

    if (hero && heroCard) {
      hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;

        const y = (event.clientY - rect.top) / rect.height - 0.5;

        heroCard.style.transform = `translate3d(
                            ${x * 10}px,
                            ${y * 8}px,
                            0
                        )
                        rotateY(${x * 4}deg)
                        rotateX(${-y * 3}deg)`;
      });

      hero.addEventListener("pointerleave", () => {
        heroCard.style.transform = "";
      });
    }
  }

  /* ========================================================
       CURSOR TRAIL
       ======================================================== */

  if (finePointer && !reduceMotion) {
    const trail = [];

    const trailLength = 7;

    window.addEventListener(
      "pointermove",
      (event) => {
        trail.push({
          x: event.clientX,
          y: event.clientY,
        });

        if (trail.length > trailLength) {
          trail.shift();
        }
      },
      { passive: true },
    );

    function renderTrail() {
      document
        .querySelectorAll(".cursor-trail-dot")
        .forEach((element) => element.remove());

      trail.forEach((point, index) => {
        const dot = document.createElement("span");

        dot.className = "cursor-trail-dot";

        const scale = (index + 1) / trail.length;

        const size = 3 + scale * 5;

        dot.style.cssText = `
                        position: fixed;
                        left: ${point.x}px;
                        top: ${point.y}px;
                        width: ${size}px;
                        height: ${size}px;
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 99990;
                        background: var(--secondary);
                        opacity: ${scale * 0.24};
                        transform: translate(-50%, -50%);
                        box-shadow:
                            0 0 ${size * 2}px
                            var(--glow-color);
                    `;

        document.body.appendChild(dot);
      });

      requestAnimationFrame(renderTrail);
    }

    renderTrail();
  }

  /* ========================================================
       RIPPLE EFFECT
       ======================================================== */

  document.querySelectorAll(".ripple").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (reduceMotion) {
        return;
      }

      const rect = button.getBoundingClientRect();

      const ripple = document.createElement("span");

      const size = Math.max(rect.width, rect.height);

      ripple.style.cssText = `
                            position: absolute;
                            width: ${size}px;
                            height: ${size}px;
                            left: ${event.clientX - rect.left - size / 2}px;
                            top: ${event.clientY - rect.top - size / 2}px;
                            border-radius: 50%;
                            background:
                                rgba(255,255,255,.22);
                            pointer-events: none;
                            transform: scale(0);
                            animation:
                                portfolioRipple
                                .65s ease-out forwards;
                        `;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  });

  /* ========================================================
       ACTIVE NAVIGATION
       ======================================================== */

  const sections = [...document.querySelectorAll("section[id]")];

  const navLinks = [...document.querySelectorAll(".nav-link")];

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${visible.target.id}`,
          );
        });
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }

  /* ========================================================
       SMOOTH NAVIGATION
       ======================================================== */

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* ========================================================
       THEME SWITCHER
       ======================================================== */

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    const icon = themeToggle.querySelector("i");

    const savedTheme = localStorage.getItem("theme") || "dark";

    document.documentElement.setAttribute("data-theme", savedTheme);

    if (savedTheme === "light" && icon) {
      icon.className = "fas fa-sun";
    }

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");

      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);

      localStorage.setItem("theme", newTheme);

      if (icon) {
        icon.className = newTheme === "light" ? "fas fa-sun" : "fas fa-moon";
      }

      if (!reduceMotion) {
        document.body.classList.add("theme-switching");

        setTimeout(() => {
          document.body.classList.remove("theme-switching");
        }, 500);
      }
    });
  }

  /* ========================================================
       MOBILE NAVIGATION
       ======================================================== */

  const hamburger = document.getElementById("hamburgerMenu");

  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");

      navMenu.classList.toggle("active");

      document.body.classList.toggle("menu-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ========================================================
       SCROLL VELOCITY
       ======================================================== */

  if (!reduceMotion) {
    let previousScroll = window.scrollY;

    let velocity = 0;

    function calculateVelocity() {
      velocity = Math.abs(window.scrollY - previousScroll);

      document.documentElement.style.setProperty(
        "--scroll-velocity",
        Math.min(velocity / 20, 1).toFixed(2),
      );

      previousScroll = window.scrollY;

      requestAnimationFrame(calculateVelocity);
    }

    requestAnimationFrame(calculateVelocity);
  }

  /* ========================================================
       KEYBOARD NAVIGATION
       ======================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("pointerdown", () => {
    document.body.classList.remove("keyboard-nav");
  });

  /* ========================================================
       DYNAMIC PROJECT LOGO
       ======================================================== */

  window.setProjectLogo = function (elementId, imageName, altText) {
    const image = document.getElementById(elementId);

    if (image) {
      image.src = `images/${imageName}`;

      image.alt = `${altText} Logo`;
    }
  };

  /* ========================================================
       INTERACTIVE TERMINAL
       Ctrl + K / Cmd + K
       ======================================================== */

  let terminalOpen = false;
  let terminalElement = null;

  function createTerminal() {
    if (terminalElement) {
      return;
    }

    terminalElement = document.createElement("div");

    terminalElement.id = "portfolio-terminal";

    terminalElement.innerHTML = `
            <div class="terminal-window">

                <div class="terminal-header">
                    <div class="terminal-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div class="terminal-title">
                        DHRUBO.DEV TERMINAL
                    </div>

                    <button
                        class="terminal-close"
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <div
                    class="terminal-output"
                    id="terminal-output"
                >
                    <div>
                        DHRUBO.DEV SYSTEM
                    </div>

                    <div>
                        Type <span>help</span>
                        to see available commands.
                    </div>
                </div>

                <div class="terminal-input-row">

                    <span class="terminal-prompt">
                        $
                    </span>

                    <input
                        id="terminal-input"
                        type="text"
                        autocomplete="off"
                        spellcheck="false"
                    />

                </div>

            </div>
        `;

    document.body.appendChild(terminalElement);

    const closeButton = terminalElement.querySelector(".terminal-close");

    const input = terminalElement.querySelector("#terminal-input");

    closeButton.addEventListener("click", closeTerminal);

    terminalElement.addEventListener("click", () => {
      input.focus();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        executeTerminalCommand(input.value);

        input.value = "";
      }

      if (event.key === "Escape") {
        closeTerminal();
      }
    });
  }

  function openTerminal() {
    createTerminal();

    terminalOpen = true;

    terminalElement.classList.add("terminal-open");

    setTimeout(() => {
      const input = document.getElementById("terminal-input");

      if (input) {
        input.focus();
      }
    }, 100);
  }

  function closeTerminal() {
    if (!terminalElement) {
      return;
    }

    terminalOpen = false;

    terminalElement.classList.remove("terminal-open");
  }

  function terminalPrint(text, className = "") {
    const output = document.getElementById("terminal-output");

    if (!output) {
      return;
    }

    const line = document.createElement("div");

    line.className = className;

    line.innerHTML = text;

    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
  }

  function executeTerminalCommand(command) {
    const input = command.trim().toLowerCase();

    if (!input) {
      return;
    }

    terminalPrint(`$ ${command}`, "terminal-command");

    switch (input) {
      case "help":
        terminalPrint(
          `
                    <span>Available commands:</span>
                    `,
        );

        terminalPrint("about");

        terminalPrint("skills");

        terminalPrint("projects");

        terminalPrint("education");

        terminalPrint("contact");

        terminalPrint("clear");

        terminalPrint("status");

        terminalPrint("exit");

        break;

      case "about":
        terminalPrint(
          "Computer Science student focused on Python, backend engineering, AI applications and systems.",
        );

        break;

      case "skills":
        terminalPrint(
          "Python • Flask • MySQL • SQLAlchemy • REST APIs • AI/LLM Integration",
        );

        break;

      case "projects":
        terminalPrint("ClinixParse AI");

        terminalPrint("PathForge AI");

        terminalPrint("Synthetix AI");

        terminalPrint("ResuMate AI");

        break;

      case "education":
        terminalPrint("B.Tech Computer Science Engineering");

        terminalPrint("Currently pursuing Computer Science Engineering.");

        break;

      case "contact":
        terminalPrint("Navigate to the Contact section below.");

        document.getElementById("contact")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
        });

        break;

      case "status":
        terminalPrint("SYSTEM: ONLINE");

        terminalPrint("BACKEND: READY");

        terminalPrint("AI MODULES: READY");

        terminalPrint("SECURITY: MONITORING");

        break;

      case "clear":
        const output = document.getElementById("terminal-output");

        if (output) {
          output.innerHTML = "";
        }

        break;

      case "exit":
        closeTerminal();

        break;

      default:
        terminalPrint(`Command not found: ${command}`);

        terminalPrint(`Type "help" for available commands.`);
    }
  }

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();

      if (terminalOpen) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }

    if (event.key === "Escape" && terminalOpen) {
      closeTerminal();
    }
  });

  /* ========================================================
       TERMINAL STYLES
       ======================================================== */

  const terminalStyle = document.createElement("style");

  terminalStyle.textContent = `

        #portfolio-terminal {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background:
                rgba(2, 6, 23, .72);
            backdrop-filter:
                blur(12px);
            -webkit-backdrop-filter:
                blur(12px);
            opacity: 0;
            visibility: hidden;
            transition:
                opacity .35s ease,
                visibility .35s ease;
        }

        #portfolio-terminal.terminal-open {
            opacity: 1;
            visibility: visible;
        }

        .terminal-window {
            width: min(760px, 100%);
            max-height: 75vh;
            overflow: hidden;

            background:
                rgba(3, 7, 18, .96);

            border:
                1px solid
                rgba(96,165,250,.35);

            border-radius:
                14px;

            box-shadow:
                0 30px 100px
                rgba(0,0,0,.6),

                0 0 50px
                rgba(59,130,246,.15);

            transform:
                translateY(30px)
                scale(.95);

            transition:
                transform .45s
                cubic-bezier(.16,1,.3,1);
        }

        #portfolio-terminal.terminal-open
        .terminal-window {
            transform:
                translateY(0)
                scale(1);
        }

        .terminal-header {
            height: 48px;
            display: flex;
            align-items: center;
            padding: 0 16px;

            border-bottom:
                1px solid
                rgba(148,163,184,.12);
        }

        .terminal-dots {
            display: flex;
            gap: 7px;
        }

        .terminal-dots span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background:
                rgba(148,163,184,.35);
        }

        .terminal-title {
            flex: 1;
            text-align: center;

            font-family:
                monospace;

            font-size: 12px;
            letter-spacing: 1.5px;

            color:
                rgba(148,163,184,.75);
        }

        .terminal-close {
            border: none;
            background: transparent;

            color:
                rgba(226,232,240,.7);

            font-size: 25px;
            cursor: pointer;

            transition:
                color .2s ease,
                transform .25s ease;
        }

        .terminal-close:hover {
            color: #fff;
            transform: rotate(90deg);
        }

        .terminal-output {
            height: 420px;
            overflow-y: auto;
            padding: 24px;

            font-family:
                "Courier New",
                monospace;

            font-size: 14px;
            line-height: 1.8;

            color:
                #94a3b8;
        }

        .terminal-output span {
            color:
                #60a5fa;
        }

        .terminal-command {
            color:
                #e2e8f0;

            margin-top: 8px;
        }

        .terminal-input-row {
            display: flex;
            align-items: center;
            gap: 10px;

            padding:
                14px 20px;

            border-top:
                1px solid
                rgba(148,163,184,.12);
        }

        .terminal-prompt {
            color:
                #60a5fa;

            font-family:
                monospace;

            font-weight: 700;
        }

        #terminal-input {
            flex: 1;

            border: none;
            outline: none;

            background: transparent;

            color: #e2e8f0;

            font-family:
                "Courier New",
                monospace;

            font-size: 14px;
        }

        @media (max-width: 600px) {

            .terminal-output {
                height: 50vh;
                padding: 18px;
            }

            .terminal-window {
                max-height: 80vh;
            }

        }

    `;

  document.head.appendChild(terminalStyle);

  /* ========================================================
       GLOBAL ANIMATION KEYFRAMES
       ======================================================== */

  const animationStyle = document.createElement("style");

  animationStyle.textContent = `

        @keyframes portfolioRipple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }

        @keyframes terminalBlink {
            50% {
                opacity: 0;
            }
        }

        body.theme-switching::after {
            content: "";

            position: fixed;
            inset: 0;

            z-index: 99997;

            pointer-events: none;

            background:
                radial-gradient(
                    circle at center,
                    rgba(96,165,250,.16),
                    transparent 55%
                );

            animation:
                themeFlash .5s
                ease-out forwards;
        }

        @keyframes themeFlash {

            from {
                opacity: 1;
                transform: scale(.7);
            }

            to {
                opacity: 0;
                transform: scale(1.2);
            }

        }

        body.keyboard-nav
        a:focus-visible,

        body.keyboard-nav
        button:focus-visible {

            outline:
                2px solid
                var(--secondary);

            outline-offset:
                5px;

            box-shadow:
                0 0 20px
                var(--glow-color);
        }

    `;

  document.head.appendChild(animationStyle);

  /* ========================================================
       CLEANUP CURSOR TRAIL
       ======================================================== */

  window.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget && !event.toElement) {
      document
        .querySelectorAll(".cursor-trail-dot")
        .forEach((element) => element.remove());
    }
  });

  /* ========================================================
       PREVENT HORIZONTAL OVERFLOW
       ======================================================== */

  document.documentElement.style.overflowX = "hidden";
});
