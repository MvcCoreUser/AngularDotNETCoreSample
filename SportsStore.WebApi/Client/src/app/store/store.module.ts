import { RouterModule } from '@angular/router';
import { CartDetailComponent } from './cartDetail.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductSelectionComponent } from './productSelection.component';
import { RatingsComponent } from './ratings.component';
import { ProductListComponent } from './productList.component';
import { PaginationComponent } from './pagination.component';
import { CategoryFilterComponent } from './categoryFilter.component';
import { NgModule } from "@angular/core";
import { CartSummaryComponent } from './cartSummary.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartSummaryComponent, CategoryFilterComponent, PaginationComponent, ProductListComponent, RatingsComponent, ProductSelectionComponent, CartDetailComponent],
  imports: [BrowserModule, RouterModule, FormsModule],
  exports: [ProductSelectionComponent]
})
export class StoreModule{}
