import { Component } from "@angular/core";
import { RepositoryModel } from '../model/repository.model';

@Component({
  templateUrl:'admin.component.html'
})
export class AdminComponent{
  constructor(private repo: RepositoryModel){
    repo.filter.reset();
    repo.filter.related=true;
    this.repo.getProducts();
    this.repo.getSuppliers();
    this.repo.getOrders();
  }
}
