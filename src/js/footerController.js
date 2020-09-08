class FooterController {
  backToTopButton = document.querySelector('#back-to-top');

  constructor() {
    this.backToTopButton.addEventListener('click', () => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
}

export default new FooterController();