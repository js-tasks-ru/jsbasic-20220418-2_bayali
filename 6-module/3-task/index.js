import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
    console.log(this.elem);
  }

  renderCarousel() {
    let carousel = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>`
    );
    this.renderSlides(carousel);
    return carousel;
  }

  renderSlides(carousel) {
    let carouselInner = carousel.querySelector('.carousel__inner');
    this.slides.map((item) => {
      let slide = createElement(`
      <div class="carousel__slide" data-id=${item.id}>
        <img src="../../assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `);

      carouselInner.append(slide);
    });
    this.initCarousel(carouselInner, carousel);
    this.addToCart(carousel.querySelectorAll('.carousel__slide'));
  }


  initCarousel(carouselInner, carousel) {
    const left = carousel.querySelector('.carousel__arrow_left');
    const right = carousel.querySelector('.carousel__arrow_right');
    let activeSlide = 0;

    this.showArrow(left, right, activeSlide);

    right.addEventListener('click', () => {
      activeSlide++;
      carouselInner.style.transform = `translateX(-${activeSlide * carouselInner.offsetWidth}px)`;
      this.showArrow(left, right, activeSlide);
    });

    left.addEventListener('click', () => {
      activeSlide--;
      carouselInner.style.transform = `translateX(-${activeSlide * carouselInner.offsetWidth}px)`;
      this.showArrow(left, right, activeSlide);
    });

  }

  showArrow = (left, right, activeSlide) => {
    console.log(activeSlide);
    left.style.display = activeSlide === 0 ? 'none' : '';
    right.style.display = activeSlide === this.slides.length - 1 ? 'none' : '';
  }

  addToCart(slides) {
    console.log(slides);
    slides.forEach(slide => {
      let addButton = slide.querySelector('.carousel__button');

      addButton.addEventListener('click', () => {
        console.log(slide.dataset.id);
        let addProduct = new CustomEvent("product-add", {
          detail: slide.dataset.id,
          bubbles: true
        });
        addButton.dispatchEvent(addProduct);
      })
    })
  }
}
