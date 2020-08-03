import '../scss/style.scss';
import aboutController from './aboutController';
import navbarController from './navbarController';
import projectsController from './projectsController';
import footerController from './footerController';

class MainController {
  animations() {
    const pageYOffset = window.pageYOffset;
    aboutController.aboutAnimations(pageYOffset);
  }

  constructor() {
    projectsController.attachListeners();

    window.onresize = () => {
      navbarController.navbarResizeListener();

      aboutController.aboutResizeListener();

    }

    window.onscroll = (event) => {
      navbarController.navbarPositioning();

      navbarController.setActiveLink();

      this.animations();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const app = new MainController();
});
