import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Task} from './task';

@Component({
  selector: 'home',
  imports: [Task, FormsModule],
  templateUrl: './home.html',
  styles: ''
})
export class Home {

  filter: "all" | "active" | "done" = "all";

  newTask = '';

  // eventually save and retrieve from local storage
  allTasks = [
    {
      name: "welcome!", done : true
    }
  ];

  addTask() {
    let findTask = this.allTasks.find(t => t.name == this.newTask);
    if (!findTask) {
      this.allTasks.push({name : this.newTask, done: false});
      this.newTask = '';
    }
  };

  markComplete(name:string) {
    let completedTask = this.allTasks.find(t => t.name == name);

    if(completedTask) {
      completedTask.done = true;
      console.log(this.allTasks);
    }
  }

  markDeleted(name: string) {
    this.allTasks = this.allTasks.filter(task => task.name != name);
  }

}