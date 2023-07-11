import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlaylistApiService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  postPlaylist(playlist: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    const { name, description } = playlist;

    return this._http.post(
      `${this.urlHost}playlist/add-playlist`,
      { name, description },
      httpOption
    );
  }

  getPlaylist(playlistId: string): Observable<any> {
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
      `${this.urlHost}playlist/get-playlist/${playlistId}`,
      httpOption
    );
  }

  getPlaylistsByUser(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(
      `${this.urlHost}playlist/get-playlists`,
      httpOption
    );
  }

  addVideoToPlaylist(playlistId: string, videoId: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this._http.put(
      `${this.urlHost}playlist/add-video-to-playlist/${playlistId}/${videoId}`,
      {},
      httpOption
    );
  }
}
