import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: Usuario;

  constructor(private authService: AuthService) {
    this.usuario = new Usuario();
  }

  login(loginForm: any) {
    console.log(loginForm);
    const { email, password } = loginForm;
    this.authService.postLogin(email, password);
  }
}
