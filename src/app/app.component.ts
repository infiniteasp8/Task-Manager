import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TaskService } from './services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from './core/core.service';
import { ngxCsv } from 'ngx-csv';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title!:'Task-Manager';
  displayedColumns = [ 'title', 'priority','description','dueDate','action']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,private _taskService:TaskService, private _coreService: CoreService){ }

  ngOnInit(): void {
    this.getTaskList();
  }
  openAddEditTaskForm(){
    const dialogref = this._dialog.open(TaskAddEditComponent);
    dialogref.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getTaskList();
        }
      }
    })
  }
  deleteTask(id: string) {
    this._taskService.deleteTask(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar("Task deleted!", "done");
        this.getTaskList(); 
      },
      error: (err) => {
        console.error("Error deleting task:", err);
        this._coreService.openSnackBar("Failed to delete task.", "error");
      },
    });
  }
getTaskList(){
  this._taskService.getTaskList().subscribe({
    
    next: (res) =>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    },
    error: console.log,
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
  }


  openEditForm(data: any) {
    const dialogRef = this._dialog.open(TaskAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTaskList();
        }
      },
    });
  }
  
     currentStatus: string = 'To-Do';
    statuses: string[] = ['To-Do', 'In Progress', 'Completed'];
  currentIndex: number = 0;

  toggleStatus(): void {
    this.currentIndex = (this.currentIndex + 1) % this.statuses.length;
    this.currentStatus = this.statuses[this.currentIndex];
    console.log('Current Status:', this.currentStatus);}
  

}





