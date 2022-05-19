import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.productCard(product);
    this.addToCart();
  }

  productCard(product) {
    let card = createElement(
      `<div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `)

    return card;
  }

  addToCart() {
    let addButton = this.elem.querySelector(".card__button")
    addButton.addEventListener("click", () => {
      let addProduct = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      addButton.dispatchEvent(addProduct);
    });
  }

}