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

const pathToImages = require.context('../assets/images/', true);

class ProjectsController {
  projectCards;
  hoveredContainers = [];
  currentOpenProject = '';

  projectData = {
    mhe: {
      title: 'McGraw Hill',
      images: [
        './mhe-1.png',
        './mhe-2.png',
        './mhe-3.png',
        './mhe-4.png',
        './mhe-5.png'
      ]
    },
    uciOcw: {
      title: 'UCI OpenCourseWare',
      images: [
        '../assets/images/uci-ocw-1.png',
        '../assets/images/uci-ocw-2.png',
      ]
    },
    booksApp: {
      title: 'Books App',
      images: [
        '../assets/images/books-app-1.png',
        '../assets/images/books-app-2.png',
      ]
    },
    portfolioOld: {
      title: 'Portfolio (Old)',
      images: [
        '../assets/images/portfolio-old-1.png',
        '../assets/images/portfolio-old-2.png',
      ]
    },
    portfolio: {
      title: 'Portfolio',
      images: [
        '../assets/images/portfolio-1.png',
        '../assets/images/portfolio-2.png',
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

    const projectTitle = this.projectsModal
      .querySelector(`.project-title.${this.currentOpenProject}`);
    const projectContent = this.projectsModal
      .querySelector(`.project-content.${this.currentOpenProject}`);

    projectTitle.style.display = 'block';
    projectContent.style.display = 'block';

    this.buildSlideShow(projectClass, projectContent);

    this.projectsModal.classList.add('showModal');
  }

  switchProject(newProject) {
    const projectTitle = this.projectsModal
      .querySelector(`.project-title.${this.currentOpenProject}`);
    const projectContent = this.projectsModal
      .querySelector(`.project-content.${this.currentOpenProject}`);

    projectTitle.style.display = 'none';
    projectContent.style.display = 'none';

    this.currentOpenProject = newProject;
  }

  closeProjectModal() {
    this.switchProject('');

    this.projectsModal.classList.remove('showModal');
  }

  buildSlideShow(projectClass, projectContent) {
    const project = this.projectData[camelcase(projectClass)];
    const slideShow = projectContent.querySelector('.slideshow');

    if (project) {
      project.images.forEach(async (imageUrl) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('slideshow-image');
        console.log(pathToImages(imageUrl, true));
        imageElement.style.background = `url('${pathToImages(imageUrl, true)}')`;

        slideShow.appendChild(imageElement);
      })
    }
  }
}

export default new ProjectsController();