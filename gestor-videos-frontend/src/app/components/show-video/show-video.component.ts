import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay } from 'rxjs';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';
import { RatingApiService } from 'src/app/services/rating-api.service';
import { ReportApiService } from 'src/app/services/report-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css'],
})
export class ShowVideoComponent implements OnInit {
  report: any = {
    title: '',
    reason: '',
  };

  videos: any[] = [];
  showOptions: boolean = false;
  selectedVideo: any;
  showFullDescription: boolean = false;
  logged: boolean = false;
  userId: any = '';
  showPlaylistVideos: boolean = false;
  playlist: any;
  playlistVideos: any;
  rating: any;

  video: any = {
    title: '',
  };
  userPlaylists: any = [];

  constructor(
    private reportService: ReportApiService,
    private activatedRoute: ActivatedRoute,
    private playlistApiService: PlaylistApiService,
    private ratingService: RatingApiService,
    private router: Router,
    private videoService: VideoApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['videoId']);
      this.showPlaylistVideos = false;
      //console.log(this.ticketService.getTickets());
      if (params['videoId'] != '') {
        const videoId = params['videoId'];
        this.videoService
          .getVideo(videoId)
          .pipe(
            catchError((error) => {
              console.log('Error en el observable: ', error);
              this.toastrService.error('Video inexistente', 'Ruta No Accesible');
              this.router.navigate(['/home']);
              return [];
            }),
            delay(1000) // Agrega un retraso de 1 segundo
          )
          .subscribe((result) => {
            try {
              console.log(result);

              this.video = result.video;
            } catch (err) {
              console.log(err);
            }
          });
        this.getRating(videoId);

        // .find((ticket) => ticket._id.toString() == params['ticketId']);

        // if (updateAllowed) {

        // } else this.router.navigate(['home']);
      }
      if (params.hasOwnProperty('playlistId')) {
        console.log(
          'MOSTRAR VIDEOS DE LA PLAYLIST' + ' - ' + params['playlistId']
        );
        const playlistId = params['playlistId'];
        this.showPlaylistVideos = true;
        this.getPlaylist(playlistId);
      }
    });

    if (localStorage.getItem('userId')) {
      this.logged = true;
      this.userId = localStorage.getItem('userId');
      this.showPlaylists();
    }
  }

  addPositiveRating() {
    const btn1: any = document.querySelector('#green-button-rating');
    btn1.classList.toggle('green');

    this.ratingService
    .postRating(this.video._id)
    .pipe(
      catchError((error) => {
        //console.log('Error en el observable: ', error);
        if (error.status !== 200 && error.status !== 201) {
          console.log('Error en el observable: ', error.error.message);
          this.toastrService.error('No se ha podido actualizar el rating del video', 'Error');
          // throw new Error('');
        }
        return [];
      })
    )
    .subscribe(res => {
      try {
        console.log(res);
        if(res.message == "Rating updated -1")
          this.toastrService.info('Te dejo de gustar el video');
        else
          this.toastrService.info('Te gusta el video');
        this.getRating(this.video._id);
      } catch (err) {
        console.log(err);
      }
    })
  }

  getRating(videoId: string) {
    this.ratingService
    .getRating(videoId)
    .pipe(
      catchError((error) => {
        //console.log('Error en el observable: ', error);
        if (error.status !== 200 && error.status !== 201) {
          console.log('Error en el observable: ', error.error.message);
          //this.toastrService.error('No se ha podido obtener el rating', 'Error de Obtener');
          // throw new Error('');
        }
        return [];
      })
    )
    .subscribe(res => {
      try {
        console.log(res);
        this.rating = res.rating.rating;
      } catch (err) {
        console.log(err);
      }
    })
  }

  // addNegativeRating() {
  //   const btn1: any = document.querySelector('#green-button-rating');
  //   const btn2: any = document.querySelector('#red-button-rating');
  //   if (btn1.classList.contains('green')) btn1.classList.remove('green');

  //   btn2.classList.toggle('red');
  //   console.log({ videoId: this.video._id, rating: -1 });
  //   this.toastrService.info('No te ha gustado el video');
  // }

  onMouseEnter(video: any) {
    this.showOptions = true;
    this.selectedVideo = video;
  }

  onMouseLeave() {
    this.showOptions = false;
    this.selectedVideo = null;
  }

  zoomInThumbnail(event: any) {
    event.target.style.transform = 'scale(1.1)';
  }

  zoomOutThumbnail(event: any) {
    event.target.style.transform = 'scale(1)';
  }

  addReport(reportForm: any) {
    console.log(reportForm);

    const { reportTitle, reportReason, videoId } = reportForm;

    console.log(reportTitle, reportReason, videoId);

    this.reportService
      .postReport(reportTitle, reportReason, videoId)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('No se ha podido generar el reporte', 'Error');
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.toastrService.success('Se ha generado el reporte correctamente', 'Reporte Enviado');
        } catch (err) {
          console.log(err);
          this.toastrService.success('No se ha pudo generar el reporte correctamente', 'Error Reporte');
        }
      });
  }

  showPlaylists() {
    this.playlistApiService
      .getPlaylistsByUser()
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('Error al obtener playlist', 'Error de Obtener');
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.userPlaylists = res.playlists;
        } catch (err) {
          console.log(err);
        }
      });
  }

  addVideoToPlaylist(playlistId: string, videoId: string) {
    this.playlistApiService
      .addVideoToPlaylist(playlistId, videoId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            if (error.error.message == "Playlist not found")
              this.toastrService.error('Error al añadir videos a una playlist', 'Error de Subir');
            if (error.error.message == "Video already in playlist")
              this.toastrService.info('El video ya esta en la playlist');
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.toastrService.success('Se ha añadido el video correctamente a la playlist', "Añadido");
        } catch (err) {
          console.log(err);
          this.toastrService.error('No se pudo añadir el video a la playlist', "Error de Playlist");
        }
      });
  }

  getPlaylist(playlistId: string) {
    this.playlistApiService
      .getPlaylist(playlistId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            //this.toastrService.error('Error al obtener playlist', 'Error de Obtener');
            this.toastrService.error('Playlist inexistente', 'Ruta No Accesible');
            this.router.navigate(['/home']);
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.playlist = res;
          if (res.videos.length < 1)
            this.toastrService.warning('La playlist no tiene videos aún!', 'Información Playlist');
          //alert('La playlist no tiene videos aún!');
        } catch (err) {
          console.log(err);
        }
      });
  }

  watchPlaylistVideo(playlist: any) {
    this.router
      .navigate(['watch', playlist.videoId._id, 'playlist', this.playlist._id])
      .then(() => {
        window.location.reload();
      });
  }

  onModalHidden() {
    this.report.title = '';
    this.report.reason = '';
  }
}
