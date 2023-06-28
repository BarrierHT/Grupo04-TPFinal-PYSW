import { Component } from '@angular/core';

@Component({
  selector: 'app-searched-videos',
  templateUrl: './searched-videos.component.html',
  styleUrls: ['./searched-videos.component.css']
})
export class SearchedVideosComponent {
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
  
  constructor() {
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
}
