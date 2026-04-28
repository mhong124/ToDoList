import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-dialog.html',
})
export class DeleteDialog {}