import { Component, OnInit } from '@angular/core';

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
  };

  constructor() {}

  ngOnInit(): void {}

  postGroup(groupForm: any) {
    console.log(groupForm);
  }

  sendNotifications(sendNotificationGroup: any, grupoId: string) {
    console.log(sendNotificationGroup, grupoId);
  }

  sendEmailNotifications(sendEmailNotificationGroup: any, grupoId: string) {
    console.log(sendEmailNotificationGroup, grupoId);
  }
}
