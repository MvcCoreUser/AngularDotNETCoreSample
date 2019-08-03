import { Component } from "@angular/core";
import { Repository } from '../model/repository.model';

@Component({
    selector: "store-categoryfilter",
    templateUrl: "categoryFilter.component.html"
})
export class CategoryFilterComponent {
    constructor(private repo: Repository) { }

    get categories():string[]{
      return this.repo.categories;
    }

    get currentCategory():string{
      return this.repo.filter.category;
    }

    set currentCategory(value:string){
        this.repo.filter.category=value;
        this.repo.getProducts();
    }
}
