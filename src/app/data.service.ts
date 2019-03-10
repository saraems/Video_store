import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=zkG4Xpz6t68&maxResults=1&key=AIzaSyBcMNQVkmuIp8vI5QXDXQWef_AhV_zP5Yk`;
 constructor(private http: HttpClient) {}

  getVideo() {
    return this.http.get(this.apiUrl);
  }
}
