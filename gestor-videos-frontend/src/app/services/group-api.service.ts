import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupApiService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  postGroup(group: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    const { name, description } = group;

    return this._http.post(
      `${this.urlHost}group/add-group`,
      { name, description },
      httpOption
    );
  }

  getGroup(groupId: string): Observable<any> {
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
      `${this.urlHost}group/get-group/${groupId}`,
      httpOption
    );
  }

  getGroups(pattern: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: {
        pattern,
      },
    };

    return this._http.get(`${this.urlHost}group/get-groups`, httpOption);
  }

  joinGroup(groupId: string): Observable<any> {
    console.log(groupId);

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
    return this._http.put(
      `${this.urlHost}group/add-user-to-group`,
      { groupId },
      httpOption
    );
  }

  getGroupsByUser(): Observable<any> {
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
      `${this.urlHost}group/get-groups-user`,
      httpOption
    );
  }
}
