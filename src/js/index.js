document.addEventListener("DOMContentLoaded", function() {
  var globals = {
    navbarFixed: false,
    navbarThreshold: 915
  };

  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  window.onscroll = function(event) {
    navbarPositioning();
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
});
