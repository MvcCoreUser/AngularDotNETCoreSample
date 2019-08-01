import { RepositoryModel } from './repository.model';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { ProductSelection } from './productSelection.model';

@Injectable()
export class Cart{
  selections: ProductSelection[];
  itemCount: number =0;
  totalPrice: number = 0;

  constructor(private repo: RepositoryModel){
    this.selections=this.repo.getSessionDataForProductSelections(this) || new Array<ProductSelection>();
    this.update(false);
  }

  addProduct(product:Product){
    let selection = this.selections.find(ps=>ps.productId==product.productId);
    if (selection) {
      selection.quantity++;
    } else {
      selection = new ProductSelection(this, product.productId, product.price, product.name, 1);
      this.selections.push(selection);
    }
    this.update();
  }

  update(setData: boolean = true):void{
    this.itemCount= this.selections.map(ps=>ps.quantity).reduce((p, c)=>p+c, 0);
    this.totalPrice = this.selections.map(ps=>ps.price*ps.quantity).reduce((p, c)=>p+c, 0);

    if (setData) {
      this.repo.setSessionDataForProductSelections(this.selections);
    }
  }

  clear(){
    this.selections=[];
    this.update();
  }

  updateQuantity(productId:number, quantity: number){
    if (quantity>0) {
      let selection = this.selections.find(ps=>ps.productId==productId);
      if (selection) {
        selection.quantity = quantity;
      }
    } else {
      let index = this.selections.findIndex(ps=>ps.productId==productId);
      if (index!=-1) {
        this.selections.splice(index, 1);
      }
      this.update();
    }

  }
}


