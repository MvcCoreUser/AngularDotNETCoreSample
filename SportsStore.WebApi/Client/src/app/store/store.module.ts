import { BrowserModule } from '@angular/platform-browser';
import { ProductSelectionComponent } from './productSelection.component';
import { RatingsComponent } from './ratings.component';
import { ProductListComponent } from './productList.component';
import { PaginationComponent } from './pagination.component';
import { CategoryFilterComponent } from './categoryFilter.component';
import { NgModule } from "@angular/core";
import { CartSummaryComponent } from './cartSummary.component';

@NgModule({
  declarations: [CartSummaryComponent, CategoryFilterComponent, PaginationComponent, ProductListComponent, RatingsComponent, ProductSelectionComponent],
  imports: [BrowserModule],
  exports: [ProductSelectionComponent]
})
export class StoreModule{}
