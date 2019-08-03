import { Product } from './../model/product.model';
import { Component } from "@angular/core";
import { Repository } from '../model/repository.model';
import { isNullOrUndefined } from 'util';

@Component({
  templateUrl: 'productAdmin.component.html'
})
export class ProductAdminComponent{
  constructor(private repo: Repository){}

  tableMode: boolean = true;

  get product():Product{
    return this.repo.product
  }

  selectProduct(id: number){
    this.repo.getProduct(id);
  }

  saveProduct(){
    if (this.repo.product.productId==null) {
      this.repo.createProduct(this.repo.product);
    } else {
      this.repo.replaceProduct(this.repo.product);
    }
    this.clearProduct();
    this.tableMode=true;
  }

  deleteProduct(id: number){
    if(window.confirm('Are you sure want to delete Product?')){
      this.repo.deleteProduct(id);
    }

  }

  clearProduct(){
    this.repo.product=new Product();
    this.tableMode=true;
  }

  get products():Product[]{
    return this.repo.products;
  }

  showTableRow(id: number):boolean{
    if (isNullOrUndefined(this.product.productId)) {
      return true;
    }
    let res: boolean = (this.product.productId!=id);
    return res;
  }
}
