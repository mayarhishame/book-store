import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authentacation/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.getUserLogged()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
