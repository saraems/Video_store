import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { VideoDialogComponent } from "../video-dialog/video-dialog.component";
import {Video} from "../video";
import {Sort} from '@angular/material';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  @Input() videoList;
  @Input() favouriteVideoList;
  @Input() videoListName: string;
  @Input() favouriteListName: string;
  @Input() icons: boolean;
  @Output() onProp = new EventEmitter<string>();

  sortedData: Video[];



  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  activePage = [];

  constructor(public dialog: MatDialog) {
    this.sortedData = this.activePage.slice();
  }

  ngOnInit(): void {
    this.length = this.videoList.length;
    this.sortedData = this.activePage = this.videoList.slice(0, this.pageSize);
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
    let includedInFavourite = this.favouriteVideoList.includes(video);

    console.log(this.favouriteVideoList, video, index, includedInFavourite);

    if (index === -1) {
      video.favourite = true;
      this.favouriteVideoList.push(video)

    } else if (index !== -1) {
      video.favourite = false;
      this.favouriteVideoList.splice(index, 1);

      if(this.videoListName.includes('favourite')) {
          this.onFavourite(index);
          e.target.parentElement.parentElement.parentElement.remove();
      }
    }

    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
    localStorage.setItem(this.favouriteListName, JSON.stringify(this.favouriteVideoList));
    this.length = this.videoList.length;

    console.log(this.favouriteVideoList, video, index, includedInFavourite);
  }

  remove(video, e) {
    const indexVideoList = this.videoList.indexOf(video);
    const indexFavourite = this.favouriteVideoList.indexOf(video);

    if(video.favourite) {
      this.onFavourite(indexVideoList);
      this.favouriteVideoList.splice(indexFavourite, 1);
    }

    this.videoList.splice(indexVideoList, 1);
    this.activePage.splice(indexVideoList, 1);
    this.length = this.videoList.length;

    e.target.parentElement.parentElement.parentElement.remove();
    localStorage.setItem(this.videoListName, JSON.stringify(this.videoList));
  }

  onFavourite(index) {
    this.onProp.emit(index);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.sortedData = this.activePage = this.videoList.slice(firstCut, secondCut);
  }

  sortData(sort: Sort) {
    console.log('sort', sort);
    const data = this.activePage.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'likes': return compare(a.likes, b.likes, isAsc);
        case 'views': return compare(a.views, b.views, isAsc);
        case 'addingDate': return compare(a.addingDate, b.addingDate, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
