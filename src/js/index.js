document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('.navbar');

  var aboutHeading = document.querySelector('#about .section-header-container');

  var homeSection = document.querySelector('#home');

  var navbarFixed = false;

  var menuOpen = false;

  var burger = document.querySelector('.navbar .burger');

  var sideNavBurger = document.querySelector('.side-nav .burger');

  burger.addEventListener('click', toggleMenuOpen);

  sideNavBurger.addEventListener('click', toggleMenuOpen);

  var sideNav = document.querySelector('.side-nav');

  var content = document.querySelector('.content');

  function toggleMenuOpen(forceTo) {
    if (menuOpen || forceTo === false) {
      burger.classList.remove('open');
      sideNav.classList.remove('-open');
      sideNav.classList.add('-closed');
      content.style.marginLeft = '0';
      menuOpen = false;
    } else {
      burger.classList.add('open');
      sideNav.classList.remove('-closed');
      sideNav.classList.add('-open');
      content.style.marginLeft = '200px';
      menuOpen = true;
    }
  }

  window.onresize = function () {
    if (window.innerWidth > 768 && menuOpen) {
      toggleMenuOpen(false);
    }
  };

  // About Section
  window.onscroll = function (event) {
    navbarPositioning();

    animations();
  };

  function navbarPositioning() {
    console.log(navbar.getBoundingClientRect());
    if (homeSection.getBoundingClientRect().bottom <= 0 && !navbarFixed) {
      navbar.classList.add('-fixed');
      navbarFixed = true;

      aboutHeading.style.marginTop =
        (navbar.offsetHeight + 50).toString() + 'px';
    } else if (homeSection.getBoundingClientRect().bottom > 0 && navbarFixed) {
      navbar.classList.remove('-fixed');
      navbarFixed = false;
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

      var ribbonElement = document.querySelector('#about .about-ribbon');

      ribbonElement.classList.add('animated', 'fadeInRight', 'faster');

      aboutDescriptionTriggered = true;
    }
  }
});
