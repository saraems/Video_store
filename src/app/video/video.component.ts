import {Component, OnInit} from '@angular/core';
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
  userLibrary: object[];
  demo: boolean;
  user: boolean;
  demoList: object[] = demoList;
  private error: any;
  icons: boolean;
  list: boolean;

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
  }
  showDemo():void {
    this.demo = !this.demo;
    console.log(this.demo, this.icons, this.list);
  }
  showUser():void {
    this.demo = false;
    this.user = !this.user;
  }

  showList():void {
    this.icons = false;
  }
  showIcons():void {
    this.icons = true;
  }

    ngOnInit() {
    this.videoId = '';
    this.userLibrary = [];
    this.icons = true;
  }
}
