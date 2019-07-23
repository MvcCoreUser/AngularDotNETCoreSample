import { ProductDetailComponent } from './core/structure/productDetail.component';
import { ProductTableComponent } from './core/structure/productTable.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: 'table', component: ProductTableComponent, pathMatch: 'full' },
  {path: 'detail/:id', component: ProductDetailComponent, pathMatch: 'full'},
  {path: '', component: ProductTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
