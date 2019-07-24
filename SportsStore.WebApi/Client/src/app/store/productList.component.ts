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
    return this.repo.products;
  }
}
