/*
 ============================================
; Title:  auth-guard.guard.ts
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: Auth-guard ts file
; This is where the CanActivate routing is declared
;===========================================
 */

 //import statements
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService){

  }
  //canActivate have the activated route and the state of the route 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // declaration of sessionUser for the cookieService for the session_user
      const sessionUser = this.cookieService.get('session_user');
    // once the empId is valid it will return true
    if (sessionUser)
    {
      return true;
    }
    // invalid empId will go back to the login session
    else
    {
      this.router.navigate(['/session/login']);
      return false;
    }

  }
  
}
