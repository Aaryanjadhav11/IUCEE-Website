// Main JavaScript functionality
class IUCEEWebsite {
  constructor() {
    this.enrollmentOpen = false;
    this.mobileMenuOpen = false;
    this.galleryIndex = 0;
    this.selectedGalleryEvent = 0;

    this.scrollPositions = {
      sdg: 0,
      alumni: 0,
      achievements: 0,
      projects: 0,
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.startAnimations();
    this.checkEnrollmentStatus();
  }

  setupEventListeners() {
    window.addEventListener("scroll", () => this.handleScroll());
    window.addEventListener("resize", () => this.renderAllScrollableSections());

    document.getElementById("mobileMenuBtn")?.addEventListener("click", () => this.toggleMobileMenu());
    document.querySelectorAll(".nav-link-mobile").forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });

    const modalOverlay = document.getElementById("modalOverlay");
    document.getElementById("enrollBtn")?.addEventListener("click", () => this.openApplicationForm());
    modalOverlay?.addEventListener("click", (e) => {
      if (e.target === modalOverlay) this.closeApplicationForm();
    });
    document.getElementById("modalClose")?.addEventListener("click", () => this.closeApplicationForm());
    document.getElementById("cancelBtn")?.addEventListener("click", () => this.closeApplicationForm());
    document.getElementById("applicationForm")?.addEventListener("submit", (e) => this.handleFormSubmit(e));

    const galleryModalOverlay = document.getElementById("galleryModalOverlay");
    document.getElementById("galleryPrev")?.addEventListener("click", () => this.prevGalleryImage());
    document.getElementById("galleryNext")?.addEventListener("click", () => this.nextGalleryImage());
    galleryModalOverlay?.addEventListener("click", (e) => {
      if (e.target === galleryModalOverlay) this.closeGalleryModal();
    });
    document.getElementById("galleryModalClose")?.addEventListener("click", () => this.closeGalleryModal());

