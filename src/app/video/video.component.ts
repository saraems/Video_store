import {Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { demoList } from '../demoVideosList';
import {youtubeResponse} from "../YoutubeResponse";


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  video: any;
  videoId: string;
  imagePath: string;
  private error: any;
  demo: boolean;
  user: boolean;
  icons: boolean;
  demoList: object[] = demoList;
  userLibrary: object[];
  favouriteDemo: boolean;
  favouriteUser: boolean;
  favouriteDemoList: object[];
  favouriteUserList: object[];

  constructor(private dataService: DataService) {}

  findVideo(videoId: string) {

    if (videoId && (this.videoId.includes('youtube') || this.videoId.length === 11)) {
      return this.dataService.getVideo(DataService.createYoutubeUrlRequest(videoId), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
          this.video = data;
          this.imagePath = this.video.items[0].snippet.thumbnails.high.url;
          this.videoId = '';
        },
          error => this.error = error
        );
    } else if (videoId && (this.videoId.includes('vimeo') || this.videoId.length <= 9)) {
      return this.dataService.getVideo(DataService.createVimeoUrlRequest(videoId), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
            this.video = data;
            console.log(this.video);
            this.imagePath = this.video.pictures.sizes[4].link;
            this.videoId = '';
          })
    }
  }
  static getTodayDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  addToMyLibrary(): void {

    const videoLibraryTemplate = {
      filmId: 1,
      externalFilmId: 'x',
      title: this.video.name,
      views: this.video.stats.plays,
      likes: this.video.metadata.connections.likes.total,
      imgUrl: this.video.pictures.sizes[4].link,
      videoUrl: this.video.link,
      favourite: false,
      addingDate: VideoComponent.getTodayDate()
    };

console.log(videoLibraryTemplate);
  //   const videoLibraryTemplate = {
  //     filmId: 1,
  //     externalFilmId: this.video.items[0].id,
  //     title: this.video.items[0].snippet.title,
  //     views: this.video.items[0].statistics.viewCount,
  //     likes: this.video.items[0].statistics.likeCount,
  //     imgUrl: this.video.items[0].snippet.thumbnails.high.url,
  //     videoUrl: 'https://www.youtube.com/embed/' + this.video.items[0].id,
  //     favourite: false,
  //     addingDate: VideoComponent.getTodayDate()
  // };
    this.userLibrary.push(videoLibraryTemplate);
    console.log(this.userLibrary);
    localStorage.setItem('userLibrary', JSON.stringify(this.userLibrary));
  }
  showDemo():void {
    console.log(this.favouriteDemoList);

    this.user = false;
    this.favouriteUser = false;
    this.favouriteDemo = false;
    this.demo = !this.demo;
  }
  showUser():void {
    this.userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
    this.demo = false;
    this.favouriteUser = false;
    this.favouriteDemo = false;
    this.user = !this.user;
  }

  showList():void {
    this.icons = false;
  }
  showIcons():void {
    this.icons = true;
  }
  showFavourite() {
    console.log(this.favouriteDemoList);

    console.log('user', this.favouriteUserList, 'demo', this.favouriteDemoList);
    if (this.demo) {
      // this.favouriteDemoList = JSON.parse(localStorage.getItem('favouriteDemoList'));
      this.favouriteDemo = true;
      this.demo = false;
    } else if (this.user) {
      // this.favouriteUserList = JSON.parse(localStorage.getItem('favouriteUserList'));
      this.favouriteUser = true;
      this.user = false;
    } else {
      this.favouriteUser = false;
      this.favouriteDemo = false;
    }
  };
  // updateDemoFavouriteList(value) {
  //   console.log(`Child changed!`, value);
  //   this.favouriteDemoList = value;
  // }
  // updateUserFavouriteList(value) {
  //   console.log(`Child changed!`, value);
  //   this.favouriteUserList = value;
  // }

    ngOnInit() {
    this.videoId = '';
    this.icons = true;
    this.favouriteDemo = false;
    this.favouriteUser = false;
    this.demoList = demoList;
    this.userLibrary = localStorage.userLibrary ? JSON.parse(localStorage.getItem('userLibrary')) : [];
    this.favouriteDemoList = localStorage.favouriteDemoList ? JSON.parse(localStorage.getItem('favouriteDemoList')) : [];
    this.favouriteUserList = localStorage.favouriteUserList ? JSON.parse(localStorage.getItem('favouriteUserList')) : [];
  }
}
