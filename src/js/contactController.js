class ContactController {
  constructor() { }

  get contactSection() {
    return document.querySelector('#contact');
  }
}

export default new ContactController();