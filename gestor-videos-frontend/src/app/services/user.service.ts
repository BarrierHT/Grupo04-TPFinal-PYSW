import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`http://localhost:8080/user/get-users`, httpOption);
  }

  updateUser(idUser:string,dataUser:any): Observable<any> {
    const body = {
      name: dataUser.name,
      email: dataUser.email,
      phoneNumber: dataUser.phoneNumber,
      username: dataUser.username,
      country: dataUser.country
    };
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.put(`http://localhost:8080/user/update-user/${idUser}`,
    body, httpOption);
  }

  deleteUser(idUser:string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.delete(`http://localhost:8080/user/delete-user/${idUser}`, httpOption);
  }
  
  getUser(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`http://localhost:8080/user/get-user`, httpOption);
  }
  
}
