import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  isLoggedIn = false;
  constructor(private loginservice: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.loginservice.isUserLoggedIn().subscribe(x => {
      this.isLoggedIn = x;
    });
    return this.isLoggedIn;
  }

  }

