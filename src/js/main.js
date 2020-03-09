import '../scss/style.scss';
import { aboutAnimations, aboutPageResizeListener } from './aboutPage';
import { navbarPositioning, navbarResizeListener } from './navbar';

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
    navbarResizeListener();

    aboutPageResizeListener();
  };

  // About Section
  window.onscroll = function (event) {
    navbarPositioning();

    animations();
  };
});
