/**
 * IUCEE-RIT Website Main JavaScript
 * Handles all interactive functionality, 3D effects, and responsive behavior
 * @version 2.0.0
 * @author IUCEE-RIT Development Team
 */

class IUCEEWebsite {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.particles = []
    this.isLoading = true
    this.isMobile = window.innerWidth <= 768
    this.galleryObserver = null;
    this.init()
  }

  /**
   * Initialize the website
   */
  async init() {
    try {
      console.log("[site] Initializing IUCEE website...")

      // Wait for DOM to be ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.setup())
      } else {
        this.setup()
      }
    } catch (error) {
      console.error("[site] Initialization error:", error)
      this.handleError(error)
    }
  }

  /**
   * Setup all website functionality
   */
  setup() {
    console.log("[site] Setting up website components...")
    this.checkEnrollmentStatus();
    // Initialize 3D background
    this.init3DBackground()

    // Setup navigation
    this.setupNavigation()

    // Load content
    this.loadContent()

    // Setup scroll animations
    this.setupScrollAnimations()

    // Setup event handlers
    this.setupEventHandlers()

    // Setup responsive behavior
    this.setupResponsive()

    // Hide loading screen
    setTimeout(() => this.hideLoadingScreen(), 2000)

    console.log("[site] Website setup complete")
  }

  /**
   * Initialize 3D particle background using Three.js
   */
  init3DBackground() {
    try {
      console.log("[site] Initializing 3D background...")

      const canvas = document.getElementById("bg-canvas")
      if (!canvas || !THREE) {
        console.warn("[site] Three.js not available, skipping 3D background")
        return
      }

      // Scene setup
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Create particles
      this.createParticles()

      // Position camera
      this.camera.position.z = 5

      // Start animation loop
      this.animate3D()

      console.log("[site] 3D background initialized successfully")
    } catch (error) {
      console.error("[site] 3D background initialization failed:", error)
    }
  }

  /**
   * Create floating particles for 3D background
   */
  createParticles() {
    const particleCount = this.isMobile ? 50 : 100
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      // Color (primary green theme)
      colors[i] = 0.02 // R
      colors[i + 1] = 0.59 // G
      colors[i + 2] = 0.41 // B
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: this.isMobile ? 0.02 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    })

    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)
  }

  /**
   * Animation loop for 3D background
   */
  animate3D() {
    requestAnimationFrame(() => this.animate3D())

    if (this.particles) {
      this.particles.rotation.x += 0.0005
      this.particles.rotation.y += 0.001
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  /**
   * Setup navigation functionality
   */
  setupNavigation() {
    console.log("[site] Setting up navigation...")

    const navbar = document.getElementById("navbar")
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden")

        // Animate mobile nav links
        mobileNavLinks.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add("animate")
          }, index * 100)
        })
      })
    }

    // Close mobile menu on link click
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        mobileNavLinks.forEach((l) => l.classList.remove("animate"))
      })
    })

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  setupScrollerNavigation(scrollerId, prevBtnId, nextBtnId) {
    const scroller = document.getElementById(scrollerId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!scroller || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', () => {
      const scrollAmount = scroller.clientWidth * 0.8;
      scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const scrollAmount = scroller.clientWidth * 0.8;
      scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /**
   * Load and render all content
   */
  loadContent() {
    console.log("[site] Loading content...")
    this.loadTimeline();
    this.loadProjects()
    this.loadEvents()
    this.loadAchievements();
    this.loadTeam()
    this.loadSdg();
    this.loadGallery()
    this.loadAlumni()
    this.loadSocialMedia();
    this.setupEventTabs()
  }

  setupScrollIndicatorObserver(scrollerId, indicatorId) {
    const scroller = document.getElementById(scrollerId);
    const indicator = document.getElementById(indicatorId);
    if (!scroller || !indicator) return;

    const cards = scroller.querySelectorAll(':scope > div');
    const totalCards = cards.length;
    if (totalCards === 0) {
      indicator.style.opacity = '0';
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardElement = entry.target;
          // Find the index of the intersecting card
          const cardIndex = Array.from(cards).indexOf(cardElement);
          if (cardIndex !== -1) {
            indicator.textContent = `${cardIndex + 1} / ${totalCards}`;
          }
        }
      });
    }, {
      root: scroller, // The scroller is the viewport
      threshold: 0.51 // Trigger when 51% of the card is visible
    });

    cards.forEach(card => observer.observe(card));
  }

  loadTimeline() {
    const timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer || !timelineEvents) return;

    timelineContainer.innerHTML = `
        <div class="timeline-line absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary to-accent h-full transform -translate-x-1/2 hidden md:block"></div>
    `;

    timelineEvents.forEach((event, index) => {
      const timelineItem = this.createTimelineItem(event, index);
      timelineItem.style.animationDelay = `${index * 0.15}s`;
      timelineContainer.appendChild(timelineItem);
    });
  }

  createTimelineItem(event, index) {
    const item = document.createElement("div");
    const isLeft = index % 2 === 0;

    item.className = `timeline-item mb-12 relative scroll-animate`;
    item.innerHTML = `
        <div class="flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}">
            <!-- Content Card -->
            <div class="timeline-content bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-700 w-full md:w-5/12">
                <span class="text-sm font-semibold text-primary">${event.year}</span>
                <h3 class="text-xl font-bold text-white mt-1 mb-2">${event.title}</h3>
                <p class="text-gray-400">${event.description}</p>
            </div>
            
            <!-- Center Dot -->
            <div class="timeline-dot-container flex justify-center w-full md:w-2/12">
                <div class="timeline-dot w-4 h-4 bg-primary rounded-full border-4 border-gray-900 relative z-10"></div>
            </div>
            
            <!-- Empty space for opposite side -->
            <div class="hidden md:block md:w-5/12"></div>
        </div>
    `;
    return item;
  }

  /**
   * Load and render achievements
   */
  loadAchievements() {
    const achievementsGrid = document.getElementById("achievements-grid");
    if (!achievementsGrid || !achievements) return;

    achievementsGrid.innerHTML = "";
    achievements.forEach((ach, index) => {
      const card = this.createAchievementCard(ach);
      card.style.animationDelay = `${index * 0.1}s`;
      achievementsGrid.appendChild(card);
    });
  }

  createAchievementCard(achievement) {
    const card = document.createElement("a");
    card.href = achievement.link;
    card.className = "achievement-card block bg-gray-800/50 backdrop-blur-md p-6 rounded-lg text-center border border-gray-700 scroll-animate";
    card.innerHTML = `
        <div class="text-4xl text-primary mb-4">${this.getIconSVG(achievement.icon)}</div>
        <h3 class="text-xl font-bold text-white mb-2">${achievement.title}</h3>
        <p class="text-gray-400">${achievement.description}</p>
    `;
    return card;
  }

  /**
   * Load and render alumni
   */
  loadAlumni() {
    const alumniScroller = document.getElementById("alumni-scroller");
    if (!alumniScroller || !alumni) return;

    alumniScroller.innerHTML = "";
    alumni.forEach((person, index) => {
      const card = this.createAlumniCard(person);
      card.style.animationDelay = `${index * 0.1}s`;
      alumniScroller.appendChild(card);
    });

    this.setupScrollerNavigation('alumni-scroller', 'alumni-prev', 'alumni-next');
    this.setupScrollIndicatorObserver('alumni-scroller', 'alumni-indicator');
  }

  createAlumniCard(person) {
    const card = document.createElement("div");
    card.className = "team-card scroll-animate transform-gpu cursor-pointer"; // Reusing team-card style
    card.innerHTML = `
        <img src="${person.image}" alt="${person.name}" loading="lazy">
        <h3 class="text-lg font-bold text-white mb-1">${person.name}</h3>
        <p class="text-sm text-gray-400 mb-4">${person.currentRole}</p>
        <div class="text-primary font-semibold hover:underline">
            View Details →
        </div>
    `;
    // Add click listener
    card.addEventListener('click', () => this.showDetailsPanel('alumni', person.name));
    return card;
  }

  /**
     * Load and render social media cards in footer
     */
  loadSocialMedia() {
    const container = document.getElementById("social-media-links");
    if (!container || !socialMedia) return;

    container.innerHTML = "";
    socialMedia.forEach(social => {
      const card = document.createElement("a");
      card.href = social.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "social-card block bg-gray-800/50 backdrop-blur-md p-6 rounded-lg text-center border border-gray-700 hover:border-primary hover:-translate-y-2 transition-all duration-300";

      card.innerHTML = `
        <div class="mb-4 flex justify-center" style="color: ${social.color};">${this.getIconSVG(social.icon)}</div>
        <h4 class="text-xl font-bold text-white mb-2">${social.name}</h4>
        <p class="text-gray-400 text-sm mb-4">${social.description}</p>
        <span class="font-semibold text-primary group-hover:underline">
          ${social.name === 'LinkedIn' ? 'Connect' : 'Follow'} →
        </span>
      `;
      container.appendChild(card);
    });
  }
  createSocialLink(social) {
    const a = document.createElement("a");
    a.href = social.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "social-link";
    a.innerHTML = this.getIconSVG(social.icon);
    return a;
  }

  /**
     * Helper function to get SVG icons by name
     */
  getIconSVG(iconName) {
    const icons = {
      users: '<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
      target: '<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      award: '<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>',
      globe: '<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8l2.293 2.293a1 1 0 11-1.414 1.414L4 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L2.586 8 1.293 6.707a1 1 0 011.414-1.414L5 6.586l2.293-2.293a1 1 0 011.414 0z"></path></svg>',
      github: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd"></path></svg>',
      linkedin: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>',
      twitter: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>',
      instagram: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.001c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.197-4.354-2.624-6.782-6.979-6.98C15.668 1.173 15.259 1.162 12 1.162z M12 7.163c-2.705 0-4.887 2.182-4.887 4.887s2.182 4.887 4.887 4.887 4.887-2.182 4.887-4.887-2.182-4.887-4.887-4.887zm0 7.773c-1.595 0-2.887-1.292-2.887-2.887s1.292-2.887 2.887-2.887 2.887 1.292 2.887 2.887-1.292 2.887-2.887 2.887zm4.905-6.883c-.622 0-1.125.503-1.125 1.125s.503 1.125 1.125 1.125 1.125-.503 1.125-1.125-.503-1.125-1.125-1.125z"></path></svg>'
    };
    return icons[iconName] || '';
  }
  /**
* Load and render projects
*/
  loadProjects() {
    const projectsScroller = document.getElementById("projects-scroller"); // Target the scroller now
    if (!projectsScroller || !projectsData) return;
    projectsScroller.innerHTML = "";
    projectsData.forEach((project, index) => {
      const projectCard = this.createProjectCard(project);
      projectCard.style.animationDelay = `${index * 0.1}s`;
      projectsScroller.appendChild(projectCard);
    });
    // Setup indicator after loading
    this.setupScrollIndicatorObserver('projects-scroller', 'projects-indicator');
    this.setupScrollerNavigation('projects-scroller', 'projects-prev', 'projects-next')
  }

  /**
   * Create project card element
   */
  createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card scroll-animate transform-gpu";
    card.innerHTML = `
        <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
        <div class="p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="badge-3d">${project.category}</span>
                <span class="text-sm text-gray-400">${project.year}</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">${project.title}</h3>
            <p class="text-gray-300 mb-4 line-clamp-2">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies.map((tech) => `<span class="text-xs bg-gray-700 px-2 py-1 rounded">${tech}</span>`).join("")}
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-primary font-semibold">${project.status}</span>
                <div class="text-primary font-semibold hover:underline">
                    View Details →
                </div>
            </div>
        </div>
    `;
    // Add click listener
    card.addEventListener('click', () => this.showDetailsPanel('project', project.id));
    return card;
  }

  /**
   * Sets up navigation for a gallery inside a modal
   */
  setupModalGallery(modal) {
    const scroller = modal.querySelector('.modal-gallery-scroller');
    const prevBtn = modal.querySelector('.modal-gallery-prev');
    const nextBtn = modal.querySelector('.modal-gallery-next');
    const images = scroller ? scroller.querySelectorAll('img') : [];

    if (!scroller || !prevBtn || !nextBtn || images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    prevBtn.addEventListener('click', () => {
      const scrollAmount = scroller.clientWidth;
      scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const scrollAmount = scroller.clientWidth;
      scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /**
    * Shows the details modal with dynamic content
    */
  showDetailsPanel(type, identifier) {
    const modal = document.getElementById("details-modal");
    const titleEl = document.getElementById("details-modal-title");
    const contentEl = document.getElementById("details-modal-content");
    let data = null;
    let contentHTML = '';

    switch (type) {
      case 'project':
        data = projectsData.find(p => p.id === identifier);
        if (data) {
          titleEl.textContent = data.title;

          const imageSlidesHTML = data.images && data.images.length > 0
            ? data.images.map(imgSrc => `<img src="${imgSrc}" alt="${data.title}" class="w-full h-full object-cover">`).join('')
            : '<p class="text-gray-500 flex items-center justify-center h-full">No images available.</p>';

          const galleryNavHTML = data.images && data.images.length > 1 ? `
            <button class="modal-gallery-nav modal-gallery-prev">&#x276E;</button>
            <button class="modal-gallery-nav modal-gallery-next">&#x276F;</button>
          ` : '';

          contentHTML = `
            <div class="flex flex-col md:flex-row gap-6">
              <div class="flex-1 order-2 md:order-1">
                <p class="text-gray-300 mb-4">${data.description}</p>
                <div class="mb-4">
                  <h4 class="font-bold text-primary mb-2">Technologies Used:</h4>
                  <div class="flex flex-wrap gap-2">
                    ${data.technologies.map(tech => `<span class="text-xs bg-gray-700 px-2 py-1 rounded">${tech}</span>`).join("")}
                  </div>
                </div>
                <div class="text-sm"><strong>Status:</strong> <span class="text-accent font-semibold">${data.status}</span></div>
                <div class="text-sm"><strong>Year:</strong> ${data.year}</div>
              </div>
              <div class="md:w-1/2 relative modal-gallery-container order-1 md:order-2">
                  <div class="modal-gallery-scroller">
                      ${imageSlidesHTML}
                  </div>
                  ${galleryNavHTML}
              </div>
            </div>
          `;
        }
        break;

      case 'team':
        data = teamData.find(m => m.name === identifier);
        if (data) {
          titleEl.textContent = data.name;
          contentHTML = `
            <img src="${data.image}" alt="${data.name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary">
            <h4 class="text-2xl font-bold text-center">${data.name}</h4>
            <p class="text-accent text-center mb-4">${data.role}</p>
            <p class="text-gray-400 text-center mb-6">${data.department}</p>
            <p class="text-gray-300 mb-4">${data.bio}</p>
            <div class="mb-4">
              <h4 class="font-bold text-primary mb-2">Expertise:</h4>
              <div class="flex flex-wrap gap-2">
                ${data.expertise.map(skill => `<span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">${skill}</span>`).join("")}
              </div>
            </div>
            ${data.publications ? `<div class="text-sm mb-1"><strong>Publications:</strong> ${data.publications}</div>` : ""}
            ${data.projects ? `<div class="text-sm mb-4"><strong>Projects:</strong> ${data.projects}</div>` : ""}
            ${data.link ? `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn-primary block text-center w-full py-2 rounded-lg mt-4">View Profile</a>` : ""}
          `;
        }
        break;

      case 'alumni':
        data = alumni.find(a => a.name === identifier);
        if (data) {
          titleEl.textContent = data.name;
          contentHTML = `
            <img src="${data.image}" alt="${data.name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary">
            <h4 class="text-2xl font-bold text-center">${data.name}</h4>
            <p class="text-accent text-center mb-6">${data.currentRole}</p>
            <p class="text-gray-300 mb-4 text-center">Our esteemed alumnus, now making an impact in the professional world.</p>
            <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn-primary block text-center w-full py-2 rounded-lg mt-4">View LinkedIn Profile</a>
          `;
        }
        break;

      case 'upcoming_event':
        data = eventsData.upcoming.find(e => e.id === identifier);
        if (data) {
          titleEl.textContent = data.title;
          const eventDate = new Date(data.date);
          const formattedDate = eventDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

          contentHTML = `
            <img src="${data.image}" alt="${data.title}" class="w-full h-48 object-cover rounded-lg mb-4">
            <p class="text-gray-300 mb-4">${data.description}</p>
            <div class="space-y-2 text-sm text-gray-200 border-t border-gray-700 pt-4 mt-4">
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Registered:</strong> ${data.registered} / ${data.capacity}</p>
            </div>
            <button class="btn-primary w-full py-3 rounded-lg font-semibold mt-6" onclick="website.registerForEvent(${data.id})">
                Register Now
            </button>
          `;
        }
        break;
    }

    if (data) {
      contentEl.innerHTML = contentHTML;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // If the type was a project, set up its gallery
      if (type === 'project') {
        this.setupModalGallery(modal);
      }
    }
  }

  /**
   * Hides the details modal
   */
  closeDetailsModal() {
    const modal = document.getElementById("details-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }

  /**
   * Load and render events
   */
  loadEvents() {
    this.loadUpcomingEvents()
    this.loadPastEvents()
  }

  /**
   * Load upcoming events
   */
  loadUpcomingEvents() {
    const upcomingScroller = document.getElementById("upcoming-events-scroller"); // Target the scroller now
    if (!upcomingScroller || !eventsData) return;
    upcomingScroller.innerHTML = "";

    // check if there are no upcoming events
    if (!eventsData.upcoming || eventsData.upcoming.length === 0) {
      const noEventsCard = document.createElement("div");
      noEventsCard.className = "event-card text-center p-6 bg-gray-800 rounded-lg text-gray-300";
      noEventsCard.innerHTML = `
      <h3 class="text-xl font-bold text-white mb-2">No Upcoming Events</h3>
      <p class="text-gray-400">Check back later for new updates.</p>
    `;
      upcomingScroller.appendChild(noEventsCard);
      return; // stop here
    }

    eventsData.upcoming.forEach((event, index) => {
      const eventCard = this.createUpcomingEventCard(event);
      eventCard.style.animationDelay = `${index * 0.1}s`;
      upcomingScroller.appendChild(eventCard);
    });
    this.setupScrollIndicatorObserver('upcoming-events-scroller', 'upcoming-indicator');
    this.setupScrollerNavigation('upcoming-events-scroller', 'upcoming-prev', 'upcoming-next');
  }

  /**
 * Load past events
 */
  loadPastEvents() {
    const pastScroller = document.getElementById("past-events-scroller"); // Target the scroller now
    if (!pastScroller || !eventsData) return;
    pastScroller.innerHTML = "";
    eventsData.past.forEach((event, index) => {
      const eventCard = this.createPastEventCard(event);
      eventCard.style.animationDelay = `${index * 0.1}s`;
      pastScroller.appendChild(eventCard);
    });
    this.setupScrollIndicatorObserver('past-events-scroller', 'past-indicator');
    this.setupScrollerNavigation('past-events-scroller', 'past-prev', 'past-next');
  }

  openApplicationModal() {
    const modal = document.getElementById("application-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  closeApplicationModal() {
    const modal = document.getElementById("application-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      document.getElementById("application-form").reset();
    }
  }
  async checkEnrollmentStatus() {
    try {
      // This sends a request to your backend API route
      const response = await fetch('/api/button-status');
      if (!response.ok) {
        throw new Error('Failed to fetch enrollment status');
      }
      const status = await response.json();
      const enrollBtn = document.getElementById('enrollBtn');

      if (enrollBtn) {
        if (status.enabled === false) {
          enrollBtn.disabled = true;
          enrollBtn.textContent = 'Enrollment Closed';
          this.enrollmentOpen = false;
        } else {
          enrollBtn.disabled = false;
          enrollBtn.textContent = 'Apply Now';
          this.enrollmentOpen = true;
        }
      }
    } catch (error) {
      console.error("Could not check enrollment status:", error);
      // Fallback: If the API fails, just disable the button
      const enrollBtn = document.getElementById('enrollBtn');
      if (enrollBtn) {
        enrollBtn.disabled = false;
        enrollBtn.textContent = 'Apply Now';
        this.enrollmentOpen = false;
      }
    }
  }

  async handleFormSubmit(e) { // Make the function async
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Disable the button to prevent multiple clicks
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Use fetch to send the data to your backend
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle errors from the server
        throw new Error('Server responded with an error');
      }

      alert("Application submitted successfully! We will contact you soon.");
      // FIX: Corrected function name from closeApplicationForm to closeApplicationModal
      this.closeApplicationModal();

    } catch (error) {
      console.error('Submission Error:', error);
      alert('There was a problem with your submission. Please try again.');
    }
  }

  /**
     * Create upcoming event card
     */
  createUpcomingEventCard(event) {
    const card = document.createElement("div")
    // Added 'cursor-pointer' to show it's clickable
    card.className = "event-card scroll-animate transform-gpu cursor-pointer"

    const eventDate = new Date(event.date)
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" loading="lazy" class="w-full h-48 object-cover rounded-lg mb-4">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="badge-3d">${event.category}</span>
                    <span class="text-sm text-accent">${event.time}</span>
                </div>
                <h3 class="text-xl font-bold text-white">${event.title}</h3>
                <p class="text-gray-300 text-sm line-clamp-2">${event.description}</p>
                <div class="space-y-2 text-sm text-gray-400">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                        </svg>
                        ${formattedDate}
                    </div>
                </div>
                <div class="pt-4 text-primary font-semibold hover:underline">
                    View Details & Register →
                </div>
            </div>
        `

    // Add click handler to open the details panel
    card.addEventListener('click', () => this.showDetailsPanel('upcoming_event', event.id));
    return card
  }

  /**
   * Create past event card with gallery functionality
   */
  createPastEventCard(event) {
    const card = document.createElement("div")
    card.className = "event-card past-event scroll-animate transform-gpu cursor-pointer"

    const eventDate = new Date(event.date)
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" loading="lazy" class="w-full h-48 object-cover rounded-lg mb-4">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="badge-3d">${event.category}</span>
                    <span class="text-sm text-gray-400">${formattedDate}</span>
                </div>
                <h3 class="text-xl font-bold text-white">${event.title}</h3>
                <p class="text-gray-300 text-sm">${event.description}</p>
                <div class="space-y-2 text-sm text-gray-400">
                    <div>📍 ${event.location}</div>
                    <div>👥 ${event.attendees} attendees</div>
                    ${event.projects ? `<div>🚀 ${event.projects} projects</div>` : ""}
                </div>
                <div class="pt-2">
                    <div class="text-xs text-primary font-semibold mb-2">Highlights:</div>
                    <ul class="text-xs text-gray-400 space-y-1">
                        ${event.highlights
        .slice(0, 2)
        .map((highlight) => `<li>• ${highlight}</li>`)
        .join("")}
                    </ul>
                </div>
            </div>
        `

    // Add click handler for gallery
    card.addEventListener("click", () => {
      this.showEventGallery(event)
    })

    return card
  }

  /**
   * Setup event tabs functionality
   */
  setupEventTabs() {
    const tabButtons = document.querySelectorAll(".event-tab-btn")
    const tabContents = document.querySelectorAll(".event-tab-content")

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab")

        // Update active tab button
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        // Show target content
        tabContents.forEach((content) => {
          if (content.id === `${targetTab}-events`) {
            content.classList.remove("hidden")
            content.classList.add("active")
          } else {
            content.classList.add("hidden")
            content.classList.remove("active")
          }
        })
      })
    })
  }

  /**
   * Show event gallery modal with pagination
   */
  showEventGallery(event) {
    const modal = document.getElementById("event-gallery-modal");
    const titleEl = document.getElementById("modal-event-title");
    const gridEl = document.getElementById("modal-gallery-grid");
    const modalContentContainer = gridEl.parentElement;

    // Clean up previous navigation controls if they exist from a prior opening
    const oldNav = modalContentContainer.querySelector('.modal-gallery-nav-controls');
    if (oldNav) {
      oldNav.remove();
    }

    if (!modal || !titleEl || !gridEl || !event.gallery || event.gallery.length === 0) return;

    titleEl.textContent = `${event.title} - Gallery`;

    // --- Pagination State & Logic ---
    let currentPage = 1;
    const imagesPerPage = this.isMobile ? 4 : 6;
    const totalPages = Math.ceil(event.gallery.length / imagesPerPage);

    // Create navigation controls container and append it
    const navEl = document.createElement('div');
    navEl.className = 'modal-gallery-nav-controls';
    modalContentContainer.appendChild(navEl);

    const renderPage = (page) => {
      currentPage = page;
      gridEl.innerHTML = ''; // Clear previous images
      gridEl.scrollTop = 0; // Scroll to top of grid when page changes

      const startIndex = (currentPage - 1) * imagesPerPage;
      const pageImages = event.gallery.slice(startIndex, startIndex + imagesPerPage);

      pageImages.forEach(image => {
        const imageSrc = typeof image === 'object' ? image.src : image;
        const caption = typeof image === 'object' ? image.caption : '';

        const figure = document.createElement("figure");
        figure.className = "relative group overflow-hidden rounded-lg";
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `${event.title} gallery image`;
        img.className = "w-full h-40 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110";
        img.loading = "lazy";
        figure.appendChild(img);

        if (caption) {
          const figcaption = document.createElement("figcaption");
          figcaption.className = "absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300";
          figcaption.textContent = caption;
          figure.appendChild(figcaption);
        }
        figure.addEventListener("click", () => this.showFullscreenImage(imageSrc, caption || event.title));
        gridEl.appendChild(figure);
      });

      // Update navigation controls' inner HTML
      navEl.innerHTML = `
        <button id="modal-gallery-prev" ${currentPage === 1 ? 'disabled' : ''}>&lt; Prev</button>
        <span class="text-sm text-gray-400 font-mono">${currentPage} / ${totalPages}</span>
        <button id="modal-gallery-next" ${currentPage === totalPages ? 'disabled' : ''}>Next &gt;</button>
      `;

      // Re-add event listeners for the new buttons
      navEl.querySelector('#modal-gallery-prev').addEventListener('click', () => renderPage(currentPage - 1));
      navEl.querySelector('#modal-gallery-next').addEventListener('click', () => renderPage(currentPage + 1));
    };

    renderPage(1); // Initial render of the first page
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  /**
   * Load and render team members
   */
  loadTeam() {
    const teamScroller = document.getElementById("team-scroller"); // Target the scroller now
    if (!teamScroller || !teamData) return;
    teamScroller.innerHTML = "";
    teamData.forEach((member, index) => {
      const memberCard = this.createTeamCard(member);
      memberCard.style.animationDelay = `${index * 0.1}s`;
      teamScroller.appendChild(memberCard);
    });
    this.setupScrollIndicatorObserver('team-scroller', 'team-indicator');
    this.setupScrollerNavigation('team-scroller', 'team-prev', 'team-next');
  }
  // ADD these new functions inside the IUCEEWebsite class in main.js
  loadSdg() {
    const sdgScroller = document.getElementById("sdg-scroller");
    // Ensure sdgData is defined in your data.js file
    if (!sdgScroller || typeof sdgData === 'undefined') return;

    sdgScroller.innerHTML = "";
    sdgData.forEach((goal, index) => {
      const sdgCard = this.createSdgCard(goal);
      sdgCard.style.animationDelay = `${index * 0.05}s`;
      sdgScroller.appendChild(sdgCard);
    });
    this.setupScrollIndicatorObserver('sdg-scroller', 'sdg-indicator');
    this.setupScrollerNavigation('sdg-scroller', 'sdg-prev', 'sdg-next');
  }

  createSdgCard(goal) {
    const card = document.createElement("div");
    card.className = "sdg-card scroll-animate transform-gpu cursor-pointer";

    // Add click handler to redirect to UN SDG page
    card.addEventListener("click", () => {
      const sdgUrl = `https://sdgs.un.org/goals/goal${goal.id}`;
      window.open(sdgUrl, "_blank", "noopener,noreferrer");
    });

    card.innerHTML = `
        <div class="sdg-icon">${goal.icon}</div>
        <h3 class="text-lg font-bold text-white mb-2">${goal.id}. ${goal.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${goal.description}</p>
        <div class="text-xs text-primary">Click to learn more →</div>
    `;
    return card;
  }
  /**
   * Create team member card
   */
  createTeamCard(member) {
    const card = document.createElement("div");
    card.className = "team-card scroll-animate transform-gpu cursor-pointer";

    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <h3 class="text-lg font-bold text-white mb-1">${member.name}</h3>
        <p class="text-primary font-semibold mb-2">${member.role}</p>
        <p class="text-sm text-gray-400 mb-3">${member.department}</p>
        <p class="text-xs text-gray-300 mb-4 line-clamp-2">${member.bio}</p>
        <div class="text-xs text-primary mt-2">Click to view details →</div>
    `;

    // Add click handler to open the new panel
    card.addEventListener("click", () => {
      this.showDetailsPanel('team', member.name);
    });

    return card;
  }
  /**
   * Load and render gallery
   */
  loadGallery() {
    const gallerySlider = document.getElementById("gallery-slider");
    if (!gallerySlider || !galleryData) return;

    gallerySlider.innerHTML = "";

    galleryData.forEach((item, index) => {
      // Pass the index to the create function
      const galleryItem = this.createGalleryItem(item, index);
      gallerySlider.appendChild(galleryItem);
    });

    // Setup observer and nav buttons after items are loaded
    this.setupGalleryObserver();
    this.setupGalleryNav();

    this.setupScrollerNavigation('gallery-slider', 'gallery-prev', 'gallery-next');
    this.setupScrollIndicatorObserver('gallery-slider', 'gallery-indicator');
  }

  /**
   * Create gallery item
   */
  createGalleryItem(item, index) {
    const div = document.createElement("div");
    div.className = "gallery-slide";
    div.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
        <div class="gallery-slide-overlay">
            <h3 class="text-xl font-bold">${item.title}</h3>
            <p class="text-sm">${item.description || ''}</p>
        </div>
    `;
    // Add a click listener that uses the index
    div.addEventListener("click", () => {
      const modalData = {
        title: item.title,
        gallery: item.fullGallery
      };
      this.showEventGallery(modalData);
    });
    return div;
  }
  setupGalleryObserver() {
    const slider = document.getElementById('gallery-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.gallery-slide');
    if (slides.length === 0) return;

    const options = { root: slider, threshold: 0.6 };
    this.galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      });
    }, options);

    slides.forEach(slide => this.galleryObserver.observe(slide));
  }

  setupGalleryNav() {
    const slider = document.getElementById("gallery-slider");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");

    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = slider.querySelector('.gallery-slide')?.clientWidth || 300;

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /**
   * Setup scroll animations
   */
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    }, observerOptions)

    // Observe all scroll-animate elements
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el)
    })

    // Timeline animation
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll(".timeline-item").forEach((el) => {
      timelineObserver.observe(el)
    })
  }

  /**
   * Setup event handlers
   */
  setupEventHandlers() {
    // --- Event Gallery Modal ---
    const eventModal = document.getElementById("event-gallery-modal");
    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn && eventModal) {
      closeModalBtn.addEventListener("click", () => {
        eventModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      });
      eventModal.addEventListener("click", (e) => {
        if (e.target === eventModal) {
          eventModal.classList.add("hidden");
          document.body.style.overflow = "auto";
        }
      });
    }

    // --- Application Form Modal ---
    const joinBtn = document.getElementById("join-mission-btn");
    const applyModal = document.getElementById("application-modal");
    const closeApplyBtn = document.getElementById("close-apply-modal");
    const applyForm = document.getElementById("application-form");

    if (joinBtn) {
      joinBtn.addEventListener("click", () => this.openApplicationModal());
    }
    if (closeApplyBtn && applyModal) {
      closeApplyBtn.addEventListener("click", () => this.closeApplicationModal());
      applyModal.addEventListener("click", (e) => {
        if (e.target === applyModal) this.closeApplicationModal();
      });
    }
    if (applyForm) {
      applyForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // --- Details Modal ---
    const detailsModal = document.getElementById("details-modal");
    const closeDetailsBtn = document.getElementById("close-details-modal-btn");
    if (closeDetailsBtn && detailsModal) {
      closeDetailsBtn.addEventListener("click", () => this.closeDetailsModal());
      detailsModal.addEventListener("click", (e) => {
        if (e.target === detailsModal) this.closeDetailsModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // ... (keep existing modal handlers)
        if (panel && !panel.classList.contains("translate-x-full")) {
          this.closeDetailsPanel();
        }
      }
    });

    // --- Keyboard ESC key handler for both modals ---
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (eventModal && !eventModal.classList.contains("hidden")) {
          eventModal.classList.add("hidden");
          document.body.style.overflow = "auto";
        }
        if (applyModal && !applyModal.classList.contains("hidden")) {
          this.closeApplicationModal();
        }
      }
    });
  }

  /**
   * Setup responsive behavior
   */
  setupResponsive() {
    let resizeTimeout

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.handleResize()
      }, 250)
    })
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const wasMobile = this.isMobile
    this.isMobile = window.innerWidth <= 768

    // Update 3D renderer if exists
    if (this.renderer && this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Reload particles if mobile state changed
    if (wasMobile !== this.isMobile && this.scene && this.particles) {
      this.scene.remove(this.particles)
      this.createParticles()
    }

    console.log("[site] Responsive layout updated")
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
      this.isLoading = false
      console.log("[site] Loading screen hidden")
    }
  }

  /**
   * Show project details (placeholder)
   */
  showProjectDetails(projectId) {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      alert(
        `Project Details: ${project.title}\n\n${project.description}\n\nTechnologies: ${project.technologies.join(", ")}`,
      )
    }
  }

  /**
   * Register for event (placeholder)
   */
  registerForEvent(eventId) {
    const event = eventsData.upcoming.find((e) => e.id === eventId)
    if (event) {
      alert(
        `Registration for: ${event.title}\n\nDate: ${event.date}\nLocation: ${event.location}\n\nRedirecting to registration form...`,
      )
    }
  }

  /**
   * Show fullscreen image (placeholder)
   */
  showFullscreenImage(src, title) {
    // Create fullscreen image viewer
    const overlay = document.createElement("div")
    overlay.className = "fixed inset-0 bg-black/95 flex items-center justify-center z-50 cursor-pointer"
    overlay.innerHTML = `
            <img src="${src}" alt="${title}" class="max-w-full max-h-full object-contain">
            <button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">×</button>
        `

    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay)
      document.body.style.overflow = "auto"
    })

    document.body.appendChild(overlay)
    document.body.style.overflow = "hidden"
  }

  /**
   * Handle errors gracefully
   */
  handleError(error) {
    console.error("[site] Website error:", error)

    // Show user-friendly error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg z-50"
    errorDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span>Something went wrong. Please refresh the page.</span>
            </div>
        `

    document.body.appendChild(errorDiv)

    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv)
      }
    }, 5000)
  }
}

// Initialize website when script loads
let website

// Wait for data to be available
function initializeWebsite() {
  if (
    typeof projectsData !== "undefined" &&
    typeof eventsData !== "undefined" &&
    typeof teamData !== "undefined" &&
    typeof galleryData !== "undefined" &&
    typeof THREE !== "undefined"
  ) {
    website = new IUCEEWebsite()
    console.log("[site] Website instance created successfully")
  } else {
    console.log("[site] Waiting for data to load...")
    setTimeout(initializeWebsite, 100)
  }
}

// Start initialization
initializeWebsite()

// Make website instance globally available for debugging
window.website = website
