import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getLoggedUser().pipe(
      map((res: any) => {
        // console.log(res);
        if (res) {
          if (state.url == '/login' || state.url == '/signup') {
            console.log('already logged');
            this.toastrService.error('Ya esta logueado', 'Ruta No Accesible');
            this.router.navigate(['/home']);
            return false;
          } else return true;
        } else throw new Error('Not Authenticated');
      }),
      catchError((err) => {
        console.log(err);
        console.log(state.url);
        if (state.url == '/login' || state.url == '/signup') return of(true);
        else {
          // Aquí puedes realizar alguna lógica de redirección o manejo de errores
          this.toastrService.error('No se puede acceder sin estar logueado', 'Ruta No Accesible');
          this.router.navigate(['/home']);
          return of(false);
        }
      })
    );
  }
}
