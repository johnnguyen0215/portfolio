const aboutHeading = document.querySelector('#about .section-header-container');

const aboutHeadingTriggered = false;

let portraitAnimation = 'fadeInLeft';
let ribbonAnimation = 'fadeInRight';

if (window.innerWidth < 992) {
  portraitAnimation = 'fadeInDown';
  ribbonAnimation = 'fadeInUp';
}

export const aboutAnimations = () => {
  if (!aboutHeadingTriggered) {
    const sectionHeaderContainer = document.querySelector(
      '#about .section-header-container',
    );

    sectionHeaderContainer.style.visibility = 'visible';

    const heading = document.querySelector('#about .section-header');
    heading.classList.add('animated', 'fadeInLeft', 'faster');

    const underline = document.querySelector('#about .underline');
    underline.classList.add('animated', 'fadeInRight', 'faster');

    aboutHeadingTriggered = true;
  }

  const aboutDescriptionTriggered = false;

  if (!aboutDescriptionTriggered) {
    const portraitTextContainer = document.querySelector(
      '#about .portrait-text-container',
    );

    portraitTextContainer.style.visibility = 'visible';

    const portraitElement = document.querySelector(
      '#about .portrait-container',
    );
    portraitElement.classList.add('animated', portraitAnimation, 'faster');

    const ribbonElement = document.querySelector('#about .about-ribbon');

    ribbonElement.classList.add('animated', ribbonAnimation, 'faster');

    aboutDescriptionTriggered = true;
  }
}
