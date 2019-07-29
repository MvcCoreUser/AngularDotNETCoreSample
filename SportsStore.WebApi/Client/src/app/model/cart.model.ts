import { Product } from './product.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Cart{
  selections: ProductSelection[]=[];
  itemCount: number =0;
  totalPrice: number = 0;

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

  update():void{
    this.itemCount= this.selections.map(ps=>ps.quantity).reduce((p, c)=>p+c, 0);
    this.totalPrice = this.selections.map(ps=>ps.price*ps.quantity).reduce((p, c)=>p+c, 0);
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

export class ProductSelection{

  constructor(
    public cart: Cart,
    public productId?: number,
    public price?: number,
    public name?: string,
    private quantityValue?: number
  ) {}

  get quantity(){
    return this.quantityValue;
  }

  set quantity(value: number){
    this.quantityValue = value;
    this.cart.update();
  }
}
