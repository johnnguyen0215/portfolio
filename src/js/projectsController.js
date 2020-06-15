import camelcase from 'camelcase';

/*
<div class="project-card mhe">
  - Developed UI functionality in Angular, React, JQuery, PHP, and Node for primary test-taking platform,
  helping the company adopt millions of users from schools across the nation.
  - Managed and developed lerna mono repository encapsulating several important packages used company-wide,
  streamlining
  the deployment of these packages for rapid development
  - Technical expert on question rendering library used across a multitude of services. Was Responsible for
  answering all technical questions and resolving high priority issues.
  - Responsible for building and optimizing continuous integration workflow for my team.
  - Built authentication wrapper around demo site.
  - Built and improved accessibility of application in order for company to meet WCAG 2.0 standards.
</div>
<div class="project-card uci-openchem">
  - Developed UCI OpenChem web application as a prototype to exemplify a seamless way for students to
  collaborate
  online.
  - Implemented a collaborative drawing canvas tool where students were able to whiteboard asynchronously
  - Integrated a google hangouts api for students to webcam while studying.
  Powered By: AngularJS, Laravel.
</div>
<div class="project-card uci-ocw">
  - Platform I worked on during my internship at UCI OpenCourseWare.
  - Developed and maintained web application supporting users world-wide desired access to
  recorded lectures online, allowing the luxury of learning from actual UCI professors.
  - Development on the LAMP stack with jQuery on the frontend and Zend on the backend.
</div>
<div class="project-card bookie">
  - Startup project that I worked on with a few colleagues who were inspired by the financial burder of
  expensive
  college textbooks.
  Meant to facilitate a quick and easy way for students to buy/sell/trade used books at their enrolled
  college/university.
  - Built authentication system using passportjs
  - Integrated google books api into search engine for finding books.
  Powered By: React, NodeJS.
</div>
<div class="project-card portfolio">
  - This website. Built with the help of webpack, babel, and sass.
</div>
*/

// </div>
// <div class="project-title uci-ocw">
//   UCI OCW
// </div>
// <div class="project-title books-app">
//   Books App
// </div>
// <div class="project-title portfolio-old">
//   Portfolio (Old)
// </div>
// <div class="project-title portfolio">
//   Portfolio

class ProjectsController {
  projectCards;
  hoveredContainers = [];
  currentOpenProject = '';
  currentSlideshow = null;
  currentSelectors = null;
  currentSlide = null;
  activeSelector = null;

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

  attachListeners() {
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
}

export default new ProjectsController();