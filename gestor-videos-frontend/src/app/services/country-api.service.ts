import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {

  constructor(private _http: HttpClient) {}

  getCountries(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
      }),
    };
    return this._http.get(`https://countriesnow.space/api/v0.1/countries/flag/images`, httpOption);
  }

  getFlag(iso2: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
      }),
    };

    const body = {
      "iso2": iso2
    }

    return this._http.post(`https://countriesnow.space/api/v0.1/countries/flag/images`, body, httpOption);
  }
}
