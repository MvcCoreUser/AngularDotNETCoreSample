import { Component } from "@angular/core";
import { Repository } from '../model/repository.model';

@Component({
  templateUrl: 'productAdmin.component.html'
})
export class ProductAdminComponent{
  constructor(private repo: Repository){}
}
