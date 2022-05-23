import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>`
    );
    const closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
    document.addEventListener("keydown", this.close);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').append(title);
  }

  setBody = (body) => {
    this.elem.querySelector('.modal__body').append(body);
  }

  close = (event) => {
    if (!event || event.type == 'click' || event.code == 'Escape') {
      this.elem.remove();
      document.body.classList.remove("is-modal-open");
      document.removeEventListener('keydown', this.close);
    }
  }

}
