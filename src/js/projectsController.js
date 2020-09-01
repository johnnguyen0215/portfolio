import camelcase from 'camelcase';

class ProjectsController {
  projectCards;
  hoveredContainers = [];
  currentOpenProject = '';
  currentSlideshow = null;
  currentSelectors = null;
  currentSlide = null;
  activeSelector = null;
  projectsOffsetTop = document.querySelector('#projects').offsetTop - 50;

  breakPoints = {
    heading: 2200,
    projectCards: 2400
  }

  animationTriggers = {
    heading: false
  }

  projectData = {
    mhe: {
      title: 'McGraw Hill',
      classes: [
        'mhe-1',
        'mhe-2',
        'mhe-3',
        'mhe-4',
        'mhe-5'
      ]
    },
    uciOcw: {
      title: 'UCI OpenCourseWare',
      classes: [
        'uci-ocw-1',
        'uci-ocw-2',
      ]
    },
    booksApp: {
      title: 'Books App',
      classes: [
        'books-app-1',
        'books-app-2',
      ]
    },
    portfolioOld: {
      title: 'Portfolio (Old)',
      classes: [
        'portfolio-old-1',
        'portfolio-old-2',
      ]
    },
    portfolio: {
      title: 'Portfolio',
      classes: [
        'portfolio-1',
        'portfolio-2',
      ]
    }
  }

  constructor() {
    this.projectCardContainers =
      document.querySelectorAll('.project-card-container');

    this.projectsModal = document.querySelector('.projects-modal');
  }

  get projectsSection() {
    return document.querySelector('#projects');
  }

  get projectsHeading() {
    return document.querySelector('#projects .section-header-container');
  }

  headingAnimations() {
    if (!this.animationTriggers.heading) {
      this.projectsHeading.style.visibility = 'visible';

      const heading = document.querySelector('#projects .section-header');
      heading.classList.add('flipInX', 'duration-1500');

      const headerDashLeft = document.querySelector('#projects .header-dash.-left');

      const headerDashRight = document.querySelector('#projects .header-dash.-right');

      headerDashLeft.classList.add('animated', 'fadeInLeft', 'fast')

      headerDashRight.classList.add('animated', 'fadeInRight', 'fast');

      this.animationTriggers.heading = true;
    }
  }

  attachEventListeners() {
    const modalCloseButton = document.querySelector(
      '.projects-modal .close-button',
    );

    modalCloseButton.addEventListener('click', () => {
      this.closeProjectModal();
    });

    document.addEventListener('click', (event) => {
      const eventTarget = event.target;

      let isSeeMoreButton = false;

      if (eventTarget) {
        isSeeMoreButton = eventTarget.classList.contains('see-more') ||
          eventTarget.parentNode.classList.contains('see-more');
      }

      if (
        !isSeeMoreButton &&
        this.currentOpenProject &&
        !this.projectsModal.contains(event.target)
      ) {
        this.closeProjectModal();
      }
    });

    this.projectCardContainers.forEach((container) => {
      const card = container.querySelector('.project-card');
      const overlay = container.querySelector('.project-card-overlay');
      const infoButton = container.querySelector('.ghost-button');
      const projectClass = container.classList[1];

      container.addEventListener('mouseover', () => {
        const card = container.querySelector('.project-card');

        if (!card.classList.contains('-hover')) {
          this.clearAllHoverStates();
          this.hoveredContainers = [];
          this.updateHoverState(card, overlay, 'add');
          this.hoveredContainers.push(container);
        }
      });

      container.addEventListener('mouseout', () => {
        this.updateHoverState(card, overlay, 'remove');
      })

      infoButton.addEventListener('click', () => {
        this.openProjectModal(projectClass);
      })
    });
  }

  updateHoverState(card, overlay, action) {
    if (card) {
      card.classList[action]('-hover');
    }

    if (overlay) {
      overlay.classList[action]('-hover');

      const overlayText = overlay.querySelector('.project-card-text');
      overlayText.classList[action]('animated', 'slideInLeft', 'faster');

      const overlayButton = overlay.querySelector('.ghost-button');
      overlayButton.classList[action]('animated', 'slideInRight', 'faster');
    }
  }

