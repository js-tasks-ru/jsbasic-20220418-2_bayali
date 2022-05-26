import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.render();
    this.createProductsGrid(this.products);
  }

  render() {
    return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">

        </div>
      </div>`
    );
  }

  createProductsGrid(products) {
    this.productsGridInner = this.elem.querySelector('.products-grid__inner');

    for (let product of products) {
      let productCard = new ProductCard(product);
      this.productsGridInner.append(productCard.elem);
    }
  }


  updateFilter(filters) {
    for (let filter in filters) {
      this.filters[filter] = filters[filter];
    }

    let filtredProducts = this.products.filter(item => {
      if (this.filters.noNuts) {
        if (item.nuts === this.filters.noNuts) {
          return false;
        }
      }

      if (this.filters.vegeterianOnly) {
        if (item.vegeterian !== this.filters.vegeterianOnly) {
          return false;
        }
      }

      if (this.filters.maxSpiciness) {
        if (item.spiciness > this.filters.maxSpiciness) {
          return false;
        }
      }

      if (this.filters.category) {
        if (item.category !== this.filters.category) {
          return false;
        };
      }
      return true;
    })
    console.log(this.products);


    this.productsGridInner.classList.remove('.products-grid__inner');
    this.productsGridInner.innerHTML = '';
    this.createProductsGrid(filtredProducts);

  }
}
