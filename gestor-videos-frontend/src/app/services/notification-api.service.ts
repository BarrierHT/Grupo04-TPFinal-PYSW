import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  getNotifications(): Observable<any> {
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
      `${this.urlHost}notification/get-notifications`,
      httpOption
    );
  }

  putNewNotifications(newNotifications: any[]) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this._http.put(
      `${this.urlHost}notification/update-new-notification`,
      { newNotifications },
      httpOption
    );
  }

  putToggleNotification(
    toggledValue: boolean,
    groupId: string
  ): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this._http.put(
      `${this.urlHost}notification/toogle-notification`,
      { toggledValue, groupId },
      httpOption
    );
  }
}
