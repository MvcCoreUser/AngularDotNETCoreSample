import { Product } from './../../model/product.model';
import { RepositoryModel } from './../../model/repository.model';
import { Component } from "@angular/core";


@Component({
  selector: 'product-table',
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent{

  constructor(private repo: RepositoryModel){
  }

  get products(): Product[]{
    return this.repo.products;
  }

}
