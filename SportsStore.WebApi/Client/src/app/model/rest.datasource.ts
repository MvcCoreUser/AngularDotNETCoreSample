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
  constructor(private httpClient: HttpClient, @Inject(REST_URL) private url: string) {
    this.myHeaders=new HttpHeaders();
    this.myHeaders=this.myHeaders.set('Access-Key', '<secret>');
    this.myHeaders=this.myHeaders.set('App-Names', ['exampleApp', 'proAngular6']);
  }

  getData():Observable<Product[]>{
    // return this.httpClient.jsonp<Product[]>(this.url, "callback");
    return this.sendRequest<Product[]>('GET', this.url+'product/getall');
  }

  getProductById(id:number):Observable<Product>{
    return this.sendRequest<Product>('GET', this.url+`product/getbyid/${id}`)
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
        body: body,
        headers: this.myHeaders
      })
      //.pipe(delay(2000))
      .pipe( catchError((error: Response)=>throwError(`Network error: ${error.statusText} (${error.status})`)) );
  }
}
