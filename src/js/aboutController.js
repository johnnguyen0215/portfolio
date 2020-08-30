class AboutController {
  portraitAnimation = 'fadeInLeft';
  ribbonAnimation = 'fadeInRight';

  headingAnimationTriggered = false;
  descriptionAnimationTriggered = false;
  graphAnimationTriggered = false;
  qualitiesAnimationsTriggered = false;

  headingBreakpoint = 850;
  descriptionBreakpoint = 900;
  graphBreakpoint = 1200;
  qualitiesBreakpoint = 850;

  aboutOffsetTop = document.querySelector('#about').offsetTop - 50;

  skills = {
    js: {
      percentage: '85%'
    },
    html: {
      percentage: '90%'
    },
    cssSass: {
      percentage: '90%'
    },
    react: {
      percentage: '85%'
    },
    angular: {
      percentage: '80%',
    },
    node: {
      percentage: '50%'
    },
    php: {
      percentage: '30%'
    }
  }

  constructor() {
    if (window.innerWidth < 992) {
      this.portraitAnimation = 'fadeInDown';
      this.ribbonAnimation = 'fadeInUp';
    }
  }

  get aboutSection() {
    return document.querySelector('#about');
  }

  get aboutHeading() {
    return document.querySelector('#about .section-header-container');
  }

  attachEventListeners() {
    window.addEventListener('resize', this.aboutResizeListener);
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
      heading.classList.add('flipInX', 'duration-1500');

      const headerDashLeft = document.querySelector('#about .header-dash.-left');

      const headerDashRight = document.querySelector('#about .header-dash.-right');

      headerDashLeft.classList.add('animated', 'slideInLeft', 'fast', 'delay-0.5s')

      headerDashRight.classList.add('animated', 'slideInRight', 'fast', 'delay-0.5s');

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
    Object.keys(this.skills).forEach((skill) => {
      const skillInfo = this.skills[skill];

      const skillElement = document.querySelector(`.skill-container.${skill} .skill-bar`);

      skillElement.style.width = skillInfo.percentage;
    });
  }

  qualitiesAnimations() {
    if (!this.qualitiesAnimationsTriggered) {
      const accessibleQuality = document.querySelector('.qualities .accessible');
      const dynamicQuality = document.querySelector('.qualities .dynamic');
      const efficientQuality = document.querySelector('.qualities .efficient');
      const responsiveQuality = document.querySelector('.qualities .responsive');

      const qualities = [accessibleQuality, dynamicQuality, efficientQuality, responsiveQuality];

      qualities.forEach((quality) => {
        quality.style.visibility = 'visible';
        quality.classList.add('spinIn');
      })

      this.qualitiesAnimationsTriggered = true;
    }
  }

  aboutAnimations(pageYOffset) {
    if (pageYOffset > this.headingBreakpoint) {
      this.headingAnimations();
    }

    if (pageYOffset > this.qualitiesBreakpoint) {
      this.qualitiesAnimations();
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
