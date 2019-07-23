import { ProductDetailComponent } from './core/structure/productDetail.component';
import { CategoryFilterComponent } from './core/structure/categoryFilter.component';
import { ProductTableComponent } from './core/structure/productTable.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoryModelModule } from './model/model.module';

const restUrl=`http://${window.location.hostname}:5000/api/`;

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    CategoryFilterComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RepositoryModelModule,
    CoreModule
  ],
  providers: [
    {provide: 'REST_URL', useValue: restUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
