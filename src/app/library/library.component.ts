import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { VideoDialogComponent } from "../video-dialog/video-dialog.component";


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  @Input() videoList: Object[];
  @Input() favouriteVideoList: Object[];
  @Input() videoListName: string;
  @Input() favouriteListName: string;
  @Input() icons: boolean;

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  activePage = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.length = this.videoList.length;
    this.activePage = this.videoList.slice(0,this.pageSize);
  }

  openDialog(url): void {
    console.log(url);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      video: url
    };
    this.dialog.open(VideoDialogComponent, dialogConfig);
  }

  favourite(video, e) {
    console.log(video, video.favourite);
    const index = this.favouriteVideoList.indexOf(video);
    video.favourite = !video.favourite;
    console.log(video.favourite);
    if (index === -1) {
      this.favouriteVideoList.push(video);
    } else if (index != -1) {
      this.favouriteVideoList.splice(index, 1)
    }
    // e.target.classList.toggle('liked');
    // e.target.classList.toggle('notLiked');
    localStorage.setItem(this.favouriteListName, JSON.stringify(this.favouriteVideoList));
    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
  }

  remove(video, e) {
    const index = this.videoList.indexOf(video);
    this.videoList.splice(index, 1);
    this.activePage.splice(index, 1);
    console.log(video, this.videoList);
    e.target.parentElement.parentElement.parentElement.remove();
    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.videoList.slice(firstCut, secondCut);
  }
}
