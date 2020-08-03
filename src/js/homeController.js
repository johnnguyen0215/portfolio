import projectsController from './projectsController';

class HomeController {
  viewPortfolioButton = document.querySelector('#view-portfolio-button');

  constructor() {
    this.viewPortfolioButton.addEventListener('click', (event) => {
      event.preventDefault();

      window.scroll({
        top: projectsController.projectsSection.offsetTop - 50,
        behavior: 'smooth',
      })
    })
  }

  get homeSection() {
    return document.querySelector('#home');
  }
}

export default new HomeController();
