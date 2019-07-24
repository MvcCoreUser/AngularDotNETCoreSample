import { Component } from '@angular/core';
import { RepositoryModel } from '../model/repository.model';

@Component({
  selector: 'store-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent{
  constructor(private repo: RepositoryModel){}
}
