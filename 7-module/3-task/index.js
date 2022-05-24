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
    this.addSteps();
  }

  addSteps() {
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

    this.setSliderStep(Object.values(this.sliderSteps.children), this.sliderValue, this.sliderThumb, this.sliderProgress);

  }

  setSliderStep(sliderSteps, sliderValue, sliderThumb, sliderProgress) {
    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      this.value = Math.round(leftRelative * (this.steps - 1));
      sliderValue.innerHTML = this.value;

      sliderThumb.style.left = sliderProgress.style.width = `${this.value / (this.steps - 1) * 100}%`;

      for (let i = 0; i < sliderSteps.length; i++) {
        if (sliderSteps[i].classList.contains('slider__step-active')) {
          sliderSteps[i].classList.remove('slider__step-active');
          break;
        }
      }

      sliderSteps[this.value].classList.add('slider__step-active');

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
}
