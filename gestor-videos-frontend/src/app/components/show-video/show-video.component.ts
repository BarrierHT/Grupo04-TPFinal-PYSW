import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ReportApiService } from 'src/app/services/report-api.service';

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

  stringTest: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum feugiat mi aconvallis.' +
    'Nulla tempusnibh ac metus semper, eget semper neque pellentesque. Mauris at ligula sapien. Integer ullamcorper, nunc a' +
    'tristique sollicitudin, tortor nisi efficitur odio, vel malesuada purus lacus sit amet lacus.' +
    'Sed sollicitudin' +
    'felis in euismod consequat, felis leo iaculis est, eget fermentum enim odio ut arcu.';

  video: any = {
    _id: '649f373ceb3cdb108c0075f5',
  };

  constructor(private reportService: ReportApiService) {}

  ngOnInit(): void {}

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
  onModalHidden() {
    this.report.title = '';
    this.report.reason = '';
  }
}
