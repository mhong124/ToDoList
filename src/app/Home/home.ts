import { Component, signal , inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Task} from './task';
import { Task as TaskItem } from './tasks';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {StorageService} from '../storageService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ListSnackbar} from './list-snackbar';
import {ListFilterToggle} from './filter';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DeleteDialog} from './delete-dialog';

@Component({
  selector: 'home',
  imports: [Task, FormsModule, 
    ListFilterToggle, 
    MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDialogModule],
  templateUrl: './home.html',
  styles: ''
})
export class Home {

  filter: "all" | "active" | "completed" = "all";

  newTask = '';

  newDate = new Date();

  storageService = inject(StorageService);

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  snackBarMessage = "";

  // constructor(private snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(ListSnackbar, {
      data: {message : this.snackBarMessage},
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data : {message : "Are you sure you want to delete the selected tasks?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSelected();
      }
    });
  }
  
  // eventually save and retrieve from local storage
  storedData = this.storageService.getItem('taskList');
  allTasks: TaskItem[] = this.storedData ? JSON.parse(this.storedData) : [ {
    name: "welcome!", date : new Date('2026-4-28'), done : true
  }];

  displayedTasks = this.allTasks;

  saveList() {
    this.storageService.setItem('taskList', JSON.stringify(this.allTasks));
    this.filterTasks();
  }


  addTask() {
    let findTask = this.allTasks.find(t => t.name == this.newTask);
    if (!findTask && this.newTask != '') {
      this.allTasks.push({name : this.newTask, date: this.newDate,done: false});
      this.newTask = '';
      this.saveList();
    }
    else {
      this.snackBarMessage = "Task already exists or empty!";
      this.openSnackBar();
      this.newTask = '';
    }
  };

  markComplete(name:string) {
    let completedTask = this.allTasks.find(t => t.name == name);

    if(completedTask) {
      completedTask.done = true;
      // console.log(this.allTasks);
      this.snackBarMessage = "Task complete! Good Job!";
      this.openSnackBar();
      this.saveList();
    }
  }

  markDeleted(name: string) {
    this.allTasks = this.allTasks.filter(task => task.name != name);
    this.saveList();
  }

  filterTasks() {
    console.log("called");
    console.log(this.filter);
    if (this.filter == 'active') {
      this.displayedTasks = this.allTasks.filter(task => !task.done);
    }
    else if (this.filter == 'completed') {
      this.displayedTasks = this.allTasks.filter(task => task.done);
    }
    else {
      this.displayedTasks = this.allTasks;
    }
  }

  deleteSelected() {
    
  }
}