
/*
 ============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: Home component ts file
;===========================================
 */


//import statements
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/item.interface';
import { Employee } from 'src/app/shared/employee.interface';
import { TaskService } from 'src/app/shared/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Defined variables
  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) { 

    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log ('--Server response from findAllTasks--');
      console.log(res);

      
      this.employee = res.data;
      console.log('--Employee object--');
      console.log(this.employee);
    
    }, err => {
      console.log(err);
    }, () => {

      /**
       * It shows the console when it is successfully connected 
       * to the server and the database, here it shows 
       * when it is connected to todo and done sections.
       */
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      
      console.log('This is in the complete todo section');
      console.log(this.todo);
      console.log('This is in the complete done section');
      console.log(this.done);
    })
  }
  ngOnInit(): void {
  }

  /**
   * This function is connects to the 
   * openCreateDialog component and calls the 
   * create task once the user click the submit button
   * a new task item will be saved.
   */
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, 
        
        err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }
  
  /**
  * This is the drop event which is connected to the array 
  * of the CdkDragDrop event variable holder, there are statements
  * which checks if the item is equal to previous container and 
  * the event container if it is equal the status will be the same but 
  * if it is not equal it will update the new status of the task.
  */
  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Reordered item in an existing column/array");
      this.updateTaskList(this.empId, this.todo, this.done);
    }
    else
    {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      console.log("Moved task item to a different column/array");
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /**
   * 
   * @param taskId 
   * This function will call the delete API and will delete the selected
   * taskId from the specific employee Id
   */
  deleteTask(taskId: string): void {
    if (taskId)
    {
      console.log(`Task item ${taskId} was deleted`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }

  /**
   * 
   * @param empId
   * @param todo
   * @param done
   * This function will update the task's status 
   * from the specific employee id.
   */
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
  

}
