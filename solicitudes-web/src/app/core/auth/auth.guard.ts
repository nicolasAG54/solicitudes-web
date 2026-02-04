import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si no está logueado, redirige a login
  if (!auth.isLogged()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true; // Usuario logueado → deja pasar
};

export const roleGuard =
  (role: 'agente' | 'supervisor'): CanActivateFn =>
  () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLogged() || auth.getRole() !== role) {
      router.navigateByUrl('/login');
      return false;
    }

    return true;
  };
