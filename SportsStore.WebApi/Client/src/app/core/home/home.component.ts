import { Repository } from './../../model/repository.model';
import { Product } from './../../model/product.model';
import { Component, Inject} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Angular & ASP.NET Core MVC';
  constructor(private repository: Repository ) {
  }

  getProduct(id:number):Product{
    return this.repository.product;
  }



}
