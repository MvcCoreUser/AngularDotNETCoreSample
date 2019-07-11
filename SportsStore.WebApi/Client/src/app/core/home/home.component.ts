import { RepositoryModel } from './../../model/repository.model';
import { Product } from './../../model/product.model';
import { Component, Inject} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private repository: RepositoryModel ) {
  }

  getProduct(id:number):Product{
    return this.repository.getProduct(id);
  }



}
