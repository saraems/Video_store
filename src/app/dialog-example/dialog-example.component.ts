import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
  controllerSrc: any;

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>, private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const url= this.data.video.videoUrl;
    this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
