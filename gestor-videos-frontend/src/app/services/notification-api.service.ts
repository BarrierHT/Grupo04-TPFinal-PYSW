import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  constructor(private _http: HttpClient) {}

  getNotifications(userId: string): Observable<any> {
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
      `http://localhost:8080/notification/get-notifications/${userId}`,
      httpOption
    );
  }

  toggleNotification(toggledValue: boolean, groupId: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this._http.put(
      `http://localhost:8080/notification/toogle-notification`,
      { toggledValue, groupId },
      httpOption
    );
  }
}
