import { AuthenticationService } from './authentication.service';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  templateUrl: 'authentication.component.html'
})
export class AuthenticationComponent{
  constructor(public authService: AuthenticationService, private router: Router){}

  showError: boolean = false;

  login(){
    this.showError = false;
    this.authService.login().then(res=>{
      this.showError=!res;
    }).finally(()=>{
      if (!this.showError) {
        this.router.navigateByUrl(this.authService.callbackUrl);
      }
    });

  }
}
