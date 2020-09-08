import '../scss/style.scss';
import aboutController from './aboutController';
import navbarController from './navbarController';
import projectsController from './projectsController';

// We need to import these even though they aren't used.
import footerController from './footerController';
import contactController from './contactController';

class MainController {
  animations() {
    const pageYOffset = window.pageYOffset;
    aboutController.aboutAnimations();
    projectsController.projectsAnimations();
    contactController.contactAnimations(pageYOffset);
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
