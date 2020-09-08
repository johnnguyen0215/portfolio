class ContactController {
  breakPoints = {
    heading: 2800,
    contactCard: 3000,
  }

  animationTriggers = {
    heading: false,
    contactCard: false,
  }

  constructor() { }

  get contactSection() {
    return document.querySelector('#contact');
  }

  get contactHeading() {
    return document.querySelector('#contact .section-header-container');
  }

  get contactCard() {
    return document.querySelector('.contact-card');
  }

  headingAnimations() {
    this.contactHeading.style.visibility = 'visible';

    const heading = document.querySelector('#contact .section-header');
    heading.classList.add('flipInX', 'duration-1500');

    const headerDashLeft = document.querySelector('#contact .header-dash.-left');

    const headerDashRight = document.querySelector('#contact .header-dash.-right');

    headerDashLeft.classList.add('animated', 'fadeInLeft', 'fast');

    headerDashRight.classList.add('animated', 'fadeInRight', 'fast');

    this.animationTriggers.heading = true;
  }

  contactCardAnimation() {
    const contactCard = document.querySelector('.contact-card');

    contactCard.style.visibility = 'visible';
    contactCard.classList.add('contactFlipIn');

    this.animationTriggers.contactCard = true;
  }

  contactAnimations() {
    if (!this.animationTriggers.heading && this.contactHeading) {
      const contactHeadingTop = this.contactHeading.getBoundingClientRect().top;

      if (contactHeadingTop <= 500) {
        this.headingAnimations();
      }
    }

    if (!this.animationTriggers.contactCard && this.contactCard) {
      const contactCardTop = this.contactCard.getBoundingClientRect().top;

      if (contactCardTop <= 500) {
        this.contactCardAnimation();
      }
    }
  }
}

export default new ContactController();