import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-groups',
  templateUrl: './explore-groups.component.html',
  styleUrls: ['./explore-groups.component.css'],
})
export class ExploreGroupsComponent {
  pattern: string = '';

  groups: Array<any>;

  constructor() {
    this.groups = [
      { nombre: 'FC Barcelona Fans' },
      { nombre: 'EDM' },
      { nombre: 'Only Memes' },
      { nombre: 'Just play' },
      { nombre: 'Messi highlights' },
    ];
  }

  requestJoin(groupId: string) {
    //Manejar solicitud
    console.log(groupId);
  }

  searchGroups() {
    console.log(this.pattern);
  }
}
