
import { Supplier } from './supplier.model';
// import { StaticDataSource } from './static.datasource';
import { Product } from './product.model';
import { Injectable, InjectionToken, Inject } from "@angular/core";
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { Filter } from "./configClasses.repository";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RepositoryModel {
  products: Product[]=new Array<Product>();
  product: Product=new Product();
  private locator = (p: Product, id: number)=> p.productId == id;
  private filterObj: Filter=new Filter();
  private productUrl: string;
  private supplierUrl: string;
  private suppliers: Supplier[]=[];
  private categories: string[]=[];
  constructor(public httpClient: HttpClient, @Inject('REST_URL') private url: string) {
    //this.filterObj.category='soccer';
    this.filterObj.related = true;
    this.productUrl=`${this.url}products/`;
    this.supplierUrl = `${this.url}suppliers/`
    this.getProducts();
  }

  get filter():Filter{
    return this.filterObj;
  }

  getProduct(id: number){
      this.sendRequest<Product>('GET', `${this.productUrl}${id}`)
              .subscribe(response=>{
                this.product=response;
                console.log('Product data received');
              });
  }

  getProducts(related: boolean =false):void{
    let url: string = `${this.productUrl}?related=${this.filterObj.related}`;
    if (this.filterObj.category) {
      url+=`&category=${this.filterObj.category}`;
    }
    if (this.filterObj.search) {
      url+=`&search=${this.filterObj.search}`;
    }
    url+='&metadata=true';
    this.sendRequest<ProductsWithMetadata>('GET', url)
        .subscribe(response=>{
          this.products=response.data;
          this.categories = response.categories;
        });
  }

  getSuppliers():void{
    this.sendRequest<Supplier[]>('GET', this.supplierUrl)
        .subscribe(response=>this.suppliers=response);
  }

  createProduct(product: Product){
    let data: ProductData={
      name:product.name,
      category:product.category,
      description : product.description,
      price : product.price,
      supplierId: product.supplier?product.supplier.supplierId:0
    };

    data.supplierId = product.supplier?product.supplier.supplierId:0;
    this.sendRequest<number>('POST', this.productUrl, data)
        .subscribe(response=>{
          product.productId=response;
          this.products.push(product);
        });
  }

  createProductAndSupplier(product: Product, supplier: Supplier){
    let data: SupplierData={
      name:supplier.name,
      city:supplier.city,
      state:supplier.state,
    }

    this.sendRequest<number>('POST', this.supplierUrl, data)
        .subscribe(response=>{
          supplier.supplierId=response;
          product.supplier=supplier;
          this.suppliers.push(supplier);
          if (product!=null) {
            this.createProduct(product);
          }
        });

  }

  replaceProduct(product: Product){
    let data: ProductData={
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      supplierId: product.supplier?product.supplier.supplierId:0
    };
    this.sendRequest('PUT', `${this.productUrl}${product.productId}`, data)
        .subscribe(response=>this.getProducts());
  }

  replaceSupplier(supplier: Supplier){
    let data: SupplierData={
      name: supplier.name,
      city: supplier.city,
      state: supplier.state
    }
    this.sendRequest('PUT', `${this.supplierUrl}${supplier.supplierId}`, data)
        .subscribe(response=>this.getProducts());
  }

  updateProduct(id: number, changes: Map<string, any>){
    let patch:JsonPatchItem[]=[];
    changes.forEach((value, key)=>{
      patch.push({op:'replace', path: key, value: value});
    });

    this.sendRequest('PATCH', `${this.productUrl}${id}`, patch)
        .subscribe(response=> this.getProducts());
  }

  deleteProduct(id: number){
    this.sendRequest('DELETE', `${this.productUrl}${id}`)
        .subscribe(response=>this.getProducts());
  }

  deleteSupplier(id: number){
    this.sendRequest('DELETE', `${this.supplierUrl}${id}`)
        .subscribe(response=>{
            this.getProducts();
            this.getSuppliers();
        });
  }

  private sendRequest<T>(method: string, url: string, data?: any):Observable<T>{
    return this.httpClient.request<T>(method, url, {body: data});
  }



}

interface ProductData{
  name:string;
  category: string;
  description: string;
  price: number;
  supplierId: number
}

interface SupplierData{
  name:string;
  city: string;
  state: string;
}

interface JsonPatchItem{
  op: string,
  path:string,
  value: any
}

interface ProductsWithMetadata{
  data: Product[],
  categories: string[]
}
