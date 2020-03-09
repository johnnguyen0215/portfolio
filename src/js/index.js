import '../scss/style.scss';
import { aboutAnimations, aboutHeading } from './aboutPage';

document.addEventListener('DOMContentLoaded', function () {
  const sectionData = {
    about: {
      breakpoint: 915,
    },
    projects: {},
    contact: {},
  };

  const animations = () => {
    const pageYOffset = window.pageYOffset;

    if (pageYOffset > sectionData.about.breakpoint) {
      aboutAnimations();
    }
  }

  window.onresize = function () {
    if (window.innerWidth > 768 && menuOpen) {
      toggleMenuOpen(false);
    }

    if (window.innerWidth < 992) {
      portraitAnimation = 'fadeInTop';
      ribbonAnimation = 'fadeInBottom';
    }
  };

  // About Section
  window.onscroll = function (event) {
    navbarPositioning();

    animations();
  };
});
