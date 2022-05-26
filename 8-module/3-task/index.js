export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

