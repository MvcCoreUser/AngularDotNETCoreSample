import { Product } from './../../model/product.model';
import { RepositoryModel } from './../../model/repository.model';
import { Component } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'product-table',
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent{

  constructor(private repo: RepositoryModel, private router: Router){
  }

  get products(): Product[]{
    return this.repo.products;
  }

  selectProduct(id: number){
    this.repo.getProduct(id);
    this.router.navigateByUrl('/detail');
  }
}
