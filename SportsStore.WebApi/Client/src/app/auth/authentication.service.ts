import { Injectable } from "@angular/core";
import { Repository } from '../model/repository.model';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthenticationService{
  constructor(private repo: Repository, private router: Router){
    this.authenticated = !isNullOrUndefined(window.localStorage.getItem('token'));
  }

  authenticated: boolean = false;
  name: string;
  password: string;
  callbackUrl: string;

  login(): Promise<boolean>{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    return this.repo.login(this.name, this.password).toPromise().then(
      response=>{
        window.localStorage.setItem('token', response.token);
        this.authenticated=true;
        return true;
      },
      _error=>{
        this.authenticated=false;
        return false;
      }
    );

  }

  logout():void{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
