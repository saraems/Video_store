import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class DataService {
 constructor(private http: HttpClient) {}

  static httpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  static checkVideoSource(input: string): string {
    if (input.includes('youtube') || input.length === 11) {
      return  'youtube';
    } else if (input.includes('vimeo') || input.length === 9) {
      return 'vimeo';
    }
  }

  static extractVideoKey(input: string, source: string): string {
   let videoKey;
    if (source === 'youtube') {
      input.length > 12 ? (videoKey = input.replace('https://www.youtube.com/watch?v=', '')) : (videoKey = input);
    } else if (source === 'vimeo') {
      input.length > 9 ? (videoKey = input.replace('https://vimeo.com/', '')) : (videoKey = input);
    }
    return videoKey
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error:');
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  static createYoutubeUrlRequest(videoKey: string) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/`;
    const userKey = `&key=AIzaSyBcMNQVkmuIp8vI5QXDXQWef_AhV_zP5Yk`;
    const youtubeRequestScope = 'videos?&fields=items(id,snippet(title,thumbnails),statistics)&part=snippet,statistics&id=';
    return (apiUrl + youtubeRequestScope + videoKey + userKey)
  }

  static createVimeoUrlRequest(videoKey: string) {
    const vimeoUrl = 'https://api.vimeo.com/videos/';
    const clientId = '?client_id=2cb0bcb4d08d9980d290a6b9605f1d1f4bea4f26';
    const clientSecret = '&client_secret=N3fT0QmVFiQ/6ZflQwenV8XhxgrInumk470jSDzo6C7kw/PthXMEqB2hyrgpCqzLiTxOiAOs9fas5dnY1tlf44hQ+2JK4ne1sX7SHAQXRyPZERb++yH8YaTMG4JHEX5B';
    const accesToken = '&access_token=0e99aea30a3885bdb682ad4b02cf242c';
    return (vimeoUrl + videoKey + clientId + clientSecret + accesToken)
  }

  getVideo(fullUrl: string, httpOptions: Object) {
    return this.http.get(fullUrl, httpOptions)
      .pipe(
        catchError(DataService.handleError)
      );
  }
}
