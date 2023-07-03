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


  constructor(private groupApiService: GroupApiService) {

  }

  async ngOnInit(): Promise<void> {
    this.searchGroups();
  }

  searchGroups() {
    console.log(this.pattern);
    this.groupApiService
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
          this.groups = result.groups;
        } catch (err) {
          console.log(err);
        }
      });
  }

  requestJoin(groupId: string) {
    //Manejar solicitud
    console.log(groupId);
  }
}
