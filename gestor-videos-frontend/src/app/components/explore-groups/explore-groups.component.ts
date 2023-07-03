import { Component } from '@angular/core';
import { GroupApiService } from 'src/app/services/group-api.service';

@Component({
  selector: 'app-explore-groups',
  templateUrl: './explore-groups.component.html',
  styleUrls: ['./explore-groups.component.css'],
})
export class ExploreGroupsComponent {
  pattern: string = '';

  groups: Array<any> =[];

  constructor(private groupService: GroupApiService) {
   /* this.groups = [
      { nombre: 'FC Barcelona Fans' },
      { nombre: 'EDM' },
      { nombre: 'Only Memes' },
      { nombre: 'Just play' },
      { nombre: 'Messi highlights' },
    ];*/
    this.getGroups();
  }

  requestJoin(groupId: string) {
    this.groupService.joinGroup(groupId).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  getGroups() {
    this.groupService.getGroups().subscribe(
      result => {
        this.groups = result.groups;
        console.log(result);
        console.log(this.groups);
      },
      error => {
        console.log(error);
      }
    )
  }

  searchGroups() {
    console.log(this.pattern);
  }
}
