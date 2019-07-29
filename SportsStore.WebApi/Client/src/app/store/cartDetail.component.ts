import { Cart } from './../model/cart.model';
import { Component } from "@angular/core";

@Component({
  templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent{
  constructor(public cart: Cart){}
}
