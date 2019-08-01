import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Order } from '../../model/order.model';

@Component({
  templateUrl:'checkoutSummary.component.html'
})
export class CheckoutSummaryComponent{

  constructor(private router: Router, public order: Order){
    if (order.payment.cardNumber==null || order.payment.cardExpiry==null || order.payment.cardCode==null) {
      router.navigateByUrl('/checkout/step2');
    }
  }

  submitOrder(){
    this.order.submit();
    this.router.navigateByUrl('/checkout/confirmation');
  }

}
