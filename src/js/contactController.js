class ContactController {
  breakPoints = {
    heading: 3000,
  }

  animationTriggers = {
    heading: false
  }

  constructor() { }

  get contactSection() {
    return document.querySelector('#contact');
  }

  get projectsHeading() {
    return document.querySelector('#contact .section-header-container');
  }

  headingAnimations() {
    if (!this.animationTriggers.heading) {
      this.projectsHeading.style.visibility = 'visible';

      const heading = document.querySelector('#contact .section-header');
      heading.classList.add('flipInX', 'duration-1500');

      const headerDashLeft = document.querySelector('#contact .header-dash.-left');

      const headerDashRight = document.querySelector('#contact .header-dash.-right');

      headerDashLeft.classList.add('animated', 'fadeInLeft', 'fast');

      headerDashRight.classList.add('animated', 'fadeInRight', 'fast');

      this.animationTriggers.heading = true;
    }
  }

  contactAnimations(pageYOffset) {
    if (pageYOffset > this.breakPoints.heading) {
      this.headingAnimations();
    }
  }
}

export default new ContactController();