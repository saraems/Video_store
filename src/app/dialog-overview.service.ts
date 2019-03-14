import { Injectable } from '@angular/core';
import { DialogExampleComponent } from './dialog-example/dialog-example.component'
import { MatDialog } from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class DialogOverviewExample {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
