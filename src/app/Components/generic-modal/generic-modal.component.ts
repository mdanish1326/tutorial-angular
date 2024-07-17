import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss'
})
export class GenericModalComponent {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Confirm';
    this.confirmButtonText = data.confirmButtonText || 'OK';
    this.cancelButtonText = data.cancelButtonText || 'Cancel';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
