import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  length: number;
  @Output() onProp = new EventEmitter<string>();
  favouriteDemoList;
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  activePage = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.length = this.demoList.length;
    this.activePage = this.demoList.slice(0,this.pageSize);
    this.favouriteDemoList = localStorage.favouriteDemoList ? JSON.parse(localStorage.getItem('favouriteDemoList')) : [];
  }

  openDialog(url): void {
    console.log(url);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      video: url
    };
    this.dialog.open(DialogExampleComponent, dialogConfig);
  }

  favourite(video, e) {
    const index = this.favouriteDemoList.indexOf(video);
    console.log(index, this.favouriteDemoList);
    if (index === -1) {
      this.favouriteDemoList.push(video);
      video.favourite = !video.favourite;
    } else {
      this.favouriteDemoList.splice(index, 1)
    }
    e.target.classList.toggle('liked');
    e.target.classList.toggle('notLiked');
    this.onProp.emit(this.favouriteDemoList);
    console.log(this.favouriteDemoList);
    localStorage.setItem('favouriteDemoList', JSON.stringify(this.favouriteDemoList))
  }

  remove(video, e) {
    const index = this.demoList.indexOf(video);
    this.demoList.splice(index, 1);
    e.target.parentElement.remove();
    console.log(this.demoList);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.demoList.slice(firstCut, secondCut);
  }
}
