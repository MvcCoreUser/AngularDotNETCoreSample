import { Cart } from './../model/cart.model';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent{
  constructor(public cart: Cart, private router: Router){}
}
