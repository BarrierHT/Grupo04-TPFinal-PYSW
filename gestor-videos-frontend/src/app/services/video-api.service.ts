import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService {
  constructor(private _http: HttpClient) {}

  getVideos(pattern: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      params: {
        pattern,
      },
    };

    return this._http.get(`http://localhost:8080/video/get-videos`, httpOption);
  }

  postVideo(video: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', video.file);
    formData.append('title', video.title);
    formData.append('description', video.description);
    formData.append('duration', '0');
    formData.append('url', '');
    formData.append('reproductions', '0');
    formData.append('groupId', '');
    formData.append('owner', video.owner);

    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data', // Establece el tipo de contenido como "multipart/form-data"
        'Authorization': 'Bearer ' + video.owner
      }),
    };

    return this._http.post(
      'http://localhost:8080/video/add-video',
      formData,
      httpOptions
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
