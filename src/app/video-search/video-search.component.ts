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
  video;

  private error: any;

  demo: boolean;
  user: boolean;
  icons: boolean;

  favouriteDemo: boolean;
  favouriteUser: boolean;

  demoList = demoList;
  favouriteDemoList;

  userLibrary;
  favouriteUserList;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.videoInput = '';
    this.icons = true;
    this.favouriteDemo = false;
    this.favouriteUser = false;
    this.demoList = localStorage.demoList ?  JSON.parse(localStorage.getItem('demoList')) : demoList;
    this.userLibrary = localStorage.userLibrary ? JSON.parse(localStorage.getItem('userLibrary')) : [];
    this.favouriteDemoList = localStorage.favouriteDemoList ? this.demoList.filter(item => item.favourite) : [];
    this.favouriteUserList = localStorage.favouriteUserList ? this.userLibrary.filter(item => item.favourite) : [];
    console.log(this.userLibrary);
  }

  createVideoId() {
    return this.userLibrary ? this.userLibrary[this.userLibrary.length] : 1;
  }

  findVideo(videoInput: string) {

    this.videoSource = DataService.checkVideoSource(this.videoInput);
    this.videoKey = DataService.extractVideoKey(this.videoInput, this.videoSource);

    if (videoInput && this.videoSource === 'youtube') {
      return this.dataService.getVideo(DataService.createYoutubeUrlRequest(this.videoKey), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
          this.videoRawData = data;
            console.log(this.videoRawData);
          this.video = new Video(0, this.videoRawData.items[0].id, this.videoRawData.items[0].snippet.title, parseInt(this.videoRawData.items[0].statistics.viewCount), parseInt(this.videoRawData.items[0].statistics.likeCount), this.videoRawData.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/embed/${this.videoRawData.items[0].id}`, false);
          this.videoInput = '';
        },
          error => this.error = error
        );
    } else if (videoInput && this.videoSource === 'vimeo') {
      return this.dataService.getVideo(DataService.createVimeoUrlRequest(this.videoKey), DataService.httpOptions())
        .subscribe((data: youtubeResponse) => {
          this.videoRawData = data;
          console.log(this.videoRawData);
          this.video = new Video(0, this.videoKey, this.videoRawData.name, parseInt(this.videoRawData.stats.plays), parseInt(this.videoRawData.metadata.connections.likes.total), this.videoRawData.pictures.sizes[3].link, `https://player.vimeo.com/video/${this.videoKey}`, false);
          this.videoInput = '';
        }
      )
    }
  }

  addToMyLibrary(video): void {
    // console.log(this.video);
    video.videoId = this.createVideoId();
    this.userLibrary.push(video);
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

  changed(index, videoList, videoListName) {
    index = parseInt(index);
    console.log(`Child changed!`, index);
    videoList[index].favourite = false;
    localStorage.setItem(videoListName, JSON.stringify(videoList));
  }
}
