import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay } from 'rxjs';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: any[] = [
    // {
    //   title: 'Video 1',
    //   description:
    //     'Descripción del video 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //   thumbnail: 'assets/img/image-not-found.jpg',
    //   views: 1234567,
    //   duration: '10:23',
    //   channelName: 'Canal 1',
    //   channelImage: 'assets/img/image-not-found.jpg',
    //   _id: 'a',
    // },
    // {
    //   title: 'Video 2',
    //   description:
    //     'Descripción del video 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   thumbnail: 'assets/img/image-not-found.jpg',
    //   views: 9876543,
    //   duration: '5:42',
    //   channelName: 'Canal 2',
    //   channelImage: 'assets/img/image-not-found.jpg',
    //   _id: 'b',
    // },
  ];
  showOptions: boolean = false;
  selectedVideo: any;
  userPlaylists: any = [];

  pattern: string = '';

  choosedVideo: string = '';
  logged: boolean = false;

  constructor(
    private router: Router,
    private videoApiService: VideoApiService,
    private playlistApiService: PlaylistApiService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private toastrService: ToastrService
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.logged = true;
      this.showPlaylists();
      //this.toastrService.success('Bienvenido');
    }
    this.searchVideos();
  }

  windowOnClick(event: any) {
    var modal: any = document.querySelector('#modalPlaylists');

    if (event.target === modal) {
      modal.classList.remove('show-modal');
      modal.style.display = 'none';

      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      modal.style.transform = 'scale(1.1)';
      modal.style.transition =
        'visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s';
    }
  }

  toggleModal() {
    var modal: any = document.querySelector('#modalPlaylists');

    if (!modal.classList.contains('show-modal')) {
      // console.log('already');
      modal.classList.add('show-modal');
      modal.style.display = 'block';
      // Aplicar los atributos cuando NO tiene la clase "show-modal"
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      modal.style.transform = 'scale(1)';
      modal.style.transition =
        'visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      modal.classList.remove('show-modal');
      modal.style.display = 'none';

      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      modal.style.transform = 'scale(1.1)';
      modal.style.transition =
        'visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s';
    }
  }

  openModal() {
    var closeButton: any = document.querySelector('.close-button');
    this.toggleModal();

    closeButton.addEventListener('click', this.toggleModal);
    this.document.addEventListener('click', this.windowOnClick);
  }

  searchVideos() {
    console.log(this.pattern);
    this.videoApiService
      .getVideos(this.pattern)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('Error al buscar videos', 'Error de Búsqueda');
            // throw new Error('');
          }
          return [];
        }),
        delay(500) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.videos = result.videos;
          if (this.pattern != '') {
            if (this.videos.length == 0)
              this.toastrService.info('No se encontraron videos', 'Búsqueda de Videos');
          }
        } catch (err) {
          console.log(err);
          this.toastrService.error('Error al intentar buscar videos', 'Error de Videos');
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
            this.toastrService.error('Error al obtener sus playlist', 'Error de Obtener');
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

  getVideo(videoId: string) {
    this.videoApiService
      .getVideo(videoId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('Error al obtener video', 'Error de Obtener');
          }
          return [];
        }),
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.choosedVideo = res.video._id;
        } catch (err) {
          console.log(err);
        }
      });
  }

  // addVideoToPlaylist(playlist: any) {
  //   console.log('video: ', this.choosedVideo, ' playlist: ', playlist);
  // }

  addVideoToPlaylist(playlistId: string) {
    this.playlistApiService
      .addVideoToPlaylist(playlistId, this.choosedVideo)
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

  onMouseEnter(video: any) {
    this.showOptions = true;
    this.selectedVideo = video;
  }

  onMouseLeave() {
    this.showOptions = false;
    this.selectedVideo = null;
  }

  watchVideo(videoId: any) {
    this.router.navigate(['watch', videoId]);
  }

  zoomInThumbnail(event: any) {
    event.target.style.transform = 'scale(1.1)';
  }

  zoomOutThumbnail(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
