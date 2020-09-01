class ContactController {
  breakPoints = {
    heading: 3000,
    contactCard: 3200,
  }

  animationTriggers = {
    heading: false,
    contactCard: false,
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

  contactCardAnimation() {
    if (!this.animationTriggers.contactCard) {
      const contactCard = document.querySelector('.contact-card');

      contactCard.style.visibility = 'visible';
      contactCard.classList.add('contactFlipIn');

      this.animationTriggers.contactCard = true;
    }
  }

  contactAnimations(pageYOffset) {
    if (pageYOffset > this.breakPoints.heading) {
      this.headingAnimations();
    }

    if (pageYOffset > this.breakPoints.contactCard) {
      this.contactCardAnimation();
    }
  }
}

export default new ContactController();