import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlHost: string;
  constructor(private _http: HttpClient) {
    this.urlHost = environment.ANGULAR_ENV == 'development' ? environment.urlDevelopment : environment.urlProduction;
  }

  postLogin(email: string, password: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `${this.urlHost}auth/login`,
      { email, password },
      httpOption
    );
  }

  postSignup(signupValues: any): Observable<any> {
    console.log(signupValues);
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `${this.urlHost}auth/signup`,
      signupValues,
      httpOption
    );
  }

  getLoggedUser() {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(`${this.urlHost}auth/loggedUser`, httpOption);
  }
}
