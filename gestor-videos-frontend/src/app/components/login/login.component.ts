import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, pipe } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
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
            if (error.error.message == 'A user with this email was not found')
              this.toastrService.error(
                'El email ' + email + ' no esta registrado',
                'Ingreso Incorrecto'
              );
            if (
              error.error.message == 'A user with this password was not found'
            )
              this.toastrService.error(
                'Contraseña incorrecta',
                'Ingreso Incorrecto'
              );
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.toastrService.success(
            'Se ha logueado correctamente',
            'Ingreso Correcto'
          );

          localStorage.setItem('token', result.token);
          localStorage.setItem('userId', result.userId);
          localStorage.setItem('userRole', result.userRole);

          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          if (result) {
            window.location.href =
              environment.ANGULAR_ENV == 'development'
                ? environment.urlFrontDevelopment
                : environment.urlFrontProduction + 'home';
          }
        } catch (err) {
          console.log(err);
          this.toastrService.error(
            'Error al intentar loguearse',
            'Error de Login'
          );
        }
      });
  }
}
