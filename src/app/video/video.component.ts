import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video: any;
  videoId: any;

  constructor(private dataService: DataService) {}

  findVideo() {
      return this.dataService.getVideo()
        .subscribe(data => this.video = data);
  }
    ngOnInit() {
    this.videoId = '';
  }
}
