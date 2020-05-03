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

  constructor() {
    this.burger.addEventListener('click', this.toggleMenuOpen);
    this.sideNavBurger.addEventListener('click', this.toggleMenuOpen);
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