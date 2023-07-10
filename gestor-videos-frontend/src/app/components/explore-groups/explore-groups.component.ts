import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private groupService: GroupApiService,
    private toastrService: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.searchGroups();
  }

  requestJoin(groupId: string) {
    this.groupService
      .joinGroup(groupId)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            if(error.error.message == 'Group not found')
              this.toastrService.error('Error al solicitar unirse a un grupo', 'Error al Unirse');
            if(error.error.message == 'User already in group')
            this.toastrService.info('Ya esta en el grupo');
          }
          return [];
        }),
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.toastrService.success('Se enviado la solicitud para unirse al grupo correctamente', 'Solicitud Enviada');
          this.searchGroups();
        },
        (error) => {
          console.log(error);
          this.toastrService.error('No se ha podido enviar la solicitud para unirse al grupo', 'Solicitud No Enviada');
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
            this.toastrService.error('Error al buscar grupos', 'Error de Búsqueda');
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
          if (this.pattern != '') {
            if (this.groups.length == 0)
              this.toastrService.info('No se encontraron grupos', 'Búsqueda de Grupos');
            else
              this.toastrService.info('Se encontraron ' + this.groups.length + ' grupos', 'Búsqueda de Grupos');
          }
        } catch (err) {
          console.log(err);
          this.toastrService.error('Error al intentar buscar grupos', 'Error de Grupos');
        }
      });
  }
}
