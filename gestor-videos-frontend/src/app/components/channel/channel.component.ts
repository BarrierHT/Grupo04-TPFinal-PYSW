import { Component } from '@angular/core';
import { GroupApiService } from 'src/app/services/group-api.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {

  myGroups: Array<any> = [];
  showMyGroups:boolean = false;

  constructor(private groupService: GroupApiService) { }

  getMyGroups() {
    this.groupService.getGroupsByuser().subscribe(
      result => {
        this.myGroups = result.groups;
        this.showMyGroups = true;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }
  someAction(){
    console.log(this.myGroups);
  }
}
