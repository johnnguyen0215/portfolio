document.addEventListener("DOMContentLoaded", function() {
  var globals = {
    navbarFixed: false,
    navbarThreshold: 915
  };

  // Home Section

  // About Section
  window.onscroll = function(event) {
    navbarPositioning();

    textAnimations();
  };

  var navbar = document.querySelector(".navbar");

  function navbarPositioning() {
    if (window.pageYOffset >= navbar.offsetTop && !globals.navbarFixed) {
      navbar.classList.add("-fixed");
      globals.navbarFixed = true;
    } else if (window.pageYOffset < navbar.offsetTop && globals.navbarFixed) {
      navbar.classList.remove("-fixed");
      globals.navbarFixed = false;
    }
  }

  var sectionData = {
    about: {
      breakpoint: 915
    },
    projects: {},
    contact: {}
  };

  function textAnimations() {
    var pageYOffset = window.pageYOffset;

    if (pageYOffset > sectionData.about.breakpoint) {
      aboutTextAnimations();
    }
  }

  function aboutTextAnimations() {
    var heading = document.querySelector("#about .section-header");
    heading.classList.add("animated", "fadeInLeft", "fast");

    var underline = document.querySelector("#about .underline");
    underline.classList.add("animated", "fadeInRight", "fast");
  }
});
