import { Component , model, output } from "@angular/core";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector : "list-filter-toggle",
    template : `
    <mat-button-toggle-group name="status" aria-label="Status" [(ngModel)]= 'status' (ngModelChange) = 'deliverChange()'>
    <mat-button-toggle value="active">Active</mat-button-toggle>
    <mat-button-toggle value="completed">Completed</mat-button-toggle>
    <mat-button-toggle value="all">All</mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styles : '',
    standalone : true,
    imports : [MatButtonToggleModule, FormsModule],
})
export class ListFilterToggle {
    status = model<"all" | "active" | "completed">();

    statusChange = output<string>();

    deliverChange() {
        if(this.status) {
            console.log(this.status());
            this.statusChange.emit(this.status() || "");
        }
    }
}