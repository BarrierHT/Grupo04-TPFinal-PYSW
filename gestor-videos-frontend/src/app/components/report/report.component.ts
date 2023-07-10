import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService
  ) { }

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
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('Error al obtener reportes', 'Error de Obtener');
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
            this.toastrService.error('Error al revisar el reporte', 'Revision Incorrecta');
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
          this.toastrService.success('Se ha revisado el reporte correctamente', 'Revision Correcta');
        } catch (err) {
          console.log(err);
        }
      });
  }

  reviewedReport(reportId: string) {
    this.toastrService.info('Este reporte ya esta revisado', 'Información Revision');
  }
}
