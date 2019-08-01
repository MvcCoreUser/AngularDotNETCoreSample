import { CheckoutSummaryComponent } from './store/checkout/checkoutSummary.component';
import { CheckoutPaymentComponent } from './store/checkout/checkoutPayment.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { ProductSelectionComponent } from './store/productSelection.component';
// import { ProductDetailComponent } from './core/structure/productDetail.component';
// import { ProductTableComponent } from './core/structure/productTable.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutDetailsComponent } from './store/checkout/checkoutDetails.component';
import { OrderConfirmationComponent } from './store/checkout/orderConfirmation.component';
// import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {path: 'checkout/step1', component: CheckoutDetailsComponent},
  {path: 'checkout/step2', component: CheckoutPaymentComponent},
  {path: 'checkout/step3', component: CheckoutSummaryComponent},
  {path: 'checkout', component: CheckoutDetailsComponent},
  { path: 'checkout/confirmation', component: OrderConfirmationComponent},
  { path: 'cart', component: CartDetailComponent },
  { path: 'store', component: ProductSelectionComponent, pathMatch: 'full' },
  {path: '', component: ProductSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
