import { Cart } from './cart.model';
import { RepositoryModel } from './repository.model';
import { Injectable } from "@angular/core";

@Injectable()
export class Order{
  constructor(private repo: RepositoryModel, public cart: Cart){}

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
    cardSecurityCode: string;
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
