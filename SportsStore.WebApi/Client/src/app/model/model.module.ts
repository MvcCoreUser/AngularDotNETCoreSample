import { Cart } from './cart.model';

//import { StaticDataSource } from './static.datasource';
import { Repository } from './repository.model';
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { Order } from './order.model';



@NgModule({
  imports:[HttpClientModule, HttpClientJsonpModule],
  providers: [
    Repository,
    Cart,
    Order

  ]
})
export class RepositoryModelModule{}
