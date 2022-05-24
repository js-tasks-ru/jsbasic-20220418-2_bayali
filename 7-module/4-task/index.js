import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">

        </div>
      </div>
    `);
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');

    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.append(createElement(`<span></span>`));
    }

    this.sliderSteps.children[this.value].className = 'slider__step-active';
    this.sliderValue.innerHTML = this.value;
    this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.value / (this.steps - 1) * 100}%`;

    this.setSliderStep();

    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.addEventListener('pointerdown', this.pointerDown);
  }

  setSliderStep() {
    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      this.value = Math.round(leftRelative * (this.steps - 1));
      this.sliderValue.innerHTML = this.value;

      this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.value / (this.steps - 1) * 100}%`;

      this.spans = this.sliderSteps.children;

      for (let i = 0; i < this.spans.length; i++) {
        if (this.spans[i].classList.contains('slider__step-active')) {
          this.spans[i].classList.remove('slider__step-active');
          break;
        }
      }

      this.spans[this.value].classList.add('slider__step-active');

      let event_dispatch = new CustomEvent(
        'slider-change',
        {
          detail: this.value,
          bubbles: true
        }
      )
      this.elem.dispatchEvent(event_dispatch);
    });
  }

  pointerDown = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.pointerMove);
    document.addEventListener('pointerup', this.pointerUp);
  }

  pointerMove = (event) => {
    event.preventDefault();
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.sliderThumb.style.left = `${leftPercents}%`;
    this.sliderProgress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);
    this.elem.querySelector('.slider__step-active').removeAttribute('class');
    this.sliderSteps.children[this.value].classList.add('slider__step-active');
    this.sliderValue.innerHTML = this.value;
  }

  pointerUp = () => {
    this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.value / (this.steps - 1) * 100}%`;
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.pointerMove);
    let event_dispatch = new CustomEvent(
      'slider-change',
      {
        detail: this.value,
        bubbles: true
      }
    )
    this.elem.dispatchEvent(event_dispatch);
  }

}
