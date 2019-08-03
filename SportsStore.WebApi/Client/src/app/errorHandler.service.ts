import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ErrorHandlerService{
  private subject: Subject<string[]>=new Subject<string[]>();

  handleError(error: any){
   // window.setTimeout(()=>{
      if (error instanceof ValidationError) {
        this.subject.next(error.errors);
      } else if(error instanceof Error){
        this.subject.next([error.message]);
      }
      else{
        this.subject.next(['An Error has occured']);
      }
    //});
  }

  get errors():Observable<string[]>{
    return this.subject;
  }
}

export class ValidationError implements Error{
  name: string;
  message: string;
  stack?: string;

  constructor(public errors: string[]){}

}
