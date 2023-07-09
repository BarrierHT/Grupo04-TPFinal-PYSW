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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getLoggedUser().pipe(
      map((res: any) => {
        console.log(res);
        if (res.user.role == 'gestor' || res.user.role == 'admin') return true;
        else throw new Error('Not Authorized');
      }),
      catchError((err) => {
        console.log(err);
        // Aquí puedes realizar alguna lógica de redirección o manejo de errores
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}
