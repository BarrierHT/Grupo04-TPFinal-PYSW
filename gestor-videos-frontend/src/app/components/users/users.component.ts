import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  editingUser: any = null;
  isEditModalOpen: boolean = false;

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

  saveUser() {
    this.userService.updateUser(this.editingUser._id, this.editingUser).subscribe(
      res => {
        console.log(res);
        alert('Usuario actualizado correctamente');
        this.getUsers();
        this.editingUser = null;
        this.closeEdit();
      },
      err => {
        console.log(err);
        alert('Error al actualizar el usuario');
      }
    );
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

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      try {
        console.log(res);
        this.users = res;
        this.dtTrigger.next(this.users);
        this.cdr.detectChanges();
      } catch (err) {
        console.log(err);
      }
    });
    this.users = [];
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.isEditModalOpen = true;
    console.log(this.editingUser);
  }


  closeEdit() {
    this.isEditModalOpen = false;
    this.editingUser = null;
  }
}

