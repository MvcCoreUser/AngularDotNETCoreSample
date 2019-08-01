import { Cart } from './../model/cart.model';
import { Component } from "@angular/core";
import { Router } from '@angular/router';
@Component({
    selector: "store-cartsummary",
    templateUrl: "cartSummary.component.html"
})
export class CartSummaryComponent {
  constructor(private cart: Cart, private router: Router){}

  get itemCount():number{
    return this.cart.itemCount;
  }

  get totalPrice():number{
    return this.cart.totalPrice;
  }
}
