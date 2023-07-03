import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, delay } from 'rxjs';
import { ReportApiService } from 'src/app/services/report-api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reports: any = [];

  constructor(
    private reportService: ReportApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.reportService
      .getReports()
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            // throw new Error('');
          }
          return [];
        }),
        delay(500) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.reports = result.reports;
          this.cdr.detectChanges(); // forzar una actualización inmediata de la vista
        } catch (err) {
          console.log(err);
        }
      });
  }

  reviewReport(reportId: string) {
    this.reportService
      .putReviewReport(reportId)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            // throw new Error('');
          }
          return [];
        }),
        delay(500) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.getReports();
        } catch (err) {
          console.log(err);
        }
      });
  }
}
