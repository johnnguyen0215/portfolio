class FooterController {
  backToTopButton = document.querySelector('#back-to-top');

  constructor() {
    console.log(this.backToTopButton);
    this.backToTopButton.addEventListener('click', () => {
      console.log('scrolling back to top');
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
}

export default new FooterController();