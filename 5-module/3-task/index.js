function initCarousel() {
  const left = document.querySelector('.carousel__arrow_left');
  const right = document.querySelector('.carousel__arrow_right');
  const carousel = document.querySelector('.carousel__inner');
  let activeSlide = 0;

  showArrow(left, right, activeSlide);

  right.addEventListener('click', () => {
    activeSlide++;
    carousel.style.transform = `translateX(-${activeSlide * carousel.offsetWidth}px)`;
    showArrow(left, right, activeSlide);
  });

  left.addEventListener('click', () => {
    activeSlide--;
    carousel.style.transform = `translateX(-${activeSlide * carousel.offsetWidth}px)`;
    showArrow(left, right, activeSlide);
  });

}

const showArrow = (left, right, activeSlide) => {
  left.style.display = activeSlide == 0 ? 'none' : '';
  right.style.display = activeSlide == 3 ? 'none' : '';
}
