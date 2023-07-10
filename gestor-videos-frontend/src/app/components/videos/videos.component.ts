import { Component, OnInit } from '@angular/core';
import { VideoApiService } from 'src/app/services/video-api.service';
import { Subject, catchError } from 'rxjs';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit, OnDestroy {
  videos: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private videoService: VideoApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    };

    this.getVideos();

    window.alert = (function () {
      var nativeAlert = window.alert;
      return function (message) {
        // window.alert = nativeAlert;
        message.indexOf('DataTables warning') === 0
          ? console.warn(message)
          : nativeAlert(message);
      };
    })();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getVideos() {
    this.videoService
      .getVideos('')
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('Error al obtener videos', 'Error de Obtener');
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res.videos);
          this.videos = res.videos;
          this.dtTrigger.next(this.videos); // Trigger the DataTables re-rendering
          this.cdr.detectChanges();
        } catch (err) {
          console.log(err);
        }
      });
  }

  updateVideo(videoId: string) {
    this.router.navigate(['form-video', videoId]);
  }

  deleteVideo(videoId: string) {
    this.videoService
      .deleteVideo(videoId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('No se pudo eliminar correctamente el video', 'Error al Eliminar');
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res);
          //alert('Video eliminado correctamente');
          this.toastrService.success('Se elimino correctamente el video', 'Eliminación Correcta');
          this.getVideos();
        } catch (err) {
          console.log(err);
        }
      });
  }

  generatePDF() {
    let videosPrint: Array<any> = this.procesarListado(this.videos);
    printJS({
      printable: videosPrint,
      showModal: true,
      properties: ['_id', 'title', 'description', 'idCreador', 'emailCreador'],
      type: 'json',
      header: '<h3 class="" style="text-align: center;">Todos los Videos</h3>',
      gridStyle: 'border: 2px solid #3971A5;',
    });
    this.toastrService.info('Se genero un PDF', 'Generación PDF');
  }

  procesarListado(videos: Array<any>): Array<any> {
    let videoProcess: Array<any> = new Array<any>();
    videos.forEach((video) => {
      let videoTemp = {
        _id: video._id,
        title: video.title,
        description: video.description,
        idCreador: video.owner._id,
        emailCreador: video.owner.email,
      };
      videoProcess.push(videoTemp);
    });
    return videoProcess;
  }
}
