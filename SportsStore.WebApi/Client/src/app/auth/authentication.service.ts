import { Injectable } from "@angular/core";
import { Repository } from '../model/repository.model';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthenticationService{
  constructor(private repo: Repository, private router: Router){
    this.authenticated = !isNullOrUndefined(window.localStorage.getItem('token'));
  }

  authenticated: boolean = false;
  name: string;
  password: string;
  callbackUrl: string;

  login(): boolean{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    this.repo.login(this.name, this.password);
    this.authenticated = !isNullOrUndefined(window.localStorage.getItem('token'));
    return this.authenticated;
  }

  logout():void{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
