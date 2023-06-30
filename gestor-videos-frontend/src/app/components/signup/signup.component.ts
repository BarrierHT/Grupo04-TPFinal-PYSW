import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  usuario: Usuario;
  newPassword: string;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
    this.newPassword = '';
  }

  signup(signupForm: any) {
    console.log(signupForm);
    this.authService
      .postSignup(signupForm)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);

          if (result) {
            this.router.navigate(['login']);
          }
        } catch (err) {
          console.log(err);
        }
      });
  }
}