    const sections = ["projects", "alumni", "achievements", "sdg", "team"];
    sections.forEach(section => {
      document.getElementById(`${section}Prev`)?.addEventListener("click", () => this.prevScrollableSection(section));
      document.getElementById(`${section}Next`)?.addEventListener("click", () => this.nextScrollableSection(section));
    });
  }

  initializeComponents() {
    this.renderTimeline();
    this.renderGallery();
    this.renderSocialMediaCards();
    this.renderAllScrollableSections();

    // Make all sliders draggable
    this.makeDraggable('.scroll-container', '.scroll-inner');
    this.makeDraggable('.gallery-main', '.gallery-slider');

    lucide.createIcons();
  }

  renderAllScrollableSections() {
    this.renderScrollableSection('team', window.teamMembers, (item) => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card team-card" data-parallax>
        <img src="${item.image}" alt="Profile of ${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="team-role">${item.role}</p>
          <p class="team-description">${item.description}</p>
        </div>
      </a>`);

    this.renderScrollableSection('sdg', window.sdgGoals, (item) => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card sdg-card">
        <div class="card-header sdg-header">
          <span class="sdg-icon">${item.icon}</span>
          <div>
            <div class="sdg-id">SDG ${item.id}</div>
            <div class="sdg-title">${item.title}</div>
          </div>
        </div>
        <div class="card-content">
          <p class="sdg-description">${item.description}</p>
        </div>
      </a>`);

    this.renderScrollableSection('projects', window.projects, (item) => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card project-card">
        <img src="${item.image}" alt="${item.title}" class="project-image">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p class="project-description">${item.description}</p>
        </div>
      </a>`);

    this.renderScrollableSection('alumni', window.alumni, (item) => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card alumni-card">
        <img src="${item.image}" alt="${item.name}" class="alumni-image">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="team-role">${item.currentRole}</p>
        </div>
      </a>`);

    this.renderScrollableSection('achievements', window.achievements, (item) => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card achievement-card">
        <div class="achievement-icon">
          <i data-lucide="${item.icon}"></i>
        </div>
        <div class="card-content">
          <h3 class="achievement-title">${item.title}</h3>
          <p class="achievement-description">${item.description}</p>
        </div>
      </a>`);
  }

  startAnimations() {
    setInterval(() => this.nextGalleryImage(), 5000);
    const scrollableSections = ['sdg', 'achievements', 'alumni', 'projects', 'team'];
    scrollableSections.forEach(section => {
      setInterval(() => this.nextScrollableSection(section), 3000);
    });
  }

  // --- NEW DRAGGABLE FUNCTIONALITY ---
  makeDraggable(containerSelector, sliderSelector) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const slider = container.querySelector(sliderSelector);
      if (!slider) return;

      let isDown = false;
      let startX;
      let scrollLeft;

      const start = (e) => {
        isDown = true;
        container.classList.add('active');
        startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const end = () => {
        isDown = false;
        container.classList.remove('active');
      };

      const move = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast factor
        slider.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener('mousedown', start);
      container.addEventListener('touchstart', start, { passive: true });

      container.addEventListener('mouseleave', end);
      container.addEventListener('mouseup', end);
      container.addEventListener('touchend', end);

      container.addEventListener('mousemove', move);
      container.addEventListener('touchmove', move, { passive: false });
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.getElementById("mobileNav")?.classList.toggle("hidden", !this.mobileMenuOpen);
    document.querySelector(".menu-icon")?.classList.toggle("hidden", this.mobileMenuOpen);
    document.querySelector(".close-icon")?.classList.toggle("hidden", !this.mobileMenuOpen);
  }

  closeMobileMenu() {
    if (!this.mobileMenuOpen) return;
    this.mobileMenuOpen = false;
    document.getElementById("mobileNav")?.classList.add("hidden");
    document.querySelector(".menu-icon")?.classList.remove("hidden");
    document.querySelector(".close-icon")?.classList.add("hidden");
  }

  openApplicationForm() {
    if (!this.enrollmentOpen) return;
    document.getElementById("modalOverlay")?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeApplicationForm() {
    document.getElementById("modalOverlay")?.classList.add("hidden");
    document.body.style.overflow = "";
    document.getElementById("applicationForm")?.reset();
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
          this.enrollmentOpen = false;
        } else {
          enrollBtn.disabled = false;
          enrollBtn.textContent = 'Apply Now';
          this.enrollmentOpen = true;
        }
      }
    } catch (error) {
      console.error("Could not check enrollment status:", error);
      const enrollBtn = document.getElementById('enrollBtn');
      if (enrollBtn) {
        enrollBtn.disabled = false;
        enrollBtn.textContent = 'Apply Now';
        this.enrollmentOpen = true;
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
    }
  }

  // ------------ Rendering Functions ------------
  renderSocialMediaCards() {
    const socialCards = document.getElementById("socialCards");
    if (!socialCards) return;
    socialCards.innerHTML = window.socialMedia.map(social => `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-card">
        <i data-lucide="${social.icon}" style="color:${social.color};"></i>
        <h4>${social.name}</h4>
        <p>${social.description}</p>
        <div class="social-btn">${social.name === 'LinkedIn' ? 'Connect' : 'Follow'}</div>
      </a>`).join("");
  }

  renderTimeline() {
    const timelineEvents = document.getElementById("timelineEvents");
    if (!timelineEvents) return;
    timelineEvents.innerHTML = window.timelineEvents.map(event => `
      <div class="timeline-event ">
        <div class="timeline-dot"></div>
        <div class="timeline-event-content">
          <div class="card">
            <div class="card-content">
              <div class="timeline-year">${event.year}</div>
              <h3 class="timeline-title">${event.title}</h3>
              <p class="timeline-description">${event.description}</p>
            </div>
          </div>
        </div>
      </div>`).join("");
  }

  renderGallery() {
    const gallerySlider = document.getElementById("gallerySlider");
    const galleryIndicators = document.getElementById("galleryIndicators");
    const galleryThumbnails = document.getElementById("galleryThumbnails");
    if (!gallerySlider || !galleryIndicators || !galleryThumbnails) return;

    // UPDATED to use a universal CTA class name
    gallerySlider.innerHTML = window.galleryImages.map((image, index) => `
      <div class="gallery-slide" onclick="website.openGalleryModal(${index})">
        <img src="${image.src}" alt="${image.alt}">
        <div class="gallery-overlay">
          <h3 class="gallery-title">${image.title}</h3>
          <p class="gallery-description">${image.description}</p>
          <span class="gallery-click-cta">Click to view full gallery →</span>
        </div>
      </div>`).join("");

    galleryIndicators.innerHTML = window.galleryImages.map((_, index) => `
      <button class="gallery-indicator ${index === 0 ? "active" : ""}" 
              onclick="website.setGalleryIndex(${index})"
              aria-label="Go to image ${index + 1}"></button>`).join("");

    galleryThumbnails.innerHTML = window.galleryImages.map((image, index) => `
      <div class="card gallery-thumbnail" onclick="website.openGalleryModal(${index})">
        <img src="${image.src}" alt="${image.alt}">
        <div class="card-content">
          <h3 class="gallery-thumbnail-title">${image.title}</h3>
          <p class="gallery-thumbnail-description">${image.description}</p>
          <span class="gallery-thumbnail-cta">View Full Gallery →</span>
        </div>
      </div>`).join("");
  }

  // ------------ Scrollable Section Logic (Updated for scrollLeft) ------------
  renderScrollableSection(sectionName, data, templateFn) {
    const scrollContainer = document.getElementById(`${sectionName}Scroll`);
    const indicatorsContainer = document.getElementById(`${sectionName}Indicators`);
    if (!scrollContainer || !indicatorsContainer) return;

    scrollContainer.innerHTML = data.map(templateFn).join("");

    const itemsPerPage = this.getItemsPerPage();
    const indicatorCount = Math.ceil(data.length / itemsPerPage);

    indicatorsContainer.innerHTML = Array.from({ length: indicatorCount }, (_, i) => `
      <button class="scroll-indicator ${i === 0 ? "active" : ""}"
              onclick="website.setScrollPosition('${sectionName}', ${i})"
              aria-label="Go to page ${i + 1}"></button>`).join("");

    this.updateScrollPosition(sectionName);
    lucide.createIcons();
  }

  getItemsPerPage() {
    return window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
  }

  setScrollPosition(sectionName, position) {
    this.scrollPositions[sectionName] = position;
    this.updateScrollPosition(sectionName);
  }

  nextScrollableSection(sectionName) {
    const data = this.getDataForSection(sectionName);
    const itemsPerPage = this.getItemsPerPage();
    const totalPages = Math.ceil(data.length / itemsPerPage);
    this.scrollPositions[sectionName] = (this.scrollPositions[sectionName] + 1) % totalPages;
    this.updateScrollPosition(sectionName);
  }

  prevScrollableSection(sectionName) {
    const data = this.getDataForSection(sectionName);
    const itemsPerPage = this.getItemsPerPage();
    const totalPages = Math.ceil(data.length / itemsPerPage);
    this.scrollPositions[sectionName] = (this.scrollPositions[sectionName] - 1 + totalPages) % totalPages;
    this.updateScrollPosition(sectionName);
  }

  updateScrollPosition(sectionName) {
    const scrollContainer = document.getElementById(`${sectionName}Scroll`);
    if (!scrollContainer) return;

    const itemsPerPage = this.getItemsPerPage();
    const targetIndex = Math.min(this.scrollPositions[sectionName] * itemsPerPage, scrollContainer.children.length - 1);

    if (scrollContainer.children[targetIndex]) {
      const targetElement = scrollContainer.children[targetIndex];
      scrollContainer.scrollLeft = targetElement.offsetLeft;
    }

    const indicators = document.querySelectorAll(`#${sectionName}Indicators .scroll-indicator`);
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.scrollPositions[sectionName]);
    });
  }

  getDataForSection(sectionName) {
    return {
      'sdg': window.sdgGoals,
      'achievements': window.achievements,
      'alumni': window.alumni,
      'projects': window.projects,
      'team': window.teamMembers,
    }[sectionName] || [];
  }

  // ------------ Gallery Logic (Updated for scrollLeft) ------------
  updateGalleryDisplay() {
    const gallerySlider = document.getElementById("gallerySlider");
    if (!gallerySlider) return;

    const scrollAmount = this.galleryIndex * gallerySlider.offsetWidth;
    gallerySlider.scrollLeft = scrollAmount;

    document.querySelectorAll(".gallery-indicator").forEach((ind, i) => ind.classList.toggle("active", i === this.galleryIndex));
  }

  setGalleryIndex(index) {
    this.galleryIndex = index;
    this.updateGalleryDisplay();
  }

  nextGalleryImage() {
    this.galleryIndex = (this.galleryIndex + 1) % window.galleryImages.length;
    this.updateGalleryDisplay();
  }

  prevGalleryImage() {
    this.galleryIndex = (this.galleryIndex - 1 + window.galleryImages.length) % window.galleryImages.length;
    this.updateGalleryDisplay();
  }

  openGalleryModal(eventIndex) {
    this.selectedGalleryEvent = eventIndex;
    const modal = document.getElementById("galleryModalOverlay");
    const title = document.getElementById("galleryModalTitle");
    const grid = document.getElementById("galleryModalGrid");
    if (!modal || !title || !grid) return;

    const event = window.galleryImages[eventIndex];
    title.textContent = `${event.title} - Full Gallery`;

    grid.innerHTML = event.fullGallery.map(item => `
      <div class="gallery-modal-item">
        <img src="${item.src}" alt="${item.caption}">
        <p class="gallery-modal-caption">${item.caption}</p>
      </div>`).join("");

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeGalleryModal() {
    document.getElementById("galleryModalOverlay")?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ------------ Scroll & Animation Effects ------------
  handleScroll() {
    const scrolled = window.scrollY;
    const parallaxOffset = scrolled * -0.3;

    document.querySelector(".parallax-bg-1")?.style.setProperty('transform', `translateY(${parallaxOffset * 0.8}px)`);
    document.querySelector(".parallax-bg-2")?.style.setProperty('transform', `translateY(${parallaxOffset * 0.3}px)`);
    document.querySelector(".parallax-bg-3")?.style.setProperty('transform', `translateY(${parallaxOffset * 0.6}px)`);

    document.querySelectorAll(".floating-element").forEach((el, i) => {
      const speed = 0.05 + i * 0.02;
      const range = 20 + i * 5;
      const xOffset = Math.sin(scrolled * speed * 0.1) * range;
      const yOffset = parallaxOffset * (0.2 + i * 0.1);
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  }
}

// Initialize the website and smooth scrolling
document.addEventListener("DOMContentLoaded", () => {
  window.website = new IUCEEWebsite();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});