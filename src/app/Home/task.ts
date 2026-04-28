import { Component, model, output } from '@angular/core';

@Component({
  selector: 'single-task',
  imports: [],
  templateUrl: './task.html',
  styles: "",
})
export class Task {
  taskData = model<{name: string , done : boolean}>();

  callComplete = output<string>();

  callDelete = output<string>();

  completeTask(name:string | undefined) {
    if (name) {
        this.callComplete.emit(name);
        this.taskData.set({name : name, done : true});
    }
  }

  deleteTask(name: string | undefined) {
    if (name) {
        this.callDelete.emit(name);
    }
  }
}
