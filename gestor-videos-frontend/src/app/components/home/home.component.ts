import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
      _id: 'a',
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
      _id: 'b',
    },
  ];
  showOptions: boolean = false;
  selectedVideo: any;

  pattern: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchVideos() {
    console.log(this.pattern);
  }

  onMouseEnter(video: any) {
    this.showOptions = true;
    this.selectedVideo = video;
  }

  onMouseLeave() {
    this.showOptions = false;
    this.selectedVideo = null;
  }

  watchVideo(video: any) {
    this.router.navigate(['watch', video._id]);
  }

  zoomInThumbnail(event: any) {
    event.target.style.transform = 'scale(1.1)';
  }

  zoomOutThumbnail(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
