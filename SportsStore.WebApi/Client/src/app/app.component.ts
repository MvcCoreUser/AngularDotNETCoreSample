import { Supplier } from './model/supplier.model';
import { Product } from './model/product.model';
import { Repository } from './model/repository.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  loading: string='Loading data..';
  constructor(private repo: Repository){
  }

  get product(): Product{
    console.log('Product data requested')
    return this.repo.product;
  }

  get products():Product[]{
    return this.repo.products;
  }

  createProduct(){
    let product:Product=new Product(0, "X-Ray Scuba Mask", "Watersports", 49.99,"See what the fish are hiding",this.repo.products[0].supplier);
    this.repo.createProduct(product);
  }

  createProductAndSupplier(){
    let s=new Supplier(0, "Rocket Shoe Corp", "Boston", "MA");
    let p=new Product(0, "Rocket-Powered Shoes", "Running", 100, "Set a new record", s);
    this.repo.createProductAndSupplier(p, s);
  }

  replaceProduct(){
    let product: Product = this.repo.products[0];
    product.name = 'Modified Product';
    product.category = 'Modified Category';
    this.repo.replaceProduct(product);
  }

  replaceSupplier(){
    let supplier = new Supplier(3, 'Modified Supplier', 'New York', 'NY');
    this.repo.replaceSupplier(supplier);
  }

  updateProduct():void{
    let changes = new Map<string, any>();
    changes.set('name', 'Green Kayak');
    changes.set('supplierId', null);
    this.repo.updateProduct(1, changes);
  }

  deleteProduct(){
    this.repo.deleteProduct(1);
  }

  deleteSupplier(){
    this.repo.deleteSupplier(2);
  }
}
