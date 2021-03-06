import { Cart } from './../model/cart.model';
import { Product } from './../model/product.model';
import { Repository } from './../model/repository.model';
import { Component } from "@angular/core";

@Component({
  selector: 'store-product-list',
  templateUrl: 'productList.component.html'
})
export class ProductListComponent {
  constructor(private repo: Repository, private cart: Cart) {}


  get products(): Product[]{
    if (this.repo.products!=null && this.repo.products.length>0) {
      let pageIndex = this.repo.pagination.productsPerPage*(this.repo.pagination.currentPage-1);
      return this.repo.products.slice(pageIndex, pageIndex+this.repo.pagination.productsPerPage);
    }
  }

  addToCart(product:Product){
    this.cart.addProduct(product);
  }
}
