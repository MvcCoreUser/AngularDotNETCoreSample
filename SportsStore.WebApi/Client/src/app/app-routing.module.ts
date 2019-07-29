import { CartDetailComponent } from './store/cartDetail.component';
import { ProductSelectionComponent } from './store/productSelection.component';
// import { ProductDetailComponent } from './core/structure/productDetail.component';
// import { ProductTableComponent } from './core/structure/productTable.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: 'cart', component: CartDetailComponent },
  { path: 'store', component: ProductSelectionComponent, pathMatch: 'full' },
  {path: '', component: ProductSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
