import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Video } from 'src/app/models/video';
import { GroupApiService } from 'src/app/services/group-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';
import { environment } from 'src/environments/environment';

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
  action = false;
  id: string = '';

  constructor(
    private videoApiService: VideoApiService,
    private groupService: GroupApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMyGroups();

    this.activatedRoute.params.subscribe((params) => {
      if (params['videoId'] == 0) {
        this.action = false;
      } else {
        this.action = true;
        this.id += params['videoId'];
        this.getVideo(params['videoId']);
      }
    });
  }

  getMyGroups() {
    this.groupService
      .getGroupsByUser()
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error(
              'Error al obtener grupos',
              'Error de Obtener'
            );
          }
          return [];
        })
      )
      .subscribe(
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

      this.videoApiService
        .postVideo(this.video)
        .pipe(
          catchError((error) => {
            if (error.status !== 200 && error.status !== 201) {
              console.log('Error en el observable: ', error.error.message);
              if (error.error.message == 'An error ocurred')
                this.toastrService.error(
                  'Error al subir el video',
                  'Error de Subir'
                );
              if (error.error.message == 'An image is required')
                this.toastrService.warning('Suba un video');
            }
            return [];
          })
        )
        .subscribe(
          (result) => {
            console.log(result);
            this.video = {
              file: null,
              title: '',
              description: '',
              groupId: '',
            };
            if (result.message == 'Video uploaded') {
              //alert('VIDEO SUBIDO CORRECTAMENTE');
              this.toastrService.success(
                'Se ha subido correctamente el video',
                'Subida Correcta'
              );
              window.location.href =
                environment.ANGULAR_ENV == 'development'
                  ? environment.urlDevelopment
                  : environment.urlProduction + 'watch/' + result.videoId;
              //Update header
            } else {
              this.toastrService.error(
                'No se ha podido subir el video',
                'Subida Incorrecta'
              );
            }
          },
          (error) => {
            console.log(error);
            this.toastrService.error(
              'Error al intentar subir video',
              'Error de Videos'
            );
          }
        );
    } else {
      console.log('Invalid video');
    }
  }

  getVideo(videoId: string) {
    this.videoApiService
      .getVideo(videoId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error(
              'Error al obtener un video',
              'Error de Obtener'
            );
          }
          return [];
        })
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.video.title = res.video.title;
          this.video.description = res.video.description;
        } catch (err) {
          console.log(err);
        }
      });
  }

  updateVideo() {
    this.videoApiService
      .updateVideo(this.id, this.video.title, this.video.description)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error(
              'Error al actualizar video',
              'Error de Actualizar'
            );
          }
          return [];
        })
      )
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      });
    this.router.navigate(['videos']);
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
          this.toastrService.success('Video permitido');
        } else {
          this.msgVideoValidation = 'Tamaño invalido! maximo: 50mb';
          this.toastrService.error(
            'Video demasiado grande, ingrese un video de máximo 50MB'
          );
          console.log('tamaño invalido! maximo: 50mb');
        }
      } else {
        this.msgVideoValidation = 'Por favor selecciona un video';
        this.toastrService.error('Tipo de archivo no permitido');
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
