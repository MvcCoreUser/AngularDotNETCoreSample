import { CategoryFilterComponent } from './core/structure/categoryFilter.component';
import { ProductTableComponent } from './core/structure/productTable.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoryModelModule } from './model/model.module';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    CategoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RepositoryModelModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
