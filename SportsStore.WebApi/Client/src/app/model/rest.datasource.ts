import { Product } from './product.model';
import { Observable, throwError } from 'rxjs';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource{
  /**
   *
   */
  private myHeaders: HttpHeaders;
  constructor(public httpClient: HttpClient, @Inject(REST_URL) public url: string) {
    this.myHeaders=new HttpHeaders();
    this.myHeaders=this.myHeaders.set('Access-Key', '<secret>');
    this.myHeaders=this.myHeaders.set('App-Names', ['exampleApp', 'proAngular6']);
  }

  getData():Observable<Product[]>{
    // return this.httpClient.jsonp<Product[]>(this.url, "callback");
    return this.sendRequest<Product[]>('GET', this.url+'products/');
  }

  getProductById(id:number):Observable<Product>{
    //return this.sendRequest<Product>('GET', this.url+`product/getbyid/${id}`)
    return this.httpClient.jsonp<Product>(this.url+`products/${id}`, "callback");
  }

  saveProduct(product: Product):Observable<Product>{
    return this.sendRequest<Product>('POST', this.url, product);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.sendRequest<Product>('PUT',`${this.url}/${product.productId}`, product);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.sendRequest<Product>('DELETE',`${this.url}/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?:Product):Observable<T>{
      return this.httpClient.request<T>(verb, url, {
        body: body
      })
      //.pipe(delay(2000))
      .pipe( catchError((error: Response)=>throwError(`Network error: ${error.statusText} (${error.status})`)) );
  }
}
