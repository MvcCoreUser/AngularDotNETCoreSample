import { Component } from "@angular/core";
import { RepositoryModel } from '../model/repository.model';

@Component({
    selector: "store-categoryfilter",
    templateUrl: "categoryFilter.component.html"
})
export class CategoryFilterComponent {
    constructor(private repo: RepositoryModel) { }
}
