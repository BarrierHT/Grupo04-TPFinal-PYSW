import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  getVideos(pattern: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      params: {
        pattern,
      },
    };

    return this._http.get(`${this.urlHost}video/get-videos`, httpOption);
  }

  postVideo(video: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', video.file);
    formData.append('title', video.title);
    formData.append('description', video.description);
    formData.append('groupId', video.groupId);

    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data', // Establece el tipo de contenido como "multipart/form-data"
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this._http.post(
      '${this.urlHost}video/add-video',
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
      `${this.urlHost}video/get-video/${videoId}`,
      httpOption
    );
  }

  getVideosByUser(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      // req.query
      //params: {
      //   videoId,
      // },
    };
    return this._http.get(
      `${this.urlHost}video/get-videos-user`,
      httpOption
    );
  }

  getVideosByGroup(groupId: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),

      params: {
        groupId,
      },
    };
    return this._http.get(
      `${this.urlHost}video/get-videos-group`,
      httpOption
    );
  }

  deleteVideo(videoId: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.delete(
      `${this.urlHost}video/delete-video/${videoId}`,
      httpOption
    );
  }

  updateVideo(
    videoId: string,
    title: string,
    description: string
  ): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    const body = {
      title: title,
      description: description,
    };

    return this._http.put(
      `${this.urlHost}video/update-video/${videoId}`,
      body,
      httpOption
    );
  }
}
