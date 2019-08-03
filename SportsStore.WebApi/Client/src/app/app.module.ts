import { ErrorHandlerService } from './errorHandler.service';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
// import { ProductDetailComponent } from './core/structure/productDetail.component';
// import { CategoryFilterComponent } from './core/structure/categoryFilter.component';
// import { ProductTableComponent } from './core/structure/productTable.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoryModelModule } from './model/model.module';

const restUrl=`http://${window.location.hostname}:5000/api/`;

const errorHandler = new ErrorHandlerService();

export function handler(): ErrorHandlerService {
  return errorHandler;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RepositoryModelModule,
    CoreModule,
    StoreModule,
    AdminModule
  ],
  providers: [
    {provide: 'REST_URL', useValue: restUrl},
    {provide: ErrorHandlerService, useFactory: handler},
    {provide: ErrorHandler, useFactory: handler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
