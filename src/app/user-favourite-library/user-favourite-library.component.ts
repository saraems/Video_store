import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogExampleComponent} from "../dialog-example/dialog-example.component";

@Component({
  selector: 'app-user-favourite-library',
  templateUrl: './user-favourite-library.component.html',
  styleUrls: ['./user-favourite-library.component.scss']
})
export class UserFavouriteLibraryComponent implements OnInit {
  @Input() favouriteUserList;
  @Input() icons: boolean;
  @Output() onProp = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}

  length: number;
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  activePage = [];

  ngOnInit(): void {
    this.length = this.favouriteUserList.length;
    this.activePage = this.favouriteUserList.slice(0,this.pageSize);
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
    console.log(this.favouriteUserList);
    localStorage.setItem('favouriteUserList', JSON.stringify(this.favouriteUserList))
  }

  remove(video, e) {
    const index = this.favouriteUserList.indexOf(video);
    this.favouriteUserList.splice(index, 1);
    e.target.parentElement.remove();
    console.log(this.favouriteUserList);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.favouriteUserList.slice(firstCut, secondCut);
  }
}
