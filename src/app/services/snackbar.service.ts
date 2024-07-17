import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  _snackbar = inject(MatSnackBar);

  openSnackBar(message: string, action: string = 'OK', config?: any) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }

  hideSnackBar() {
    this._snackbar.dismiss();
  }
}
