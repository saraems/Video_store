import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
 constructor(private http: HttpClient) {}

  getVideo(fullUrl: string) {
    return this.http.get(fullUrl, httpOptions);
  }
}
