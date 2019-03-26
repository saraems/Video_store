import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import {youtubeResponse} from "./YoutubeResponse";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

const httpYoutubeOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const httpVimeoOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'client_id': '2cb0bcb4d08d9980d290a6b9605f1d1f4bea4f26', 'client_secret': 'N3fT0QmVFiQ/6ZflQwenV8XhxgrInumk470jSDzo6C7kw/PthXMEqB2hyrgpCqzLiTxOiAOs9fas5dnY1tlf44hQ+2JK4ne1sX7SHAQXRyPZERb++yH8YaTMG4JHEX5B', 'access_token': '0e99aea30a3885bdb682ad4b02cf242c'
})
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
 constructor(private http: HttpClient) {}

  static httpVimeoOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'client_id': '2cb0bcb4d08d9980d290a6b9605f1d1f4bea4f26', 'client_secret': 'N3fT0QmVFiQ/6ZflQwenV8XhxgrInumk470jSDzo6C7kw/PthXMEqB2hyrgpCqzLiTxOiAOs9fas5dnY1tlf44hQ+2JK4ne1sX7SHAQXRyPZERb++yH8YaTMG4JHEX5B', 'access_token': '0e99aea30a3885bdb682ad4b02cf242c'
      })
    }
  }

  static httpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error:');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  static createYoutubeUrlRequest(videoId: string) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/`;
    const userKey = `&key=AIzaSyBcMNQVkmuIp8vI5QXDXQWef_AhV_zP5Yk`;
    const youtubeRequestScope = 'videos?&fields=items(id,snippet(title,thumbnails),statistics)&part=snippet,statistics';
    let videoKey;
    videoId.length > 12 ? (videoKey = '&id=' + videoId.replace('https://www.youtube.com/watch?v=', '')) : (videoKey = `&id=${videoId}`);

    return (apiUrl + youtubeRequestScope + videoKey + userKey)
  }

  static createVimeoUrlRequest(videoId: string) {
    const vimeoUrl = 'https://api.vimeo.com/videos/';
    const clientId = '?client_id=2cb0bcb4d08d9980d290a6b9605f1d1f4bea4f26';
    const clientSecret = '&client_secret=N3fT0QmVFiQ/6ZflQwenV8XhxgrInumk470jSDzo6C7kw/PthXMEqB2hyrgpCqzLiTxOiAOs9fas5dnY1tlf44hQ+2JK4ne1sX7SHAQXRyPZERb++yH8YaTMG4JHEX5B';
    const accesToken = '&access_token=0e99aea30a3885bdb682ad4b02cf242c';
    let videoKey;
    videoId.length > 9 ? (videoKey = videoId.replace('https://vimeo.com/', '')) : (videoKey = videoId);
    return (vimeoUrl + videoKey + clientId + clientSecret + accesToken)
    // return (vimeoUrl + videoKey)
  }

  getVideo(fullUrl: string, httpOptions: Object) {
    return this.http.get(fullUrl, httpOptions)
      .pipe(
        catchError(DataService.handleError)
      );
  }
}
