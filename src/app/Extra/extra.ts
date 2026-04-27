import { Component, signal } from '@angular/core';

@Component({
  selector: 'extra',
  imports: [],
  template: 'Extra',
  styles: ''
})
export class Extra {
  protected readonly title = signal('ToDoList');
}