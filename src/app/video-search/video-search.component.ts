import {Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { demoList } from '../demo-videos-list';
import {youtubeResponse} from "../youtube-response";
import { Video } from '../video'


@Component({
  selector: 'app-video',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss'],
})
export class VideoSearchComponent implements OnInit {

  videoInput: string;
  videoSource: string;
  videoKey: string;

  videoRawData: any;
  video: object;

  private error: any;

  demo: boolean;
  user: boolean;
  icons: boolean;

  favouriteDemo: boolean;
  favouriteUser: boolean;

  demoList: object[] = demoList;
  favouriteDemoList: object[];

  userLibrary;
  favouriteUserList: object[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.videoInput = '';
    this.icons = true;
    this.favouriteDemo = false;
    this.favouriteUser = false;
    this.demoList = localStorage.demoList ?  JSON.parse(localStorage.getItem('demoList')) : demoList;
    this.userLibrary = localStorage.userLibrary ? JSON.parse(localStorage.getItem('userLibrary')) : [];
    this.favouriteDemoList = localStorage.favouriteDemoList ? JSON.parse(localStorage.getItem('favouriteDemoList')) : [];
    this.favouriteUserList = localStorage.favouriteUserList ? JSON.parse(localStorage.getItem('favouriteUserList')) : [];
  }

  createVideoId() {
    return this.userLibrary === [] ? 1 : this.userLibrary[this.userLibrary.len - 1].videoId + 1
  }

  findVideo(videoInput: string) {

    this.videoSource = DataService.checkVideoSource(this.videoInput);
    this.videoKey = DataService.extractVideoKey(this.videoInput, this.videoSource);

    if (videoInput && this.videoSource === 'youtube') {
      return this.dataService.getVideo(DataService.createYoutubeUrlRequest(this.videoKey), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
          this.videoRawData = data;
            console.log(this.videoRawData);
          this.video = new Video(0, this.videoRawData.items[0].id, this.videoRawData.items[0].snippet.title, this.videoRawData.items[0].statistics.viewCount, this.videoRawData.items[0].statistics.likeCount, this.videoRawData.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/embed/${this.videoRawData.items[0].id}`, false);
          this.videoInput = '';
        },
          error => this.error = error
        );
    } else if (videoInput && this.videoSource === 'vimeo') {
      return this.dataService.getVideo(DataService.createVimeoUrlRequest(this.videoKey), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
          this.videoRawData = data;
          console.log(this.videoRawData);
          this.video = new Video(0, this.videoKey, this.videoRawData.name, this.videoRawData.stats.plays, this.videoRawData.metadata.connections.likes.total, this.videoRawData.pictures.sizes[3].link, `https://player.vimeo.com/video/${this.videoKey}`, false);
          this.videoInput = '';
        }
      )
    }
  }

  addToMyLibrary(): void {
    console.log(this.video);
    // this.video.videoId = this.createVideoId();
    this.userLibrary.push(this.video);
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
    if (this.demo) {
      this.favouriteDemo = true;
      this.demo = false;
    } else if (this.user) {
      this.favouriteUser = true;
      this.user = false;
    } else {
      this.favouriteUser = false;
      this.favouriteDemo = false;
    }
  };
}
