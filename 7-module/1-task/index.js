import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbon();
  }

  renderRibbon() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div >
      `);
    this.renderRibbonItem(ribbon);
    this.scrollCategoreis(ribbon);
    this.selectCategory(ribbon);
    return ribbon;
  }
  renderRibbonItem(ribbon) {
    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    this.categories.map(({ id, name }) => {
      ribbonInner.append(createElement(`
      <a href="#" class="ribbon__item" data-id=${id}>${name}</a>
      `));
    })
  }

  scrollCategoreis(ribbon) {
    const ribbonArrowRight = ribbon.querySelector('.ribbon__arrow_right');
    const ribbonArrowLeft = ribbon.querySelector('.ribbon__arrow_left');
    const ribbonInner = ribbon.querySelector('.ribbon__inner');

    ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
    ribbonArrowRight.classList.add('ribbon__arrow_visible');

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      scrollLeft == 0 ? ribbonArrowLeft.classList.remove('ribbon__arrow_visible') : ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      scrollRight < 1 ? ribbonArrowRight.classList.remove('ribbon__arrow_visible') : ribbonArrowRight.classList.add('ribbon__arrow_visible');
    });

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });
  }

  selectCategory(ribbon) {
    const ribbonItems = ribbon.querySelectorAll('.ribbon__item');

    for (let item of ribbonItems) {
      item.addEventListener('click', (event) => {
        event.preventDefault();

        let activeItem = document.getElementsByClassName('ribbon__item_active');
        if (activeItem.length > 0) {
          activeItem[0].classList.remove('ribbon__item_active');
          item.classList.add('ribbon__item_active');
        } else {
          item.classList.add('ribbon__item_active');
        }

        this.currentId = event.target.closest('[data-id]').dataset.id;
        console.log(this.currentId);
        ribbon.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: this.currentId,
          bubbles: true
        }));
      })
    }
  }

}
