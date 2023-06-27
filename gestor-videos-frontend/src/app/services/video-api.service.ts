import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService {
  constructor(private _http: HttpClient) {}

  getVideos(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.get(`http://localhost:8080/video/get-videos`, httpOption);
  }

  postVideo(video: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `http://localhost:8080/video/add-video`,
      video,
      httpOption
    );
  }

  getVideo(videoId: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      // req.query
      //params: {
      //   videoId,
      // },
    };
    return this._http.get(
      `http://localhost:8080/video/get-video/${videoId}`,
      httpOption
    );
  }
}
