import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupApiService {
  constructor(private _http: HttpClient) { }

  postGroup(group: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    const { name, description } = group;

    return this._http.post(
      'http://localhost:8080/group/add-group',
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
      `http://localhost:8080/group/get-group/${groupId}`,
      httpOption
    );
  }

  joinGroup(groupId: string): Observable<any> {
    const data = {
      'groupId': groupId,
      'userId': localStorage.getItem('userId')
    }
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userId')
      }),
      // req.query
      //params: {
      //   videoId,
      // },
    };
    return this._http.put(
      `http://localhost:8080/group/add-user-to-group`,
      data,
      httpOption
    );
  }

  getGroups(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userId')
      }),
      // req.query
      //params: {
      //   videoId,
      // },
    };
    return this._http.get(
      `http://localhost:8080/group/get-groups`,
      httpOption
    );
  }

  getGroupsByuser(): Observable<any> {
    
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      // req.query
      //params: {
      //   videoId,
      // },
    };
    return this._http.get(
      `http://localhost:8080/group/get-groups-user`,
      httpOption
    );
  }

}