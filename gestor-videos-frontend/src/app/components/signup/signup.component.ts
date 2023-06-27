import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  usuario: Usuario;
  newPassword: string;

  constructor() {
    this.usuario = new Usuario();
    this.newPassword = "";
  }

}
