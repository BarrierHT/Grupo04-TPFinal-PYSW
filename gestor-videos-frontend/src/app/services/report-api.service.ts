import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportApiService {
  constructor(private _http: HttpClient) {}

  postReport(report: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `http://localhost:8080/report/add-report`,
      report,
      httpOption
    );
  }

  getReport(reportId: string): Observable<any> {
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
      `http://localhost:8080/report/get-report/${reportId}`,
      httpOption
    );
  }
}
