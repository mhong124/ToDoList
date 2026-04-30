import { Component, signal , inject, OnInit } from '@angular/core';
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
import {ProgressPie} from './progress-pie';

@Component({
  selector: 'home',
  imports: [Task, FormsModule, ProgressPie,
    ListFilterToggle, 
    MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDialogModule],
  templateUrl: './home.html',
  styles: ''
})
export class Home implements OnInit {
  allTasks!: TaskItem[];

  progress!: number;

  displayedTasks!: TaskItem[];

  ngOnInit(): void {
    let storedData = this.storageService.getItem('taskList');
    this.allTasks = storedData ? JSON.parse(storedData) : [ {
    name: "welcome!", date : new Date('2026-4-28'), done : true
    }];

    // completed task count
    this.progress = this.allTasks.reduce((acc, task) => task.done ? acc + 1 : acc, 0);
    this.displayedTasks = this.allTasks;
  }

  filter: "all" | "active" | "completed" = "all";

  newTask = '';

  newDate = new Date();

  storageService = inject(StorageService);

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  snackBarMessage = "";

  selectedTasks: string[] = [];

  // eventually save and retrieve from local storage
  //storedData = this.storageService.getItem('taskList');
  //progress = this.allTasks.reduce((acc, task) => task.done ? acc + 1 : acc, 0);

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
    if (this.selectedTasks.length == 0) {
      this.snackBarMessage = "Select Tasks to Delete!";
      this.openSnackBar();
    }
    else {
      const dialogRef = this.dialog.open(DeleteDialog, {
        data : {message : "Are you sure you want to delete the selected tasks?"}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteSelected();
        }
      });
    };
  }

  saveList() {
    this.storageService.setItem('taskList', JSON.stringify(this.allTasks));
    this.filterTasks();
  }


  addTask() {
    let findTask = this.allTasks.find(t => t.name == this.newTask);
    if (!findTask && this.newTask != '') {
      this.allTasks = [...this.allTasks,{name : this.newTask, date: this.newDate,done: false}];
      this.allTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
      //this.progress += 1;
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
    this.progress = this.allTasks.reduce((acc, task) => task.done ? acc + 1 : acc, 0);
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
    if (this.selectedTasks.length == 0) {
      this.snackBarMessage = "Select Tasks to Delete!";
      this.openSnackBar();
    }

    this.selectedTasks.forEach(task => {
      this.markDeleted(task);
    });

    this.selectedTasks = [];
  }

  selectTask(name: string) {
    this.selectedTasks = [...this.selectedTasks, name];
  }

  unselectTask(name:string) {
    this.selectedTasks = this.selectedTasks.filter(task => task != name);
  }
}