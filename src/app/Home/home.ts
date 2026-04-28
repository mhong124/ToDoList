import { Component, signal , inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Task} from './task';
import { Task as TaskItem } from './tasks';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {StorageService} from '../storageService';

@Component({
  selector: 'home',
  imports: [Task, FormsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './home.html',
  styles: ''
})
export class Home {

  filter: "all" | "active" | "done" = "all";

  newTask = '';

  newDate = new Date();

  storageService = inject(StorageService);

  // eventually save and retrieve from local storage
  storedData = this.storageService.getItem('taskList');
  allTasks: TaskItem[] = this.storedData ? JSON.parse(this.storedData) : [ {
    name: "welcome!", date : new Date('2026-4-28'), done : true
  }];

  saveList() {
    this.storageService.setItem('taskList', JSON.stringify(this.allTasks));
  }


  addTask() {
    let findTask = this.allTasks.find(t => t.name == this.newTask);
    if (!findTask) {
      this.allTasks.push({name : this.newTask, date: this.newDate,done: false});
      this.newTask = '';
      this.saveList();
    }
    else {
      // snackbar for when there is already a task of that name
    }
  };

  markComplete(name:string) {
    let completedTask = this.allTasks.find(t => t.name == name);

    if(completedTask) {
      completedTask.done = true;
      // console.log(this.allTasks);
      this.saveList();
    }
  }

  markDeleted(name: string) {
    this.allTasks = this.allTasks.filter(task => task.name != name);
    this.saveList();
  }

}