import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay } from 'rxjs';
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

  pattern: string = '';

  constructor(
    private router: Router,
    private videoApiService: VideoApiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.searchVideos();
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
