import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { User } from '../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserFromStorage();
  }

  /**
   * Simula el proceso de login. En un escenario real, se haría una petición HTTP.
   */
  login(email: string, password: string): Observable<boolean> {
    if (email === 'juanperez@example.com' && password === 'password123') {
      this.currentUser = {
        id_usuario: 3,
        nombre: 'Juan Pérez',
        correo: email,
        id_rol: 2, // Cliente
        password: '' // No almacenar la contraseña en el frontend
      };
      this.saveUserToStorage();
      return of(true);
    }
    return of(false);
  }

  /**
   * Simula el registro de un nuevo usuario.
   */
  register(userData: User): Observable<boolean> {
    console.log('Registro de usuario:', userData);
    return of(true);
  }

  /**
   * Verifica si hay un usuario autenticado.
   */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Obtiene los datos del usuario autenticado.
   */
  getUser(): User | null {
    return this.currentUser;
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }

  /**
   * Carga el usuario desde `localStorage` si está en el navegador.
   */
  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
  }

  /**
   * Guarda el usuario en `localStorage` solo si está en el navegador.
   */
  private saveUserToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
  }
}
