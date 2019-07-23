import { Product } from './../../model/product.model';
import { RepositoryModel } from './../../model/repository.model';
import { Component } from "@angular/core";

@Component({
  selector: 'product-detail',
  templateUrl: 'productDetail.component.html'
})
export class ProductDetailComponent{
  constructor(private repo: RepositoryModel){}

  get product():Product{
    return this.repo.product;
  }


}
