import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.logged = true;
      this.showPlaylists();
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
        } catch (err) {
          console.log(err);
        }
      });
  }

  showPlaylists() {
    this.playlistApiService.getPlaylistsByUser().subscribe((res) => {
      try {
        console.log(res);
        this.userPlaylists = res.playlists;
      } catch (err) {
        console.log(err);
      }
    });
  }

  getVideo(videoId: string) {
    this.videoApiService.getVideo(videoId).subscribe((res) => {
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
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (err) {
          console.log(err);
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
