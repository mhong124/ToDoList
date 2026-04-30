import { Component, input } from '@angular/core';
import {RoundProgressComponent} from 'angular-svg-round-progressbar';

@Component({
  selector: 'progress-pie',
  standalone: true,
  template: `<round-progress 
  [current]="complete()" 
  [max]="totalTasks()"
  [radius] = "100"
  color = '#FFB8DE'
  background='#FFEAF5'/>`,
  imports : [RoundProgressComponent],
})
export class ProgressPie {
    complete = input<number>(0);

    totalTasks = input<number>(0);
}
