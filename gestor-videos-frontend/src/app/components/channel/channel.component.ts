import { Component, OnInit } from '@angular/core';
import { GroupApiService } from 'src/app/services/group-api.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  myGroups: Array<any> = [];
  showMyGroups: boolean = false;

  constructor(private groupService: GroupApiService) {}

  ngOnInit(): void {
    this.getMyChannel();
    this.getMyPlaylists();
    this.getMyVideos();
  }

  getMyChannel() {}

  getMyPlaylists() {}

  getMyVideos() {}

  someAction() {
    console.log(this.myGroups);
  }
}
