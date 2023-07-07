import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMyGroups();
  }

  postGroup() {
    this.group.owner = localStorage.getItem('userId');
    this.groupService.postGroup(this.group).subscribe((res) => {
      try {
        console.log(res);
        this.getMyGroups();
      } catch (err) {
        console.log(err);
      }
    });
  }

  toggleSendNotifications(sendNotificationGroup: any, groupId: string) {
    console.log(sendNotificationGroup, groupId);

    this.notificationService
      .toggleNotification(sendNotificationGroup, groupId)
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

  getMyGroups() {
    this.groupService.getGroupsByUser().subscribe(
      (result) => {
        this.myGroups = result.groups;
        console.log(result);
        this.getVideosByGroup();
      },
      (error) => {
        console.log(error);
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
