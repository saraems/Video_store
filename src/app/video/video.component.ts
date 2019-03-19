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
  fullUrl: string;
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

  createUrl(videoId: string) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/`;
    const userKey = `&key=AIzaSyBcMNQVkmuIp8vI5QXDXQWef_AhV_zP5Yk`;
    const youtubeRequestScope = 'videos?&fields=items(id,snippet(title,thumbnails),statistics)&part=snippet,statistics';
    let videoKey;
    videoId.length > 12 ? (videoKey = '&id=' + videoId.replace('https://www.youtube.com/watch?v=', '')) : (videoKey = `&id=${videoId}`);

    const fullUrl = (apiUrl + youtubeRequestScope + videoKey + userKey);
    console.log(fullUrl);
    this.fullUrl = fullUrl;
  }

  async findVideo(videoId: string) {
    if (videoId) {
      await this.createUrl(videoId);
      return this.dataService.getVideo(this.fullUrl)
        .subscribe((data: youtubeResponse) => {
          this.video = data;
          this.imagePath = this.video.items[0].snippet.thumbnails.high.url;
          this.videoId = '';
        },
          error => this.error = error
        );
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
      externalFilmId: this.video.items[0].id,
      title: this.video.items[0].snippet.title,
      views: this.video.items[0].statistics.viewCount,
      likes: this.video.items[0].statistics.likeCount,
      imgUrl: this.video.items[0].snippet.thumbnails.high.url,
      videoUrl: 'https://www.youtube.com/embed/' + this.video.items[0].id,
      favourite: false,
      addingDate: VideoComponent.getTodayDate()
  };
    this.userLibrary.push(videoLibraryTemplate);
    console.log(this.userLibrary);
    localStorage.setItem('userLibrary', JSON.stringify(this.userLibrary));
  }
  showDemo():void {
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
    console.log('user', this.favouriteUserList, 'demo', this.favouriteDemoList);
    if (this.demo) {
      this.favouriteDemoList = JSON.parse(localStorage.getItem('favouriteDemoList'));
      this.favouriteDemo = true;
      this.demo = false;
    } else if (this.user) {
      this.favouriteDemoList = JSON.parse(localStorage.getItem('favouriteDemoList'));
      this.favouriteUser = true;
      this.user = false;
    } else {
      this.favouriteUser = false;
      this.favouriteDemo = false;
    }
  };
  updateDemoFavouriteList(value) {
    console.log(`Child changed!`, value);
    this.favouriteDemoList = value;
  }
  updateUserFavouriteList(value) {
    console.log(`Child changed!`, value);
    this.favouriteUserList = value;
  }

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
