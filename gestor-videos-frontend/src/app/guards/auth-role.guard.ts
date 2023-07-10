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
export class AuthRoleGuard implements CanActivate {
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
        // console.log(state.url);
        if (state.url == '/videos' || state.url == '/users')
          if (res.user.role == 'admin') return true;

        if (state.url == '/reports' || state.url == '/stats-panel')
          if (res.user.role == 'gestor' || res.user.role == 'admin')
            return true;

        throw new Error('Not Authorized');
      }),
      catchError((err) => {
        console.log(err);
        // Aquí puedes realizar alguna lógica de redirección o manejo de errores
        this.toastrService.error('No se cuenta con el rol adecuado', 'Ruta No Accesible Para Tu Rol');
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}
