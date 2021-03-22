/*
 ============================================
; Title:  login.component.ts
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: Login component ts file
;===========================================
 */


//import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
//login component declaration
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm variable to be able to use the FormGroup
  loginForm: FormGroup;
  //constructor for formbuilder, router, httpclient and matsnackbar
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, 
    private http: HttpClient, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      //Validators for required input form and numerical value
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
}

login() {
  //empId from database is retrieved 
  const empId = this.loginForm.controls['empId'].value;
  console.log(empId);
//the httpclient connects to the api employees which is made in node.js API
  this.http.get('/api/employees/' + empId).subscribe(res => {
    //in the session_user a valid empId will allow users to have a cookieservice and navigate home
    if (res['data']){
      this.cookieService.set('session_user', empId, 1);
      this.router.navigate(['/']);
    }
    //if the input id doesn't match the empId in the database it will shows this warning message
    else if (!(res['data']) && (res['httpCode'] === '200'))
    {
      this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
    }
    else 
    //an error message will show once it goes through the validators (input required and numerical value only)
    {
      this.openSnackBar(res['message'], 'ERROR')
    }
  })
}
  //The function declaration of th error message notification
  openSnackBar(message: string, notificationType: string) : void 
  {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

}
