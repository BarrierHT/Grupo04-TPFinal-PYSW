import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  postLogin(email: string, password: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `http://localhost:8080/auth/login`,
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
      `http://localhost:8080/auth/signup`,
      { ...signupValues, phoneNumber: signupValues.telefono },
      httpOption
    );
  }
}
