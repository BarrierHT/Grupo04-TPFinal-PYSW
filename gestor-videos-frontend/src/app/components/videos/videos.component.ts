import { Component, OnInit } from '@angular/core';
import { VideoApiService } from 'src/app/services/video-api.service';
import { Subject } from 'rxjs';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {

  videos: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private videoService: VideoApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5
    };

    this.getVideos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getVideos() {
    this.videoService.getVideos('').subscribe(res => {
      try {
        console.log(res.videos);
        this.videos = res.videos;
        this.dtTrigger.next(this.videos); // Trigger the DataTables re-rendering
        this.cdr.detectChanges();
      } catch (err) {
        console.log(err);
      }
    });
    this.videos = [];
  }

  updateVideo(videoId: string) {
    this.router.navigate(['form-video', videoId])
  }

  deleteVideo(videoId: string) {
    this.videoService.deleteVideo(videoId).subscribe(res => {
      try {
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    })
    alert('Video eliminado correctamente');
    this.getVideos();
  }
}
