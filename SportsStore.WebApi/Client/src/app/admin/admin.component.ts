import { AuthenticationService } from './../auth/authentication.service';
import { Component } from "@angular/core";
import { Repository } from '../model/repository.model';

@Component({
  templateUrl:'admin.component.html'
})
export class AdminComponent{
  constructor(private repo: Repository, public authService:AuthenticationService){
    repo.filter.reset();
    repo.filter.related=true;
    this.repo.getProducts();
    this.repo.getSuppliers();
    this.repo.getOrders();
  }
}
