import aboutController from './aboutController';
import homeController from './homeController';
import projectsController from './projectsController';
import contactController from './contactController';

const sections = Object.freeze({
  HOME: 'home',
  ABOUT: 'about',
  PROJECTS: 'projects',
  CONTACT: 'contact',
});

class NavbarController {
  content = document.querySelector('.content');
  navbar = document.querySelector('.navbar');
  burger = document.querySelector('.navbar .burger');
  sideNavBurger = document.querySelector('.side-nav .burger');
  sideNav = document.querySelector('.side-nav');

  currentActiveSection = null;

  menuOpen = false;
  navbarFixed = false;
  offsetValues = {}

  constructor() {
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
    this.getAboutOffsetTop = this.getAboutOffsetTop.bind(this);
    this.getProjectsOffsetTop = this.getProjectsOffsetTop.bind(this);

    this.attachEventListeners();

    this.offsetValues = {
      [sections.HOME]: this.getHomeOffsetTop,
      [sections.ABOUT]: this.getAboutOffsetTop,
      [sections.PROJECTS]: this.getProjectsOffsetTop,
      [sections.CONTACT]: this.getContactOffsetTop,
    }

    this.currentActiveSection = sections.HOME;
  }

  getHomeOffsetTop() {
    return homeController.homeSection.offsetTop;
  }

  getAboutOffsetTop() {
    const aboutSection = aboutController.aboutSection;
    let offsetTop = aboutSection.offsetTop - 50;

    if (this.navbarFixed) {
      offsetTop += this.navbar.clientHeight;
    }

    return offsetTop;
  }

  getProjectsOffsetTop() {
    return projectsController.projectsSection.offsetTop - 50;
  }

  getContactOffsetTop() {
    return contactController.contactSection.offsetTop - 50
  }

  attachEventListeners() {
    this.burger.addEventListener('click', this.toggleMenuOpen);
    this.sideNavBurger.addEventListener('click', this.toggleMenuOpen);

    const navbars = document.querySelectorAll('.navbar-nav');

    navbars.forEach((navbar) => {
      const links = navbar.querySelectorAll('a');

      links.forEach((link) => {
        const sectionLink = link.dataset.sectionLink;

        link.addEventListener('click', (event) => {
          event.preventDefault();

          window.scroll({
            top: this.offsetValues[sectionLink](),
            behavior: 'smooth'
          })
        })
      })
    })
  }

  toggleMenuOpen(forceTo) {
    if (this.menuOpen || forceTo === false) {
      this.burger.classList.remove('open');
      this.sideNav.classList.remove('-open');
      this.sideNav.classList.add('-closed');
      this.content.style.marginLeft = '0';
      this.menuOpen = false;
    } else {
      this.burger = document.querySelector('.navbar .burger');
      this.burger.classList;
      this.burger.classList.add('open');
      this.sideNav.classList.remove('-closed');
      this.sideNav.classList.add('-open');
      this.content.style.marginLeft = '200px';
      this.menuOpen = true;
    }
  }

  modifyActiveLink(activeSection) {
    const activeSectionLinks = document.querySelectorAll(
      `[data-section-link="${this.currentActiveSection}"]`
    );

    activeSectionLinks.forEach((sectionLink) => {
      sectionLink.classList.remove('active');
    })

    const sectionLinks = document.querySelectorAll(
      `[data-section-link="${activeSection}"]`
    );

    sectionLinks.forEach((sectionLink) => {
      sectionLink.classList.add('active');
    })

    this.currentActiveSection = activeSection;
  }

  setActiveLink() {
    const pageYOffset = window.pageYOffset;

    if (pageYOffset < this.offsetValues[sections.ABOUT]()) {
      this.modifyActiveLink(sections.HOME);
    } else if (pageYOffset < this.offsetValues[sections.PROJECTS]()) {
      this.modifyActiveLink(sections.ABOUT);
    } else if (pageYOffset < this.offsetValues[sections.CONTACT]()) {
      this.modifyActiveLink(sections.PROJECTS);
    } else {
      this.modifyActiveLink(sections.CONTACT);
    }
  }

  navbarPositioning() {
    const { homeSection } = homeController;
    const { aboutHeading } = aboutController;

    if (homeSection.getBoundingClientRect().bottom <= 0 && !this.navbarFixed) {
      this.navbar.classList.add('-fixed');
      this.navbarFixed = true;

      aboutHeading.style.marginTop =
        (this.navbar.offsetHeight + 50).toString() + 'px';
    } else if (homeController.homeSection.getBoundingClientRect().bottom > 0 && this.navbarFixed) {
      this.navbar.classList.remove('-fixed');
      this.navbarFixed = false;
      aboutHeading.style.marginTop = '50px';
    }
  }

  navbarResizeListener() {
    if (window.innerWidth > 768 && this.menuOpen) {
      this.toggleMenuOpen(false);
    }
  }
}

export default new NavbarController();