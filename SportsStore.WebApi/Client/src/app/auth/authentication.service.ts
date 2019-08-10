import { Injectable } from "@angular/core";
import { Repository } from '../model/repository.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService{
  constructor(private repo: Repository, private router: Router){}

  authenticated: boolean = false;
  name: string;
  password: string;
  callbackUrl: string;

  login(): boolean{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    this.repo.login(this.name, this.password);
    this.authenticated = window.localStorage.getItem('token').length>0;
    return this.authenticated;
  }

  logout():void{
    this.authenticated = false;
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
