import { RepositoryModel } from './../../model/repository.model';
import { Component } from "@angular/core";

@Component({
  selector: 'category-filter',
  templateUrl: 'categoryFilter.component.html'
})
export class CategoryFilterComponent{
  public chessCategory:string = 'chess';

  constructor(private repo: RepositoryModel){
  }

  setCategory(category: string){
    this.repo.filter.category=category;
    this.repo.getProducts();
  }
}
