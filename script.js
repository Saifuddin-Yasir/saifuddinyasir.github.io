"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");

function updateHeader() {
  const scrolled = window.scrollY > 24;
  header?.classList.toggle("scrolled", scrolled);
  backToTop?.classList.toggle("visible", window.scrollY > 700);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function closeMenu() {
  navToggle?.setAttribute("aria-expanded", "false");
  navLinks?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

// Scroll reveal animations.
const revealElements = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -45px" });

  revealElements.forEach((element) => revealObserver.observe(element));
}

// Highlight the active navigation item.
const sections = document.querySelectorAll("main section[id]");
const menuAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      menuAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-40% 0px -52%", threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
}

// Typing effect in the hero section.
const typedRole = document.getElementById("typed-role");
const roleWords = ["Machine Learning", "Artificial Intelligence", "Embedded Systems", "DIY Engineering"];

if (typedRole && !prefersReducedMotion) {
  let wordIndex = 0;
  let charIndex = roleWords[0].length;
  let deleting = true;

  const typeLoop = () => {
    const word = roleWords[wordIndex];

    if (deleting) {
      charIndex -= 1;
      typedRole.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % roleWords.length;
      }
    } else {
      charIndex += 1;
      typedRole.textContent = roleWords[wordIndex].slice(0, charIndex);
      if (charIndex === roleWords[wordIndex].length) deleting = true;
    }

    const pause = deleting && charIndex === roleWords[wordIndex]?.length ? 1150 : deleting ? 45 : 78;
    window.setTimeout(typeLoop, pause);
  };

  window.setTimeout(typeLoop, 1300);
}

// Subtle 3D tilt for cards on pointer devices.
if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -7;
      const rotateY = x * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.16}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

// Lightweight animated particle background — no external library required.
const canvas = document.getElementById("particle-canvas");
if (canvas instanceof HTMLCanvasElement && !prefersReducedMotion) {
  const context = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      radius: Math.random() * 1.25 + 0.4,
      alpha: Math.random() * 0.38 + 0.1
    };
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(80, Math.max(28, Math.floor(width / 22)));
    particles = Array.from({ length: count }, makeParticle);
  }

  function animateParticles() {
    if (!context) return;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(125, 211, 252, ${particle.alpha})`;
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 115) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(34, 211, 238, ${0.045 * (1 - distance / 115)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    });

    animationFrame = window.requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  animateParticles();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
    } else {
      animateParticles();
    }
  });
}

const year = document.getElementById("current-year");
if (year) year.textContent = String(new Date().getFullYear());
