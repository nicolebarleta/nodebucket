/*
 ============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: Base-layout component ts file
;===========================================
 */


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
//recent date is declared 
  year: number = Date.now();
  
  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

//This function will remove the session that it is on
signOut() {
  this.cookieService.deleteAll();
  this.router.navigate(['/session/login']);
  }

}
