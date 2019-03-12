import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video: any;
  videoId: string;
  fullUrl: string;
  imagePath: string;


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
    await this.createUrl(videoId);
    return this.dataService.getVideo(this.fullUrl)
        .subscribe((data) => {
          this.video = data;
          this.imagePath = this.video.items[0].snippet.thumbnails.high.url;
          this.videoId = '';
        });
  }
    ngOnInit() {
    this.videoId = '';
  }
}

