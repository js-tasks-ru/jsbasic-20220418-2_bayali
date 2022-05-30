import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3, });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    this.products = await this.getProducts();

    this.productsGrid = new ProductsGrid(Array.from(this.products));
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', event => {
      let productToAdd = this.products.find(item => item.id === event.detail);
      this.cart.addProduct(productToAdd);
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    this.nutsCheckbox = document.getElementById('nuts-checkbox');
    this.nutsCheckbox.addEventListener('change', event => {
      this.productsGrid.updateFilter({
        noNuts: this.nutsCheckbox.checked
      });
    });

    this.vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    this.vegeterianCheckbox.addEventListener('change', event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: this.vegeterianCheckbox.checked
      });
    });
  }

  async getProducts() {
    const products = await fetch('products.json');
    return products.json();
  }

}


