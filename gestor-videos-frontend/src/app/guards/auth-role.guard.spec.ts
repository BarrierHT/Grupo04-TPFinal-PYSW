import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthRoleGuard } from './auth-role.guard';

describe('AuthGuard', () => {
  let guard: AuthRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Agrega aquí más pruebas para la guardia AuthGuard si es necesario
});
