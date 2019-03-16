import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogExampleComponent } from "../dialog-example/dialog-example.component";


@Component({
  selector: 'app-demo-library',
  templateUrl: './demo-library.component.html',
  styleUrls: ['./demo-library.component.scss']
})
export class DemoLibraryComponent implements OnInit {
  @Input() demoList: Object[];
  @Input() icons: boolean;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '10%',
      'left': '20%'
    };

    this.dialog.open(DialogExampleComponent, dialogConfig);
  }

  ngOnInit() {
  }
}
