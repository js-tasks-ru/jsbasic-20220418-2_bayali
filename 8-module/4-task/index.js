import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.some((item) => {
        if (item.product == product) {
          item.count++;
          return true;
        }
      });

      if (!cartItem) {
        this.cartItems.push({ product: product, count: 1 });
      }

      this.onProductUpdate(this.cartItems);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(cartItem => {
      return cartItem.product.id == productId
    });
    cartItem.count += amount;
    cartItem.count === 0 && this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + current.product.price * current.count, 0);
  }


  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modalBody = document.createElement('div');

    this.cartItems.forEach(({ product, count }) => {
      modalBody.append(this.renderProduct(product, count));
    });
    modalBody.append(this.renderOrderForm());
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(modalBody);
    this.modal.open();

    document.querySelector('.modal__body').addEventListener('click', (event) => {
      let cartProduct = event.target.closest('.cart-product');
      let productId = cartProduct && cartProduct.dataset.productId;

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }
    });

    document.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open') && this.cartItems.length > 0) {
      const currentCount = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}] .cart-counter__count`);
      const currentPrice = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}] .cart-product__price`);
      const infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);

      currentCount.innerHTML = cartItem.count;
      currentPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
    else if (!this.cartItems.length) {
      this.modal.close();
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    const submitBtn = this.modal.elem.querySelector(".cart-buttons__button");
    submitBtn.classList.add("is-loading");

    await fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(event.target),
    });

    this.modal.setTitle('Success!');
    this.cartItems = [];
    this.cartIcon.update(this);
    this.modal.setBody(createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `));

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

