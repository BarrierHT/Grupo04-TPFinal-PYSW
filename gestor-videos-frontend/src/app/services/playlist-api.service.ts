import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistApiService {
  constructor(private _http: HttpClient) { }

  postPlaylist(playlist: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    const { name, description } = playlist;

    return this._http.post(
      `http://localhost:8080/playlist/add-playlist`, { name, description }, httpOption
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
      `http://localhost:8080/playlist/get-playlist/${playlistId}`,
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
      `http://localhost:8080/playlist/get-playlists`,
      httpOption
    );
  }
}
