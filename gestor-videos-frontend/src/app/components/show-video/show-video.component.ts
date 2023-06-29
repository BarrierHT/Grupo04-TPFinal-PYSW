import { Component } from '@angular/core';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent {
  videos: any[] = [
    {
      title: 'Video 1',
      description: 'Descripción del video 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      thumbnail: 'assets/img/image-not-found.jpg',
      views: 1234567,
      duration: '10:23',
      channelName: 'Canal 1',
      channelImage: 'assets/img/image-not-found.jpg'
    },
    {
      title: 'Video 2',
      description: 'Descripción del video 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      thumbnail: 'assets/img/image-not-found.jpg',
      views: 9876543,
      duration: '5:42',
      channelName: 'Canal 2',
      channelImage: 'assets/img/image-not-found.jpg'
    }
  ];
  showOptions: boolean = false;
  selectedVideo: any;
  showFullDescription: boolean = true;

  stringTest:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum feugiat mi aconvallis."+
  "Nulla tempusnibh ac metus semper, eget semper neque pellentesque. Mauris at ligula sapien. Integer ullamcorper, nunc a"+
  "tristique sollicitudin, tortor nisi efficitur odio, vel malesuada purus lacus sit amet lacus."+
  "Sed sollicitudin"+
  "felis in euismod consequat, felis leo iaculis est, eget fermentum enim odio ut arcu." ;

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
}

