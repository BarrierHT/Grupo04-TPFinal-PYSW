import { Component } from '@angular/core';
import { catchError, pipe } from 'rxjs';
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
    this.authService
      .postLogin(email, password)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);

          localStorage.setItem('token', result.token);
          localStorage.setItem('userId', result.userId);
          localStorage.setItem('userRole', result.userRole);

          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          if (result) {
            location.href = 'http://localhost:4200/home';
          }
        } catch (err) {
          console.log(err);
        }
      });
  }
}
