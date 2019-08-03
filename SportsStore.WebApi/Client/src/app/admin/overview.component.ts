import { Product } from './../model/product.model';
import { Component } from "@angular/core";
import { RepositoryModel } from '../model/repository.model';
import { Order } from '../model/order.model';

@Component({
  templateUrl: 'overview.component.html'
})
export class OverviewComponent{
  constructor(private repo: RepositoryModel){}

  get products(): Product[]{
    return this.repo.products;
  }

  get orders(): Order[]{
    return this.repo.orders;
  }
}
