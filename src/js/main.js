import '../scss/style.scss';
import aboutController from './aboutController';
import { navbarPositioning, navbarResizeListener } from './navbar';

document.addEventListener('DOMContentLoaded', function () {

  const animations = () => {
    const pageYOffset = window.pageYOffset;

    aboutController.aboutAnimations(pageYOffset);
  }

  window.onresize = function () {
    navbarResizeListener();

    aboutController.aboutPageResizeListener();
  };

  // About Section
  window.onscroll = function (event) {
    navbarPositioning();

    animations();
  };
});
