import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogExampleComponent} from "../dialog-example/dialog-example.component";

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss']
})
export class UserLibraryComponent implements OnInit {
  @Input() userLibrary: Object[];
  @Input() favouriteUserList;

  @Input() icons: boolean;
  length: number;
  // @Output() onProp = new EventEmitter<string>();
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  activePage = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.length = this.userLibrary.length;
    this.activePage = this.userLibrary.slice(0,this.pageSize);
    // this.favouriteUserList = localStorage.favouriteUserList ? JSON.parse(localStorage.getItem('favouriteUserList')) : [];
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
    const index = this.favouriteUserList.indexOf(video);
    console.log(index, this.favouriteUserList);
    if (index === -1) {
      this.favouriteUserList.push(video);
      video.favourite = !video.favourite;
    } else if (index != -1) {
      this.favouriteUserList.splice(index, 1)
    }
    e.target.classList.toggle('liked');
    e.target.classList.toggle('notLiked');
    // this.onProp.emit(this.favouriteUserList);
    console.log(this.favouriteUserList);
    localStorage.setItem('favouriteUserList', JSON.stringify(this.favouriteUserList))
  }

  remove(video, e) {
    const index = this.userLibrary.indexOf(video);
    this.userLibrary.splice(index, 1);
    e.target.parentElement.remove();
    console.log(this.userLibrary);
    localStorage.setItem('userLibrary', JSON.stringify(this.userLibrary))
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.userLibrary.slice(firstCut, secondCut);
  }
}
