import aboutController from './aboutController';
import homeController from './homeController';

class NavbarController {
  content = document.querySelector('.content');
  navbar = document.querySelector('.navbar');
  burger = document.querySelector('.navbar .burger');
  sideNavBurger = document.querySelector('.side-nav .burger');
  sideNav = document.querySelector('.side-nav');

  menuOpen = false;
  navbarFixed = false;
  offsetValues = {}

  constructor() {
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
    this.getAboutOffsetTop = this.getAboutOffsetTop.bind(this);
    this.getProjectsOffsetTop = this.getProjectsOffsetTop.bind(this);

    this.attachEventListeners();

    this.offsetValues = {
      home: this.getHomeOffsetTop,
      about: this.getAboutOffsetTop,
      projects: this.getProjectsOffsetTop,
      contact: this.getContactOffsetTop,
    }
  }

  getHomeOffsetTop() {
    return document.querySelector('#home').offsetTop;
  }

  getAboutOffsetTop() {
    let offsetTop = document.querySelector('#about').offsetTop - 50;

    if (this.navbarFixed) {
      offsetTop += 56;
    }

    return offsetTop;
  }

  getProjectsOffsetTop() {
    let offsetTop = document.querySelector('#projects').offsetTop - 50;

    return offsetTop;
  }

  getContactOffsetTop() {
    return document.querySelector('#contact').offsetTop;
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

  navbarPositioning() {
    if (homeController.homeSection.getBoundingClientRect().bottom <= 0 && !this.navbarFixed) {
      this.navbar.classList.add('-fixed');
      this.navbarFixed = true;

      aboutController.aboutHeading.style.marginTop =
        (this.navbar.offsetHeight + 50).toString() + 'px';
    } else if (homeController.homeSection.getBoundingClientRect().bottom > 0 && this.navbarFixed) {
      this.navbar.classList.remove('-fixed');
      this.navbarFixed = false;
      aboutController.aboutHeading.style.marginTop = '50px';
    }
  }

  navbarResizeListener() {
    if (window.innerWidth > 768 && this.menuOpen) {
      this.toggleMenuOpen(false);
    }
  }
}

export default new NavbarController();