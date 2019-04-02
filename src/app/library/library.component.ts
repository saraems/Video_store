import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { VideoDialogComponent } from "../video-dialog/video-dialog.component";
import {SimpleChanges} from "@angular/core/src/metadata/lifecycle_hooks";
import {log} from "util";


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit{
  @Input() videoList;
  @Input() favouriteVideoList;
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

    let index = this.favouriteVideoList.indexOf(video);

    console.log(this.favouriteVideoList, video, index);
    // console.log(JSON.parse(localStorage.getItem('favouriteDemoList')));
    // video.favourite = !video.favourite;
    // this.favouriteVideoList = this.videoList.filter((item) => item.favourite === true);


    if (index === -1) {
      video.favourite = true;
      this.favouriteVideoList.push(video)

    } else if (index !== -1) {
      video.favourite = false;
      this.favouriteVideoList.splice(index, 1);

        if(this.videoListName.includes('favourite')) {
            e.target.parentElement.parentElement.parentElement.remove();
        }
    }
    index = this.favouriteVideoList.indexOf(video);

    // const index = this.favouriteVideoList.indexOf(video);
    // // console.log(video, this.favouriteVideoList, index);
    // video.favourite = !video.favourite;
    //
    // if (index === -1) {
    //   this.favouriteVideoList.push(video);
    // } else if (index != -1) {
    //   this.favouriteVideoList.splice(index, 1);
    //   this.videoList[index].favourite === false;
    //   // e.target.parentElement.parentElement.parentElement.remove();
    // }
    // console.log(video, this.favouriteVideoList, index);
    //
    // // this.favouriteVideoList = this.favouriteVideoList.filter((item) => item.favourite === true);
    // // console.log(video, this.favouriteVideoList, index);
    //
    localStorage.setItem(this.favouriteListName, JSON.stringify(this.favouriteVideoList));
    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
    // console.log(JSON.parse(localStorage.getItem('favouriteDemoList')));
    console.log(this.favouriteVideoList, video, index);



  }

  remove(video, e) {
    const index = this.videoList.indexOf(video);
    this.videoList.splice(index, 1);
    this.activePage.splice(index, 1);
    e.target.parentElement.parentElement.parentElement.remove();
    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.videoList.slice(firstCut, secondCut);
  }
}
