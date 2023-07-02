import { Component, OnInit } from '@angular/core';
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

  constructor(private groupApiService: GroupApiService) {}

  ngOnInit(): void {}

  postGroup() {
    this.group.owner = localStorage.getItem('userId');
    this.groupApiService.postGroup(this.group).subscribe((res) => {
      try {
        console.log(res);
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
}
