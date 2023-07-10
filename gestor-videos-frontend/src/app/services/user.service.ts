import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  getUsers(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`${this.urlHost}user/get-users`, httpOption);
  }

  updateUser(idUser: string, dataUser: any): Observable<any> {
    const body = {
      name: dataUser.name,
      email: dataUser.email,
      phoneNumber: dataUser.phoneNumber,
      username: dataUser.username,
      country: dataUser.country,
      role: dataUser.role
    };
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.put(`${this.urlHost}user/update-user/${idUser}`,
      body, httpOption);
  }

  deleteUser(idUser: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.delete(`${this.urlHost}user/delete-user/${idUser}`, httpOption);
  }

  getUser(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`${this.urlHost}user/get-user`, httpOption);
  }

}
