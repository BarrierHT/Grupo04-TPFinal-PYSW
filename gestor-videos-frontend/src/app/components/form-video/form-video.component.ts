import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css'],
})
export class FormVideoComponent {
  video: {
    file: File | null;
    title: string;
    description: string;
    owner: string | null;
  } = {
    file: null,
    title: '',
    description: '',
    owner: '',
  };
  msgVideoValidation!: string;

  constructor(
    private videoApiService: VideoApiService,
    private router: Router
  ) {}

  postVideo() {
    if (this.isValidVideo(this.video.file)) {
      this.video.owner = localStorage.getItem('userId');

      console.log(this.video.file?.name);
      console.log(this.video.file?.size);
      console.log(this.video.description);
      console.log(this.video.title);
      console.log(this.video.owner);

      this.videoApiService.postVideo(this.video).subscribe(
        (result) => {
          console.log(result);
          this.video = {
            file: null,
            title: '',
            description: '',
            owner: localStorage.getItem('userId'),
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
