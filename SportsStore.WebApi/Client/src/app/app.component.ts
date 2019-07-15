import { Product } from './model/product.model';
import { RepositoryModel } from './model/repository.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  constructor(private repo: RepositoryModel){
  }

  get product(): Product{
    return this.repo.product;
  }
}
