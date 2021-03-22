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

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
//recent date is declared 
  year: number = Date.now();
  
  constructor() { }

  ngOnInit(): void {
  }

}
