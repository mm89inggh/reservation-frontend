import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';


/**
 * This guard return true if the user is logged in
 * This guard can be further modified to :
 * * * check user roles using keycloakService.isUserInRole() function

export const AuthGuard: CanActivateFn = (route, state) => {
    const keycloakService = inject(KeycloakService);
    const router = inject(Router);

    return keycloakService.isLoggedIn();

}; */


export const AuthGuard: CanActivateFn = (route, state) => {
    const keycloakService = inject(KeycloakService);
    const router = inject(Router);
    const requiredRoles = route.data['roles'] || [];
  
    if (requiredRoles.some((role: string) => keycloakService.isUserInRole(role))) {
      return true; // Permitir acceso
    } else {
      return router.createUrlTree(['/access-restricted']); // Redirigir a página restringida
    }
  };
  