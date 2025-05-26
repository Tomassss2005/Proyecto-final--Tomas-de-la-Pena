import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { map } from "rxjs";


export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);

    return authService.authUser$.pipe(
        map((user) => {
            if (user && user.role === 'ADMIN') {
                return true;
            } else {
                alert('No tenés permiso para acceder a esta página.')
                return false;
            }
        })
    );
}