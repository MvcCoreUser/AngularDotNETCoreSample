import { AuthenticationService } from './authentication.service';
import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthentitcationGuard{
  constructor(private router: Router, private authService: AuthenticationService){}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.authService.authenticated) {
      return true;
    } else {
      this.authService.callbackUrl='/admin/'+route.url.toString();
      this.router.navigateByUrl('/login');
    }
  }
}
