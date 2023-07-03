import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { GroupApiService } from 'src/app/services/group-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css'],
})
export class FormVideoComponent implements OnInit {
  video: {
    file: File | null;
    title: string;
    description: string;
    groupId: string;
  } = {
    file: null,
    title: '',
    description: '',
    groupId: '',
  };
  msgVideoValidation!: string;
  myGroups: Array<any> = [];

  constructor(
    private videoApiService: VideoApiService,
    private groupService: GroupApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyGroups();
  }

  getMyGroups() {
    this.groupService.getGroupsByUser().subscribe(
      (result) => {
        this.myGroups = result.groups;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postVideo() {
    if (this.isValidVideo(this.video.file)) {
      console.log(this.video.file?.name);
      console.log(this.video.file?.size);
      console.log(this.video.description);
      console.log(this.video.title);

      this.videoApiService.postVideo(this.video).subscribe(
        (result) => {
          console.log(result);
          this.video = {
            file: null,
            title: '',
            description: '',
            groupId: '',
          };
          if (result.message == 'Video uploaded') {
            alert('VIDEO SUBIDO CORRECTAMENTE');
            this.router.navigate(['watch', result.videoId]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Invalid video');
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (this.isValidVideo(file)) {
      console.log('Video valido');
      this.video.file = file;
    } else {
      console.log('Video invalido');
    }
  }

  isValidVideo(file: File | null): boolean {
    let valid = false;
    if (file) {
      if (this.isVideoFile(file)) {
        if (this.isVideoSizeValid(file)) {
          this.video.file = file;
          valid = true;
        } else {
          this.msgVideoValidation = 'Tamaño invalido! maximo: 50mb';
          console.log('tamaño invalido! maximo: 50mb');
        }
      } else {
        this.msgVideoValidation = 'Por favor selecciona un video';
        console.log('Por favor selecciona un video');
      }
    }
    return valid;
  }

  isVideoFile(file: File | null): boolean {
    if (file) {
      const allowedExtensions = ['mp4', 'mov', 'avi'];
      const extension = file.name
        ? file.name.split('.').pop()?.toLowerCase()
        : null;
      const allowedMimeTypes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
      ];
      if (extension && allowedExtensions.includes(extension)) {
        return true;
      }
      if (file.type && allowedMimeTypes.includes(file.type)) {
        return true;
      }
    }
    return false;
  }

  isVideoSizeValid(file: File | null): boolean {
    const maxSizeInBytes = 50 * 1024 * 1024; // 50 MB en bytes
    if (file && file.size) {
      return file.size <= maxSizeInBytes;
    }
    return false;
  }
}
