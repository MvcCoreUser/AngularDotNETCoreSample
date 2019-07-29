import { Cart } from './cart.model';

//import { StaticDataSource } from './static.datasource';
import { RepositoryModel } from './repository.model';
import { NgModule, InjectionToken } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";



@NgModule({
  imports:[HttpClientModule, HttpClientJsonpModule],
  providers: [
    RepositoryModel,
    Cart
  ]
})
export class RepositoryModelModule{}
