class AboutController {
  aboutHeading = document.querySelector('#about .section-header-container');

  portraitAnimation = 'fadeInLeft';
  ribbonAnimation = 'fadeInRight';

  headingAnimationTriggered = false;
  descriptionAnimationTriggered = false;
  graphAnimationTriggered = false;

  headingBreakpoint = 850;
  descriptionBreakpoint = 900;
  graphBreakpoint = 930;

  constructor() {
    if (window.innerWidth < 992) {
      this.portraitAnimation = 'fadeInDown';
      this.ribbonAnimation = 'fadeInUp';
    }
  }

  aboutResizeListener() {
    if (window.innerWidth < 992) {
      this.portraitAnimation = 'fadeInTop';
      this.ribbonAnimation = 'fadeInBottom';
    }
  }

  headingAnimations() {
    if (!this.headingAnimationTriggered) {
      this.aboutHeading.style.visibility = 'visible';

      const heading = document.querySelector('#about .section-header');
      heading.classList.add('animated', 'fadeInLeft', 'fast');

      const underline = document.querySelector('#about .underline');
      underline.classList.add('animated', 'fadeInRight', 'fast');

      this.headingAnimationTriggered = true;
    }
  }

  descriptionAnimations() {
    if (!this.descriptionAnimationTriggered) {
      const portraitTextContainer = document.querySelector(
        '#about .portrait-text-container',
      );

      portraitTextContainer.style.visibility = 'visible';

      const portraitElement = document.querySelector(
        '#about .portrait-container',
      );

      portraitElement.classList.add('animated', this.portraitAnimation, 'fast');

      const ribbonElement = document.querySelector('#about .about-ribbon');

      ribbonElement.classList.add('animated', this.ribbonAnimation, 'fast');

      this.descriptionAnimationTriggered = true;
    }
  }

  graphAnimations() {
    return false;
  }

  aboutAnimations(pageYOffset) {
    if (pageYOffset > this.headingBreakpoint) {
      this.headingAnimations();
    }

    if (pageYOffset > this.descriptionBreakpoint) {
      this.descriptionAnimations();
    }

    if (pageYOffset > this.graphBreakpoint) {
      this.graphAnimations();
    }
  }
}

export default new AboutController();
