import { Supplier } from './model/supplier.model';
import { Product } from './model/product.model';
import { Repository } from './model/repository.model';
import { Component } from '@angular/core';
import { ErrorHandlerService } from './errorHandler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private lastError: string[];

  constructor(errorHandler: ErrorHandlerService){
    errorHandler.errors.subscribe(error=>{
      this.lastError = error;
    })
  }

  get error():string[]{
    return this.lastError;
  }

  clearError(){
    this.lastError=null;
  }
}
