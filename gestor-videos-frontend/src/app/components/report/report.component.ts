import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, delay } from 'rxjs';
import { ReportApiService } from 'src/app/services/report-api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit, OnDestroy {
  reports: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private reportService: ReportApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    (this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    }),
      this.getReports();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
          this.dtTrigger.next(this.reports);
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
