import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Business } from '../../models/business.model';
@Injectable({ providedIn: 'root' })
export class BusinessService {
  private businesses: Business[] = [
    {
      id_negocio: 1,
      nombre: 'Mi Peluquería',
      direccion: 'Calle Principal 123',
      contacto: '555-1234',
      coordenadas: '40.416775,-3.703790',
      id_usuario: 2
    },
    {
      id_negocio: 2,
      nombre: 'Spa Relax',
      direccion: 'Avenida de la Salud 456',
      contacto: '555-5678',
      coordenadas: '40.417000,-3.704000',
      id_usuario: 3
    }
  ];

  /**
   * Retorna la información de un negocio en concreto (mock).
   */
  getBusinessInfo(): Observable<Business> {
    // Ejemplo: se retorna siempre el primer negocio
    return of(this.businesses[0]);
  }

  /**
   * Actualiza información de un negocio (en el array local; simulación).
   */
  updateBusinessInfo(updatedInfo: Partial<Business>): Observable<boolean> {
    this.businesses[0] = { ...this.businesses[0], ...updatedInfo };
    return of(true);
  }

  /**
   * Retorna todos los negocios disponibles (mock).
   */
  getAllBusinesses(): Observable<Business[]> {
    return of(this.businesses);
  }
}