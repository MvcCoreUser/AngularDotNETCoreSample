import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product.model';
import { RepositoryModel } from './../../model/repository.model';
import { Component } from "@angular/core";

@Component({
  selector: 'product-detail',
  templateUrl: 'productDetail.component.html'
})
export class ProductDetailComponent{
  constructor(private repo: RepositoryModel, router: Router, activeRoute: ActivatedRoute){
    let id: number = Number.parseInt(activeRoute.snapshot.params['id']);
    if (id) {
      this.repo.getProduct(id);
    }
    else{
      router.navigateByUrl('/');
    }
  }

  get product():Product{
    return this.repo.product;
  }


}
