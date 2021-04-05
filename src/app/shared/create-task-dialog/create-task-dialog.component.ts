/*
 ============================================
; Title:  create-task-dialog.component.ts
; Author: Professor Krasso
; Date: 01 April 2021
; Modified By: Marie Nicole Barleta
; Description: Create task dialog component ts file
;===========================================
 */



import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }
/**
 * The value of input text will go as an array
 */
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }
/**
 * This function will close the dialog box once the 
 * create task is done
 */
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }
/**
 * This function will close the dialog box 
 * after clicking cancel button
 */
  cancel() {
    this.dialogRef.close();
  } 
}
