import { Component, OnInit } from '@angular/core';
import { catchError, delay } from 'rxjs';

import { GroupApiService } from 'src/app/services/group-api.service';

@Component({
  selector: 'app-explore-groups',
  templateUrl: './explore-groups.component.html',
  styleUrls: ['./explore-groups.component.css'],
})
export class ExploreGroupsComponent implements OnInit {
  pattern: string = '';
  groups: any[] = [];

  constructor(private groupService: GroupApiService) {}

  async ngOnInit(): Promise<void> {
    this.searchGroups();
  }

  requestJoin(groupId: string) {
    this.groupService.joinGroup(groupId).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchGroups() {
    console.log(this.pattern);
    this.groupService
      .getGroups(this.pattern)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            // throw new Error('');
          }
          return [];
        }),
        delay(500) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.groups = result.groupsToSend;
        } catch (err) {
          console.log(err);
        }
      });
  }
}
