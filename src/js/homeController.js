import projectsController from './projectsController';

class HomeController {
  homeSection = document.querySelector('#home');
  viewPortfolioButton = document.querySelector('#view-portfolio-button');
  homeOffsetTop = this.homeSection.offsetTop;

  constructor() {
    this.viewPortfolioButton.addEventListener('click', (event) => {
      event.preventDefault();

      window.scroll({
        top: projectsController.projectsOffsetTop,
        behavior: 'smooth',
      })
    })
  }
}

export default new HomeController();
