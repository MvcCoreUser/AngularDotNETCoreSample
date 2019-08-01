import { Cart } from './cart.model';
import { RepositoryModel } from './repository.model';
import { Injectable } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class Order{
  constructor(private repo: RepositoryModel, public cart: Cart, private router: Router){

    router.events.subscribe(event=>{
      if (event instanceof NavigationStart) {
        if (router.url.startsWith('/checkout') && this.name!=null && this.address!=null) {
          repo.setSessionDataForOrder(this);
        }
      }
    });
    let order= repo.getSessionDataForOrder(this);
    Object.assign(this, order);
  }

  orderId: number;
  name: string;
  address: string;
  payment: Payment=new Payment();

  submitted: boolean =false;
  shipped: boolean = false;
  orderConfirmation: OrderConfirmation;

  get products(): CartLine[]{
   return this.cart.selections
             .map(p=>new CartLine(p.productId, p.quantity));
  }

  clear():void{
    this.name = null;
    this.address=null;
    this.payment=null;
    this.cart.clear();
    this.submitted=false;
  }

  submit():void{
    this.submitted=true;
    this.repo.createOrder(this);
  }

}

export class Payment {
    cardNumber: string;
    cardExpiry: string;
    cardCode: string;
}
export class CartLine {
    constructor(private productId: number,
        private quantity: number) { }
}
export class OrderConfirmation {
    constructor(public orderId: number,
        public authCode: string,
        public amount: number) { }
}

export interface CheckoutData{
  name: string;
  address: string;
  cardNumber: string;
  cardExpiry: string;
  cardCode: string
}
