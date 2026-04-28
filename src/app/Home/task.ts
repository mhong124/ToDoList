import { Component, model, output, inject } from '@angular/core';
import {DeleteDialog} from './delete-dialog';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'single-task',
  standalone: true,
  imports: [DeleteDialog, MatDialogModule, DatePipe],
  templateUrl: './task.html',
  styles: '',
})
export class Task {
  taskData = model<{name: string , date : Date, done : boolean}>();

  callComplete = output<string>();

  callDelete = output<string>();

  // dialog

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(this.taskData()?.name);
      }
    });
  }

  completeTask(name:string | undefined, date : Date | undefined) {
    if (name && date) {
        this.callComplete.emit(name);
        this.taskData.set({name : name, date: date, done : true});
    }
  }

  deleteTask(name: string | undefined) {
    if (name) {
        this.callDelete.emit(name);
    }
  }
}
