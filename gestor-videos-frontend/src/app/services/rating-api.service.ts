import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingApiService {
  constructor(private _http: HttpClient) {}

  postRating(rating: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.post(
      `http://localhost:8080/rating/add-rating`,
      rating,
      httpOption
    );
  }

  getRating(videoId: string): Observable<any> {
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
      `http://localhost:8080/rating/get-rating/${videoId}`,
      httpOption
    );
  }
}
