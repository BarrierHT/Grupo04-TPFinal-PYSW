import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{

  users: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5
    };
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  updateUser(idUser: string) {
    alert('Falta hacer el formulario para actualizarlo, pero en el back esta hecho');
  }

  deleteUser(idUser: string) {
    this.userService.deleteUser(idUser).subscribe(res => {
      try {
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    })
    alert('Usuario eliminado correctamente');
    this.getUsers();
  }

  getUsers(){
      this.userService.getUsers().subscribe(res => {
        try {
          console.log(res);
          this.users = res;
          this.dtTrigger.next(this.users); // Trigger the DataTables re-rendering
          this.cdr.detectChanges();
        } catch (err) {
          console.log(err);
        }
      });
      this.users = [];
  }
}

