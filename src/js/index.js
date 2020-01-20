document.addEventListener('DOMContentLoaded', function() {
  var globals = {
    navbarFixed: false,
    navbarThreshold: 915,
  };

  // Home Section

  // About Section
  window.onscroll = function(event) {
    navbarPositioning();

    animations();
  };

  var navbar = document.querySelector('.navbar');
  var aboutHeading = document.querySelector(
    '#about .section-header-container'
  );

  function navbarPositioning() {
    if (
      window.pageYOffset >= globals.navbarThreshold &&
      !globals.navbarFixed
    ) {
      navbar.classList.add('-fixed');
      globals.navbarFixed = true;

      aboutHeading.style.marginTop = (navbar.offsetHeight + 50).toString() +
      'px';
    } else if (
      window.pageYOffset < globals.navbarThreshold &&
      globals.navbarFixed
    ) {
      navbar.classList.remove('-fixed');
      globals.navbarFixed = false;
      aboutHeading.style.marginTop = '50px';
    }
  }

  var sectionData = {
    about: {
      breakpoint: 915,
    },
    projects: {},
    contact: {},
  };

  function animations() {
    var pageYOffset = window.pageYOffset;

    if (pageYOffset > sectionData.about.breakpoint) {
      aboutAnimations();
    }
  }

  var aboutHeadingTriggered = false;

  function aboutAnimations() {
    if (!aboutHeadingTriggered) {
      var sectionHeaderContainer = document.querySelector(
        '#about .section-header-container',
      );

      sectionHeaderContainer.style.visibility = 'visible';

      var heading = document.querySelector('#about .section-header');
      heading.classList.add('animated', 'fadeInLeft', 'faster');

      var underline = document.querySelector('#about .underline');
      underline.classList.add('animated', 'fadeInRight', 'faster');

      aboutHeadingTriggered = true;
    }

    var aboutDescriptionTriggered = false;

    if (!aboutDescriptionTriggered) {
      var portraitTextContainer = document.querySelector(
        '#about .portrait-text-container',
      );

      portraitTextContainer.style.visibility = 'visible';

      var portraitElement = document.querySelector(
        '#about .portrait-container',
      );
      portraitElement.classList.add('animated', 'fadeInLeft', 'faster');

      var ribbonElement = document.querySelector(
        '#about .about-ribbon',
      );
      ribbonElement.classList.add('animated', 'fadeInRight', 'faster');

      aboutDescriptionTriggered = true;
    }
  }
});
