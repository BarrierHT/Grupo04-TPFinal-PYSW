import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { GroupApiService } from 'src/app/services/group-api.service';
import { NotificationApiService } from 'src/app/services/notification-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  group: any = {
    name: '',
    description: '',
    sendNotification: false,
    sendEmailNotification: false,
    owner: '',
  };

  myGroups: Array<any> = [];

  constructor(
    private groupService: GroupApiService,
    private videoService: VideoApiService,
    private notificationService: NotificationApiService,

    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMyGroups();
  }

  postGroup() {
    if(this.group.name != '' && this.group.description != ''){
      this.group.owner = localStorage.getItem('userId');
      this.groupService.postGroup(this.group).subscribe((res) => {
        try {
          console.log(res);
          this.toastrService.success('Se ha creado el grupo exitosamente', 'Creación Correcta');
          this.getMyGroups();
        } catch (err) {
          console.log(err);
          this.toastrService.success('No se ha podido crear el grupo correctamente', 'Creación Incorrecta');
        }
      });
    }else{
      if(this.group.name == '')
        this.toastrService.warning('Ingrese un nombre para el grupo');
      if(this.group.description == '')
        this.toastrService.warning('Ingrese una descripción para el grupo');
    }
  }

  toggleSendNotifications(sendNotificationGroup: any, groupId: string) {
    console.log(sendNotificationGroup, groupId);

    this.notificationService
      .putToggleNotification(sendNotificationGroup, groupId)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            this.toastrService.error('No se ha podido encontrar el grupo', 'Grupo Inexistente');
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
          if(sendNotificationGroup)
            this.toastrService.success('Recibirá notificaciones del grupo','Notificaciones Actualizadas');
          else
            this.toastrService.error('No recibirá notificaciones del grupo','Notificaciones Actualizadas');
        } catch (err) {
          console.log(err);
          this.toastrService.error('Error al intentar recibir notificaciones', 'Error de Notificaciones');
        }
      });
  }

  getMyGroups() {
    this.groupService.getGroupsByUser().subscribe(
      (result) => {
        this.myGroups = result.groups;
        console.log(result);
        this.getVideosByGroup();
      },
      (error) => {
        console.log(error);
        this.toastrService.error('Error al intentar obtener grupos', 'Error de Grupos');
      }
    );
  }

  getVideosByGroup() {
    for (const group of this.myGroups) {
      console.log('group: ', group);
      this.videoService
        .getVideosByGroup(group._id)
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
            console.log('its videos', result);
            group.videos = result.videos;
          } catch (err) {
            console.log(err);
          }
        });
    }
  }
}
