import '../scss/style.scss';
import aboutController from './aboutController';
import navbarController from './navbarController';

class MainController {
  animations() {
    const pageYOffset = window.pageYOffset;
    aboutController.aboutAnimations(pageYOffset);
  }

  constructor() {
    window.onresize = () => {
      navbarController.navbarResizeListener();

      aboutController.aboutResizeListener();
    }

    window.onscroll = (event) => {
      navbarController.navbarPositioning();

      this.animations();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const app = new MainController();
});