  clearAllHoverStates() {
    this.hoveredContainers.forEach((container) => {
      const card = container.querySelector('.project-card');
      const overlay = container.querySelector('.project-card-overlay');

      this.updateHoverState(card, overlay, 'remove');
    })
  }

  openProjectModal(projectClass) {
    if (this.currentOpenProject === projectClass) {
      return;
    }

    if (this.currentOpenProject && this.currentOpenProject !== projectClass) {
      this.switchProject(projectClass)
    } else {
      this.currentOpenProject = projectClass;
    }

    this.currentProjectTitle = this.projectsModal
      .querySelector(`.project-title.${this.currentOpenProject}`);

    this.currentProjectContent = this.projectsModal
      .querySelector(`.project-content.${this.currentOpenProject}`);

    this.currentProjectTitle.style.display = 'block';
    this.currentProjectContent.style.display = 'flex';

    this.buildSlideShow();

    this.projectsModal.classList.remove('zoomOut');
    this.projectsModal.style.visibility = 'visible';
    this.projectsModal.classList.add('animated', 'zoomIn', 'faster');
  }

  switchProject(newProject) {
    const projectTitle = this.projectsModal
      .querySelector(`.project-title.${this.currentOpenProject}`);

    const projectContent = this.projectsModal
      .querySelector(`.project-content.${this.currentOpenProject}`);

    this.clearProjectInstance();

    projectTitle.style.display = 'none';
    projectContent.style.display = 'none';

    this.currentOpenProject = newProject;
  }

  closeProjectModal() {
    this.switchProject('');

    this.clearProjectInstance();

    this.projectsModal.classList.add('zoomOut');
  }

  buildSlideShow() {
    const project = this.projectData[camelcase(this.currentOpenProject)];
    this.currentSlideshow = this.currentProjectContent
      .querySelector('.slideshow');

    this.currentSelectors = this.currentProjectContent
      .querySelector('.selectors');

    if (project && project.classes) {
      project.classes.forEach((projectClass, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slideshow-image', projectClass);

        this.currentSlideshow.appendChild(slide);

        this.currentSlide = slide;

        const selector = document.createElement('button');
        selector.classList.add('image-selector', projectClass);

        selector.addEventListener('click', () => {
          const previousSelector = this.activeSelector;
          previousSelector.classList.remove('active');

          this.activeSelector = selector;
          this.activeSelector.classList.add('active');

          const previousSlide = this.currentSlide;
          previousSlide.style.visibility = 'hidden';
          previousSlide.classList.remove('animated', 'fadeIn', 'fast');

          this.currentSlide = this.currentSlideshow.querySelector(
            `.slideshow-image.${projectClass}`
          );
          this.currentSlide.style.visibility = 'visible';
          this.currentSlide.classList.add('animated', 'fadeIn', 'fast');
        });

        if (index === 0) {
          this.currentSlide.style.visibility = 'visible';
          selector.classList.add('active');
          this.activeSelector = selector;
        }

        this.currentSelectors.appendChild(selector);
      });
    }
  }

  setSlideImage() {

  }

  clearProjectInstance() {
    if (this.currentSlideshow) {
      this.currentSlideshow.innerHTML = '';
    }

    if (this.currentSelectors) {
      this.currentSelectors.innerHTML = '';
    }

    this.currentSlideshow = null;

    this.currentSelectors = null;

    this.activeSelector = null;

    this.currentSlide = null;

    this.currentOpenProject = '';
  }

  projectCardAnimations() {
    let delay = 0;

    if (this.projectCardContainers && !this.animationTriggers.projectCards) {
      this.projectCardContainers.forEach((container) => {
        container.style.visibility = 'visible';

        container.classList.add('animated', 'fadeInUp', `delay-${delay}`);

        delay += 100;
      })
    }

    this.animationTriggers.projectCards = true;
  }

  projectsAnimations(pageYOffset) {
    if (pageYOffset > this.breakPoints.heading) {
      this.headingAnimations();
    }

    if (pageYOffset > this.breakPoints.projectCards) {
      this.projectCardAnimations();
    }
  }
}

export default new ProjectsController();