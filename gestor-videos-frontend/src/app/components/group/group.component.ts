import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GroupApiService } from 'src/app/services/group-api.service';

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

  sendNotifications(sendNotificationGroup: any, grupoId: string) {
    console.log(sendNotificationGroup, grupoId);
  }

  sendEmailNotifications(sendEmailNotificationGroup: any, grupoId: string) {
    console.log(sendEmailNotificationGroup, grupoId);
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
}
