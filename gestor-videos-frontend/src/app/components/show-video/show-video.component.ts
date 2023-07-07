import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay } from 'rxjs';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';
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

  videos: any[] = [
    {
      title: 'Video 1',
      description:
        'Descripción del video 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      thumbnail: 'assets/img/image-not-found.jpg',
      views: 1234567,
      duration: '10:23',
      channelName: 'Canal 1',
      channelImage: 'assets/img/image-not-found.jpg',
    },
    {
      title: 'Video 2',
      description:
        'Descripción del video 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      thumbnail: 'assets/img/image-not-found.jpg',
      views: 9876543,
      duration: '5:42',
      channelName: 'Canal 2',
      channelImage: 'assets/img/image-not-found.jpg',
    },
  ];
  showOptions: boolean = false;
  selectedVideo: any;
  showFullDescription: boolean = false;
  logged: boolean = false;

  stringTest: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum feugiat mi aconvallis.' +
    'Nulla tempusnibh ac metus semper, eget semper neque pellentesque. Mauris at ligula sapien. Integer ullamcorper, nunc a' +
    'tristique sollicitudin, tortor nisi efficitur odio, vel malesuada purus lacus sit amet lacus.' +
    'Sed sollicitudin' +
    'felis in euismod consequat, felis leo iaculis est, eget fermentum enim odio ut arcu.';

  video: any = {
    title: '',
  };
  userPlaylists: any = [];

  constructor(
    private reportService: ReportApiService,
    private activatedRoute: ActivatedRoute,
    private playlistApiService: PlaylistApiService,
    private router: Router,
    private videoService: VideoApiService
  ) {}

  ngOnInit(): void {
    this.showPlaylists();
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['videoId']);
      //console.log(this.ticketService.getTickets());
      if (params['videoId'] != '') {
        const videoId = params['videoId'];
        this.videoService
          .getVideo(videoId)
          .pipe(
            catchError((error) => {
              console.log('Error en el observable: ', error);
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

        // .find((ticket) => ticket._id.toString() == params['ticketId']);

        // if (updateAllowed) {

        // } else this.router.navigate(['home']);
      }
    });

    if (localStorage.getItem('userId')) {
      this.logged = true;
    }
  }

  addPositiveRating() {
    const btn1: any = document.querySelector('#green-button-rating');
    const btn2: any = document.querySelector('#red-button-rating');
    if (btn2.classList.contains('red')) {
      btn2.classList.remove('red');
    }
    btn1.classList.toggle('green');
    console.log({ videoId: this.video._id, rating: 1 });
  }

  addNegativeRating() {
    const btn1: any = document.querySelector('#green-button-rating');
    const btn2: any = document.querySelector('#red-button-rating');
    if (btn1.classList.contains('green')) btn1.classList.remove('green');

    btn2.classList.toggle('red');
    console.log({ videoId: this.video._id, rating: -1 });
  }

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
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
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

  addVideoToPlaylist(playlistId: string, videoId: string) {
    this.playlistApiService
      .addVideoToPlaylist(playlistId, videoId)
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      });
  }

  onModalHidden() {
    this.report.title = '';
    this.report.reason = '';
  }
}
