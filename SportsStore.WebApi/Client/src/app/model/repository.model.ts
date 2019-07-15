
import { RestDataSource } from './rest.datasource';
// import { StaticDataSource } from './static.datasource';
import { Product } from './product.model';
import { Injectable, InjectionToken, Inject } from "@angular/core";
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RepositoryModel {
  private products: Product[]=new Array<Product>();
  product: Product=new Product();
  private locator = (p: Product, id: number)=> p.productId == id;
  constructor(private dataSource: RestDataSource) {
    //this.products=new Array<Product>();
    //this.dataSource.getData().forEach(p=>this.products.push(p));
    //this.dataSource.getData().toPromise().then(data=>this.products = data);
    this.getProduct(1);
  }

  getProducts(): Product[]{

    return this.products;
  }

  getProduct(id: number){
      this.sendRequest<Product>('GET', `${this.dataSource.url}products/${id}`)
              .subscribe(response=>{
                this.product=response;
                console.log('Product data received');
              });
  }

  private sendRequest<T>(method: string, url: string, data?: any):Observable<T>{
    return this.dataSource.httpClient.request<T>(method, url, {body: data});
  }

  getNextProductId(id: number):number{
    let res: number;
    let index = this.products.findIndex(p=>this.locator(p, id));
    if (index>-1) {
      res= this.products[this.products.length > index+2?index+1:0].productId;
    }
    else {
      res= id || 0;
    }
    return res;
  }

  getPrevProductId(id: number):number{
    let index = this.products.findIndex(p=>this.locator(p, id));
    if (index>-1) {
      return this.products[index>0?index-1:this.products.length-1].productId;
    } else {
      return id || 0;
    }
  }

  saveProduct(product: Product){
    if (isNullOrUndefined(product.productId) || product.productId==0) {
      this.dataSource.saveProduct(product).subscribe(p=>this.products.push(p));
    }
    else{
      this.dataSource.updateProduct(product).subscribe(p => {
        let index = this.products.findIndex(p=>this.locator(p, product.productId));
        this.products.splice(index, 1, product);
      });

    }
  }

  deleteProduct(id: number):void{
    this.dataSource.deleteProduct(id).subscribe(()=>{
      let index = this.products.findIndex(p=>this.locator(p, id));
      if (index>-1) {
        this.products.splice(index, 1);
      }
    });

  }

  private generateID(): number {
    let newID=100;
    while (!isNullOrUndefined(this.getProduct(newID))) {
      newID++;
    }
    return newID;
  }
}
