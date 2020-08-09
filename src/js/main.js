import '../scss/style.scss';
import aboutController from './aboutController';
import navbarController from './navbarController';
import projectsController from './projectsController';
import footerController from './footerController';
import { debounce } from './helpers/debounce';

class MainController {
  animations() {
    const pageYOffset = window.pageYOffset;
    aboutController.aboutAnimations(pageYOffset);
  }

  constructor() {
    projectsController.attachEventListeners();
    navbarController.attachEventListeners();
    aboutController.attachEventListeners();

    window.addEventListener('scroll', this.animations);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const app = new MainController();
});
