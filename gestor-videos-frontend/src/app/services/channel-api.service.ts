import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChannelApiService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  getChannel(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`${this.urlHost}channel/get-channel`, httpOption);
  }

}
