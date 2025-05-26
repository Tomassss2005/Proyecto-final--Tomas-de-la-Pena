import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {

  console.log('Autenticación andando')
  const router = inject(Router);
  const authservice = inject(AuthService);


  return authservice.verifyToken().pipe(
    map((authUser) => {
      if (authUser) {
        return true
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  )
};