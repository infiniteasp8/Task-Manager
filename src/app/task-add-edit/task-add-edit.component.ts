import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit {
  taskForm: FormGroup;
  priority: string[] = [
    'Low',
    'Medium',
    'High'
  ];
  // status: string[] = [
  //   'To-Do',
  //   'On-going',
  //   'Completed'
  // ];
  constructor(
    private _fb: FormBuilder, private _taskService: TaskService, private _dialogref: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.taskForm = this._fb.group({
      priority: ['', [Validators.required, Validators.min(1)]],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.taskForm.valid) {
      if (this.data) {
        this._taskService
          .updateTask(this.data._id, this.taskForm.value)
          .subscribe({
            next: (val: any) => {
              console.log(val);
              this._coreService.openSnackBar("Task Updated!");
              this._dialogref.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {

        this._taskService.addTask(this.taskForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Task added successfully");
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }else{
      this._coreService.openSnackBar("Every field is mandatory");
    }


  }

}
