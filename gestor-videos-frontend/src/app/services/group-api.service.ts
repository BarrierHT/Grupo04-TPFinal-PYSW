import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupApiService {
  constructor(private _http: HttpClient) {}

  postGroup(group: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        // 'Content-type': 'application/json',
      }),
    };

    const body = new HttpParams()
      .set('name', group.name)
      .set('description', group.description)
      .set('owner', group.owner);

    return this._http.post(
      `http://localhost:8080/group/add-group`,
      body,
      httpOption
    );
  }

  getGroup(groupId: string): Observable<any> {
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
      `http://localhost:8080/group/get-group/${groupId}`,
      httpOption
    );
  }
}
