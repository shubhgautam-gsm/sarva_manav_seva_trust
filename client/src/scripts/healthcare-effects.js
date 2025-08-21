// healthcare-effects.js
// Professional interactive effects for Serva Manav Seva Sarvajanik Trust website

(() => {
  const PARTICLE_COUNT = 40;
  const BUBBLE_COUNT = 10;
  const SPARK_COUNT = 25;
  const BODY = document.body;
  let particles = [];
  let bubbles = [];
  let sparks = [];

  // Utility to create DOM element with classes and styles
  function createElement(tag, classNames, styles = {}) {
    const el = document.createElement(tag);
    if (classNames) el.className = classNames;
    Object.assign(el.style, styles);
    return el;
  }

  // Particle class for floating medical particles
  class Particle {
    constructor() {
      this.el = createElement('div', 'health-particle');
      this.reset();
      BODY.appendChild(this.el);
    }
    reset() {
      this.x = Math.random() * window.innerWidth;
      this.y = window.innerHeight + 20 + Math.random() * 100;
      this.size = 2 + Math.random() * 3;
      this.speedY = 0.5 + Math.random() * 1.2;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = 0;
      this.life = 0;
      this.maxLife = 500 + Math.random() * 500;
      this.updateStyle();
    }
    updateStyle() {
      this.el.style.left = `${this.x}px`;
      this.el.style.top = `${this.y}px`;
      this.el.style.width = `${this.size}px`;
      this.el.style.height = `${this.size}px`;
      this.el.style.opacity = this.opacity;
    }
    update() {
      if(this.life < this.maxLife){
        this.x += this.speedX;
        this.y -= this.speedY;
        this.opacity = Math.min(1, this.life / 100);
        this.life++;
        this.updateStyle();
      } else {
        this.reset();
        this.life = 0;
      }
    }
    remove() {
      if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
  }

  // Bubble class for gentle bubbles rising
  class Bubble {
    constructor(i) {
      this.el = createElement('span', 'bubble');
      this.delay = i * 500;
      this.initPosition(i);
      BODY.appendChild(this.el);
    }
    initPosition(i) {
      const left = 5 + (i * 9) + (Math.random() * 4);
      this.el.style.left = `${left}%`;
      this.el.style.width = `${14 + i * 2}px`;
      this.el.style.height = `${14 + i * 2}px`;
      this.el.style.animationDelay = `${this.delay}ms`;
    }
    remove() {
      if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
  }

  // Spark class for celebration bursts on click
  class Spark {
    constructor() {
      this.el = createElement('div', 'care-spark');
      this.reset();
      BODY.appendChild(this.el);
    }
    reset() {
      this.x = -100; // offscreen initially
      this.y = -100;
      this.size = 4 + Math.random() * 4;
      this.opacity = 0;
      this.life = 0;
      this.duration = 60 + Math.random() * 40;
      this.updateStyle();
    }
    updateStyle() {
      this.el.style.left = `${this.x}px`;
      this.el.style.top = `${this.y}px`;
      this.el.style.width = `${this.size}px`;
      this.el.style.height = `${this.size}px`;
      this.el.style.opacity = this.opacity;
      this.el.style.transform = `scale(${this.opacity})`;
    }
    trigger(x, y) {
      this.x = x + (Math.random() * 20 - 10);
      this.y = y + (Math.random() * 20 - 10);
      this.opacity = 1;
      this.life = 0;
      this.updateStyle();
      this.el.style.animation = `careSparkle 2s ease forwards`;
      setTimeout(() => this.reset(), 1500);
    }
    remove() {
      if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
  }

  // Initialize particles
  function initParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  // Initialize bubbles
  function initBubbles() {
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push(new Bubble(i));
    }
  }

  // Initialize sparks
  function initSparks() {
    for (let i = 0; i < SPARK_COUNT; i++) {
      sparks.push(new Spark());
    }
  }

  // Animate loop for particles
  function animateParticles() {
    particles.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
  }

  // Spark trigger helper (e.g. on donation button click)
  function triggerCelebration(x, y) {
    for (let i = 0; i < 10; i++) {
      const spark = sparks[i];
      if (spark) spark.trigger(x, y);
    }
  }

  // Scroll reveal animations for elements with .animate-in class
  function setupScrollReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => {
      observer.observe(el);
    });
  }

  // Setup click listeners on donate buttons to trigger celebration
  function setupDonateClicks() {
    document.body.addEventListener('click', event => {
      if (event.target.closest('.donate-btn')) {
        const rect = event.target.getBoundingClientRect();
        triggerCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  }

  // Initialize all effects
  function init() {
    initParticles();
    initBubbles();
    initSparks();
    animateParticles();
    setupScrollReveal();
    setupDonateClicks();
  }

  // Wait for DOM ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 500);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 500);
    });
  }

  // Export for manual control if needed
  window.healthcareEffects = {
    triggerCelebration
  };
})();
