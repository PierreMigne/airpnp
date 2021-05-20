import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  successSnackbar(msg: string): void {
    this.matSnackBar.open(msg, 'X' , {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4 * 1000,
      panelClass: ['successSnackbar'],
    });
  }

  alertSnackbar(msg: string): void {
    this.matSnackBar.open(msg, 'X' , {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4 * 1000,
      panelClass: ['alertSnackbar'],
    });
  }
}
