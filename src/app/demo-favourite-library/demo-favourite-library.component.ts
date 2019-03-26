import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogExampleComponent } from "../dialog-example/dialog-example.component";

@Component({
  selector: 'app-demo-favourite-library',
  templateUrl: './demo-favourite-library.component.html',
  styleUrls: ['./demo-favourite-library.component.scss']
})
export class DemoFavouriteLibraryComponent implements OnInit {
  @Input() favouriteDemoList; // fav
  // @Input() demoList; //demo
  @Input() icons: boolean;
  length: number;

  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  activePage = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.length = this.favouriteDemoList.length;
    this.activePage = this.favouriteDemoList.slice(0,this.pageSize);
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
    } else if (index != -1) {
      this.favouriteDemoList.splice(index, 1)
    }
    e.target.classList.toggle('liked');
    e.target.classList.toggle('notLiked');
    console.log(this.favouriteDemoList);
    localStorage.setItem('favouriteDemoList', JSON.stringify(this.favouriteDemoList))
  }

  remove(video, e) {
    const index = this.favouriteDemoList.indexOf(video);
    this.favouriteDemoList.splice(index, 1);
    e.target.parentElement.remove();
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.favouriteDemoList.slice(firstCut, secondCut);
  }
}
