import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import { Subject } from 'rxjs';
import { CountryApiService } from 'src/app/services/country-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  editingUser: any = null;
  isEditModalOpen: boolean = false;
  countries: any = [];
  selectedCountry = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private countryService: CountryApiService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    };
    this.getUsers();
    this.getCountries();
    window.alert = (function () {
      var nativeAlert = window.alert;
      return function (message) {
        // window.alert = nativeAlert;
        message.indexOf('DataTables warning') === 0
          ? console.warn(message)
          : nativeAlert(message);
      };
    })();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  saveUser() {
    const values = this.selectedCountry.split('-');
    this.editingUser.country = {
      iso2: values[0],
      name: values[1]
    };
    this.userService
      .updateUser(this.editingUser._id, this.editingUser)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success('El usuario ha sido actualizado correctamente', 'Modificacion Exitosa');
          this.getUsers();
          this.editingUser = null;
          this.closeEdit();
        },
        (err) => {
          console.log(err);
          this.toastrService.error('El usuario no ha sido actualizado correctamente', 'Modificacion Fallida');
        }
      );
  }

  deleteUser(idUser: string) {
    this.userService.deleteUser(idUser).subscribe((res) => {
      try {
        console.log(res);
        this.toastrService.success('El usuario  ha sido eliminado correctamente', 'Eliminacion Exitosa');
      } catch (err) {
        console.log(err);
        this.toastrService.error('El usuario  no ha sido eliminado correctamente', 'Eliminacion Fallida');
      }
    });
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
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
    this.editingUser.role = 'user';
    this.isEditModalOpen = true;
    console.log(this.editingUser);
  }

  closeEdit() {
    this.isEditModalOpen = false;
    this.editingUser = null;
  }

  generatePDF() {
    let usersPrint: Array<any> = this.procesarListado(this.users);
    printJS({
      printable: usersPrint,
      showModal: true,
      properties: ['_id', 'name', 'email', 'rol', 'country'],
      type: 'json',
      header:
        '<h3 class="" style="text-align: center;">Todos los Usuarios</h3>',
      gridStyle: 'border: 2px solid #3971A5;',
    });
    this.toastrService.info('Se genero un PDF', 'Generación PDF');
  }

  procesarListado(users: Array<any>): Array<any> {
    let userProcess: Array<any> = new Array<any>();
    users.forEach((user) => {
      let userTemp = {
        _id: user._id,
        name: user.name,
        email: user.email,
        rol: user.role,
        country: user.country.name,
      };
      userProcess.push(userTemp);
    });
    return userProcess;
  }

  getCountries() {
    this.countryService.getCountries().subscribe(res => {
      try {
        console.log(res.data);
        this.countries = res.data;
      } catch (err) {
        console.log(err);
      }
    })
  }
}
