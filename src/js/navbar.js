import { aboutHeading } from './aboutPage';
import { homeSection } from './homePage';

const content = document.querySelector('.content');
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.navbar .burger');
const sideNavBurger = document.querySelector('.side-nav .burger');
const sideNav = document.querySelector('.side-nav');

let menuOpen = false;
let navbarFixed = false;

export const toggleMenuOpen = (forceTo) => {
  if (menuOpen || forceTo === false) {
    burger.classList.remove('open');
    sideNav.classList.remove('-open');
    sideNav.classList.add('-closed');
    content.style.marginLeft = '0';
    menuOpen = false;
  } else {
    burger.classList.add('open');
    sideNav.classList.remove('-closed');
    sideNav.classList.add('-open');
    content.style.marginLeft = '200px';
    menuOpen = true;
  }
}

export const navbarPositioning = () => {
  if (homeSection.getBoundingClientRect().bottom <= 0 && !navbarFixed) {
    navbar.classList.add('-fixed');
    navbarFixed = true;

    aboutHeading.style.marginTop =
      (navbar.offsetHeight + 50).toString() + 'px';
  } else if (homeSection.getBoundingClientRect().bottom > 0 && navbarFixed) {
    navbar.classList.remove('-fixed');
    navbarFixed = false;
    aboutHeading.style.marginTop = '50px';
  }
}

export const navbarResizeListener = () => {
  if (window.innerWidth > 768 && menuOpen) {
    toggleMenuOpen(false);
  }
}

burger.addEventListener('click', toggleMenuOpen);
sideNavBurger.addEventListener('click', toggleMenuOpen);