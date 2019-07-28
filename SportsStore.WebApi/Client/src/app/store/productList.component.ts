import { Product } from './../model/product.model';
import { RepositoryModel } from './../model/repository.model';
import { Component } from "@angular/core";

@Component({
  selector: 'store-product-list',
  templateUrl: 'productList.component.html'
})
export class ProductListComponent {
  constructor(private repo: RepositoryModel) {

  }

  get products(): Product[]{
    if (this.repo.products!=null && this.repo.products.length>0) {
      let pageIndex = this.repo.pagination.productsPerPage*(this.repo.pagination.currentPage-1);
      return this.repo.products.slice(pageIndex, pageIndex+this.repo.pagination.productsPerPage);
    }
  }
}
