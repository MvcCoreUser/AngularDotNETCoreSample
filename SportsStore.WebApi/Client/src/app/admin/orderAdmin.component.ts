import { Component } from "@angular/core";
import { Repository } from '../model/repository.model';
import { Order } from '../model/order.model';

@Component({
  templateUrl: 'orderAdmin.component.html'
})
export class OrderAdminComponent{
  constructor(private repo: Repository){}

  get orders():Order[]{
    return this.repo.orders;
  }

  markShipped(order: Order){
    this.repo.shipOrder(order);
  }
}
