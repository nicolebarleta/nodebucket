/*
 ============================================
; Title:  task.service.ts
; Author: Professor Krasso
; Date: 29 March 2021
; Modified By: Marie Nicole Barleta
; Description: Connects to the CRUD API
;===========================================
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
/**
 * 
 * @param empId 
 * @returns an Observable of type any, also all the task of the specific employee id
 */
  findAllTasks(empId: string): Observable<any> {

    return this.http.get('/api/employees/' + empId + '/tasks')
  }
  /**
   * 
   * @param empId 
   * @param task
   * @returns the task of that was posted for the specific employee id
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks',{
      text: task
    })
  }
  /**
   * 
   * @param empId 
   * @param todo 
   * @param done
   * @returns the updated tasks for the specific employee id
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks',{
      todo,
      done
    })
  }
  /**
   * 
   * @param empId 
   * @param taskId
   * @returns the deleted specific task id on the specific employee 
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`);
  }
}
