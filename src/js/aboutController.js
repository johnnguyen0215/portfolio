import contactController from './contactController';

class AboutController {
  portraitAnimation = 'fadeInLeft';
  ribbonAnimation = 'fadeInRight';

  headingAnimationTriggered = false;
  descriptionAnimationTriggered = false;
  graphAnimationTriggered = false;
  qualitiesAnimationsTriggered = false;

  animationTriggers = {
    heading: false,
    description: false,
    graph: false,
    qualities: false
  }

  breakPoints = {
    heading: 850,
    description: 900,
    graph: 1300,
    qualities: 850
  }

  aboutOffsetTop = document.querySelector('#about').offsetTop - 50;

  skills = {
    js: {
      percentage: '85%'
    },
    html: {
      percentage: '90%'
    },
    scss: {
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

  get qualities() {
    return document.querySelector('.qualities');
  }

  get description() {
    return document.querySelector('.portrait-text-container');
  }

  get graph() {
    return document.querySelector('.skill-graph');
  }

  attachEventListeners() {
    window.addEventListener('resize', this.aboutResizeListener);

    const getInTouchLink = document.querySelector('#get-in-touch');
    getInTouchLink.addEventListener('click', (event) => {
      event.preventDefault();

      window.scroll({
        top: contactController.contactSection.offsetTop - 50,
        behavior: 'smooth'
      })
    });
  }

  aboutResizeListener() {
    if (window.innerWidth < 992) {
      this.portraitAnimation = 'fadeInTop';
      this.ribbonAnimation = 'fadeInBottom';
    }
  }

  headingAnimations() {
    if (!this.animationTriggers.heading) {
      this.aboutHeading.style.visibility = 'visible';

      const heading = document.querySelector('#about .section-header');
      heading.classList.add('flipInX', 'duration-1500');

      const headerDashLeft = document.querySelector('#about .header-dash.-left');

      const headerDashRight = document.querySelector('#about .header-dash.-right');

      headerDashLeft.classList.add('animated', 'fadeInLeft', 'fast')

      headerDashRight.classList.add('animated', 'fadeInRight', 'fast');

      this.animationTriggers.heading = true;
    }
  }

  descriptionAnimations() {
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

    this.animationTriggers.description = true;
  }

  graphAnimations() {

    const skillGraph = document.querySelector('.skill-graph');

    skillGraph.style.visibility = 'visible';

    skillGraph.classList.add('animated', 'fadeInUp', 'fast');

    setTimeout(() => {
      Object.keys(this.skills).forEach((skill) => {
        const skillInfo = this.skills[skill];

        const skillElement = document.querySelector(`.skill-container.${skill} .skill-bar`);

        skillElement.style.width = skillInfo.percentage;
      });

      this.animationTriggers.graph = true;
    }, 500);
  }

  qualitiesAnimations() {
    const accessibleQuality = document.querySelector('.qualities .accessible');
    const dynamicQuality = document.querySelector('.qualities .dynamic');
    const efficientQuality = document.querySelector('.qualities .efficient');
    const responsiveQuality = document.querySelector('.qualities .responsive');

    const qualities = [accessibleQuality, dynamicQuality, efficientQuality, responsiveQuality];

    let delay = 0;

    qualities.forEach((quality) => {
      quality.style.visibility = 'visible';
      quality.classList.add('spinIn', `delay-${delay}`);
      delay += 100;
    })

    this.animationTriggers.qualities = true;
  }

  aboutAnimations() {
    if (!this.animationTriggers.heading && this.aboutHeading) {
      const aboutHeadingTop = this.aboutHeading.getBoundingClientRect().top;

      if (aboutHeadingTop <= 500) {
        this.headingAnimations();
      }
    }


    if (!this.animationTriggers.qualities && this.qualities) {
      const qualitiesTop = this.qualities.getBoundingClientRect().top;

      if (qualitiesTop <= 500) {
        this.qualitiesAnimations();
      }
    }

    if (!this.animationTriggers.description && this.description) {
      const descriptionTop = this.description.getBoundingClientRect().top;

      if (descriptionTop <= 800) {
        this.descriptionAnimations();
      }
    }

    if (!this.animationTriggers.graph && this.graph) {
      const graphTop = this.graph.getBoundingClientRect().top;

      if (graphTop <= 900) {
        this.graphAnimations();
      }
    }
  }
}

export default new AboutController();
