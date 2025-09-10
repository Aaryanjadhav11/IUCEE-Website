// Main JavaScript functionality
class IUCEEWebsite {
  // ---------- Init Functions -------------
  constructor() {
    this.parallaxOffset = 0
    this.enrollmentOpen = true
    this.mobileMenuOpen = false
    this.sdgScrollPosition = 0
    this.galleryIndex = 0
    this.selectedGalleryEvent = 0

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initializeComponents()
    this.startAnimations()
    this.checkEnrollmentStatus();
  }

  setupEventListeners() {
    // Scroll events for parallax
    window.addEventListener("scroll", () => this.handleScroll())

    // Mobile menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const mobileNav = document.getElementById("mobileNav")

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu())
    }

    // Mobile nav links
    const mobileNavLinks = document.querySelectorAll(".nav-link-mobile")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu())
    })

    // Enrollment button
    const enrollBtn = document.getElementById("enrollBtn")
    if (enrollBtn) {
      enrollBtn.addEventListener("click", () => this.openApplicationForm())
    }

    // Modal controls
    const modalOverlay = document.getElementById("modalOverlay")
    const modalClose = document.getElementById("modalClose")
    const cancelBtn = document.getElementById("cancelBtn")

    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) this.closeApplicationForm()
      })
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => this.closeApplicationForm())
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.closeApplicationForm())
    }

    // Application form
    const applicationForm = document.getElementById("applicationForm")
    if (applicationForm) {
      applicationForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // Gallery controls
    const galleryPrev = document.getElementById("galleryPrev")
    const galleryNext = document.getElementById("galleryNext")

    if (galleryPrev) {
      galleryPrev.addEventListener("click", () => this.prevGalleryImage())
    }

    if (galleryNext) {
      galleryNext.addEventListener("click", () => this.nextGalleryImage())
    }

    // Gallery modal
    const galleryModalOverlay = document.getElementById("galleryModalOverlay")
    const galleryModalClose = document.getElementById("galleryModalClose")

    if (galleryModalOverlay) {
      galleryModalOverlay.addEventListener("click", (e) => {
        if (e.target === galleryModalOverlay) this.closeGalleryModal()
      })
    }

    if (galleryModalClose) {
      galleryModalClose.addEventListener("click", () => this.closeGalleryModal())
    }
  }

  initializeComponents() {
    this.renderTimeline()
    this.renderAchievements()
    this.renderSDGCards()
    this.renderGallery()
    this.renderClubMembers()
    this.renderSocialMediaCards()
    this.renderTeam();
    this.renderAlumni();
    this.renderProjects();
  }

  startAnimations() {
    // Auto-scroll SDG cards
    setInterval(() => {
      this.sdgScrollPosition = (this.sdgScrollPosition + 1) % Math.ceil(window.sdgGoals.length / 3)
      this.updateSDGScroll()
    }, 3000)

    // Auto-advance gallery
    setInterval(() => {
      this.galleryIndex = (this.galleryIndex + 1) % window.galleryImages.length
      this.updateGalleryDisplay()
    }, 5000)
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
    const mobileNav = document.getElementById("mobileNav")
    const menuIcon = document.querySelector(".menu-icon")
    const closeIcon = document.querySelector(".close-icon")

    if (mobileNav) {
      mobileNav.classList.toggle("hidden", !this.mobileMenuOpen)
    }

    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle("hidden", this.mobileMenuOpen)
      closeIcon.classList.toggle("hidden", !this.mobileMenuOpen)
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false
    const mobileNav = document.getElementById("mobileNav")
    const menuIcon = document.querySelector(".menu-icon")
    const closeIcon = document.querySelector(".close-icon")

    if (mobileNav) {
      mobileNav.classList.add("hidden")
    }

    if (menuIcon && closeIcon) {
      menuIcon.classList.remove("hidden")
      closeIcon.classList.add("hidden")
    }
  }

  // ------------ Application Form ------------
  openApplicationForm() {
    if (!this.enrollmentOpen) return

    const modalOverlay = document.getElementById("modalOverlay")
    if (modalOverlay) {
      modalOverlay.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    }
  }

  closeApplicationForm() {
    const modalOverlay = document.getElementById("modalOverlay")
    if (modalOverlay) {
      modalOverlay.classList.add("hidden")
      document.body.style.overflow = ""
    }

    // Reset form
    const form = document.getElementById("applicationForm")
    if (form) {
      form.reset()
    }
  }

  async checkEnrollmentStatus() {
    try {
      const response = await fetch('/api/button-status');
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
      const status = await response.json();
      const enrollBtn = document.getElementById('enrollBtn');

      if (enrollBtn) {
        if (status.enabled === false) {
          enrollBtn.disabled = true;
          enrollBtn.textContent = 'Enrollment Closed';
        } else {
          enrollBtn.disabled = false;
          enrollBtn.textContent = 'Enrollment Open';
        }
      }
    } catch (error) {
      console.error("Could not check enrollment status:", error);
      // Keep the button enabled by default if the check fails
      const enrollBtn = document.getElementById('enrollBtn');
      if (enrollBtn) {
        enrollBtn.disabled = false;
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
      this.closeApplicationForm();

    } catch (error) {
      console.error('Submission Error:', error);
      alert('There was a problem with your submission. Please try again.');
    } finally {
      // Re-enable the button whether it succeeded or failed
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Application';
    }
  }

  // ------------ Rendering ------------
  renderSocialMediaCards() {
    const socialCards = document.getElementById("socialCards")
    if (!socialCards) return

    socialCards.innerHTML = window.socialMedia
      .map(social => `
        <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-card-link">
          <div class="social-card">
            <i data-lucide="${social.icon}" style="stroke:${social.color};"></i>
            <h4>${social.name}</h4>
            <p>${social.description}</p>
            <div class="social-btn">
              ${social.name === 'LinkedIn' ? 'Connect' : 'Follow'}
            </div>
          </div>
        </a>
      `)
      .join("")

    // Re-initialize Lucide icons
    if (typeof window.lucide !== "undefined") {
      window.lucide.createIcons()
    }
  }

  renderTimeline() {
    const timelineEvents = document.getElementById("timelineEvents")
    if (!timelineEvents) return

    timelineEvents.innerHTML = window.timelineEvents
      .map(
        (event, index) => `
            <div class="timeline-event">
                <div class="timeline-event-content">
                    <div class="card">
                        <div class="card-content">
                            <div class="timeline-year">${event.year}</div>
                            <h3 class="timeline-title">${event.title}</h3>
                            <p class="timeline-description">${event.description}</p>
                        </div>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>
        `,
      )
      .join("")
  }

  renderAchievements() {
    const achievementsGrid = document.getElementById("achievementsGrid")
    if (!achievementsGrid) return

    achievementsGrid.innerHTML = window.achievements
      .map(
        (achievement) => `
            <div class="card achievement-card hover-lift">
                <div class="card-content">
                    <div class="achievement-icon">
                        <i data-lucide="${achievement.icon}"></i>
                    </div>
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
            </div>
        `,
      )
      .join("")

    // Re-initialize Lucide icons
    if (typeof window.lucide !== "undefined") {
      window.lucide.createIcons()
    }
  }

  renderSDGCards() {
    const sdgScroll = document.getElementById("sdgScroll")
    const sdgIndicators = document.getElementById("sdgIndicators")

    if (!sdgScroll || !sdgIndicators) return

    // Render SDG cards (duplicate first few for seamless scrolling)
    const extendedGoals = [...window.sdgGoals, ...window.sdgGoals.slice(0, 3)]
    sdgScroll.innerHTML = extendedGoals
      .map(
        (goal) => `
          <a href="https://sdgs.un.org/goals/goal${String(goal.id)}">
            <div class="card sdg-card">
                <div class="card-header">
                    <div class="sdg-header">
                        <span class="sdg-icon">${goal.icon}</span>
                        <div>
                            <div class="sdg-id">SDG ${goal.id}</div>
                            <div class="sdg-title">${goal.title}</div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p class="sdg-description">${goal.description}</p>
                </div>
            </div>
          </a>
        `,
      )
      .join("")

    // Render indicators
    const indicatorCount = Math.ceil(window.sdgGoals.length / 3)
    sdgIndicators.innerHTML = Array.from(
      { length: indicatorCount },
      (_, index) => `
            <button class="sdg-indicator ${index === 0 ? "active" : ""}" 
                    onclick="website.setSDGPosition(${index})"></button>
        `,
    ).join("")
  }

  renderGallery() {
    const gallerySlider = document.getElementById("gallerySlider")
    const galleryIndicators = document.getElementById("galleryIndicators")
    const galleryThumbnails = document.getElementById("galleryThumbnails")

    if (!gallerySlider || !galleryIndicators || !galleryThumbnails) return

    // Render main gallery slider
    gallerySlider.innerHTML = window.galleryImages
      .map(
        (image, index) => `
            <div class="gallery-slide ${index === 0 ? "active" : ""}">
                <img src="${image.src}" alt="${image.alt}">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">${image.title}</h3>
                    <p class="gallery-description">${image.description}</p>
                </div>
            </div>
        `,
      )
      .join("")

    // Render indicators
    galleryIndicators.innerHTML = window.galleryImages
      .map(
        (_, index) => `
            <button class="gallery-indicator ${index === 0 ? "active" : ""}" 
                    onclick="website.setGalleryIndex(${index})"></button>
        `,
      )
      .join("")

    // Render thumbnails
    galleryThumbnails.innerHTML = window.galleryImages
      .map(
        (image, index) => `
            <div class="card gallery-thumbnail ${index === 0 ? "active" : ""}" 
                 onclick="website.openGalleryModal(${index})">
                <img src="${image.src}" alt="${image.alt}">
                <div class="gallery-thumbnail-content">
                    <h3 class="gallery-thumbnail-title">${image.title}</h3>
                    <p class="gallery-thumbnail-description">${image.description}</p>
                    <p class="gallery-thumbnail-cta">Click to view full gallery →</p>
                </div>
            </div>
        `,
      )
      .join("")
  }

  renderClubMembers() {
    const membersList = document.getElementById("membersList")
    if (!membersList) return

    membersList.innerHTML = window.clubMembers
      .map(
        (member) => `
            <div class="member-item">
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
                <div class="member-details">${member.department} - ${member.year}</div>
            </div>
        `,
      )
      .join("")
  }

  renderAlumni() {
    const alumniGrid = document.getElementById("alumniGrid");
    if (!alumniGrid) return;

    alumniGrid.className = 'team-grid'; // Reuse existing grid class

    alumniGrid.innerHTML = window.alumni.map(alumnus => `
      <a href="${alumnus.link}" target="_blank" rel="noopener noreferrer" class="card achievement-card">
          <div class="card-content">
              <img src="${alumnus.image}" alt="${alumnus.name}" class="alumni-image">
              <h3>${alumnus.name}</h3>
              <p class="team-role">${alumnus.currentRole}</p> 
          </div>
      </a>
    `).join('');
  }

  renderProjects() {
    const projectsGrid = document.getElementById("projectsGrid");
    if (!projectsGrid) return;

    projectsGrid.className = 'team-grid'; // Reuse existing grid class

    projectsGrid.innerHTML = window.projects.map(project => {
      // Determine if the card should be a clickable link or a static div
      const isClickable = project.githubLink;
      const Tag = isClickable ? 'a' : 'div';
      const linkAttrs = isClickable ? `href="${project.githubLink}" target="_blank" rel="noopener noreferrer"` : '';

      return `
        <${Tag} ${linkAttrs} class="card project-card hover-lift">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        </${Tag}>
      `;
    }).join('');
  }

  renderTeam() {
    const teamGrid = document.getElementById("teamGrid");
    if (!teamGrid) return;

    teamGrid.innerHTML = window.teamMembers.map(member => `
      <a href="${member.link}" target="_blank" rel="noopener noreferrer">
        <div class="card team-card">
          <div class="card-content">
            <img src="${member.image}" alt="Profile of ${member.name}">
            <h3>${member.name}</h3>
            <p class="team-role">${member.role}</p>
            <p class="team-description">${member.description}</p>
          </div>
        </div>
      </a>
    `).join('');
  }

  // ------------ Helper Functions ------------
  setSDGPosition(position) {
    this.sdgScrollPosition = position
    this.updateSDGScroll()
  }

  updateSDGScroll() {
    const sdgScroll = document.getElementById("sdgScroll")
    const indicators = document.querySelectorAll(".sdg-indicator")

    if (sdgScroll) {
      const translateX = -this.sdgScrollPosition * 320 * 3 // 320px card width * 3 cards
      sdgScroll.style.transform = `translateX(${translateX}px)`
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.sdgScrollPosition)
    })
  }

  updateGalleryDisplay() {
    const slides = document.querySelectorAll(".gallery-slide")
    const indicators = document.querySelectorAll(".gallery-indicator")
    const thumbnails = document.querySelectorAll(".gallery-thumbnail")

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.galleryIndex)
    })

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.galleryIndex)
    })

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.classList.toggle("active", index === this.galleryIndex)
    })
  }

  setGalleryIndex(index) {
    this.galleryIndex = index
    this.updateGalleryDisplay()
  }

  nextGalleryImage() {
    this.galleryIndex = (this.galleryIndex + 1) % window.galleryImages.length
    this.updateGalleryDisplay()
  }

  prevGalleryImage() {
    this.galleryIndex = (this.galleryIndex - 1 + window.galleryImages.length) % window.galleryImages.length
    this.updateGalleryDisplay()
  }

  openGalleryModal(eventIndex) {
    this.selectedGalleryEvent = eventIndex
    const modal = document.getElementById("galleryModalOverlay")
    const title = document.getElementById("galleryModalTitle")
    const grid = document.getElementById("galleryModalGrid")

    if (!modal || !title || !grid) return

    const event = window.galleryImages[eventIndex]
    title.textContent = `${event.title} - Full Gallery`

    grid.innerHTML = event.fullGallery
      .map(
        (item) => `
            <div class="gallery-modal-item">
                <img src="${item.src}" alt="${item.caption}">
                <div class="gallery-modal-caption">
                    <p>${item.caption}</p>
                </div>
            </div>
        `,
      )
      .join("")

    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  closeGalleryModal() {
    const modal = document.getElementById("galleryModalOverlay")
    if (modal) {
      modal.classList.add("hidden")
      document.body.style.overflow = ""
    }
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    this.parallaxOffset = scrolled * -0.5

    // Update parallax backgrounds
    const parallaxBg1 = document.querySelector(".parallax-bg-1")
    const parallaxBg2 = document.querySelector(".parallax-bg-2")
    const parallaxBg3 = document.querySelector(".parallax-bg-3")

    if (parallaxBg1) {
      parallaxBg1.style.transform = `translateY(${this.parallaxOffset * 0.8}px)`
    }
    if (parallaxBg2) {
      parallaxBg2.style.transform = `translateY(${this.parallaxOffset * 0.3}px)`
    }
    if (parallaxBg3) {
      parallaxBg3.style.transform = `translateY(${this.parallaxOffset * 0.6}px)`
    }

    // Update floating elements
    const floatingElements = document.querySelectorAll(".floating-element")
    floatingElements.forEach((element, index) => {
      const multiplier = 0.01 + index * 0.003
      const xOffset = Math.sin(scrolled * multiplier) * (20 + index * 5)
      const yOffset = this.parallaxOffset * (0.2 + index * 0.1)
      element.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    })
  }
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.website = new IUCEEWebsite()
})

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})
