import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Business } from '../../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  // Simulación de una lista de negocios
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
    // Se pueden agregar más negocios
  ];

  /**
   * Retorna la información de un negocio.
   * En este ejemplo se retorna el primer negocio de la lista.
   */
  getBusinessInfo(): Observable<Business> {
    return of(this.businesses[0]);
  }

  /**
   * Actualiza la información del negocio.
   * Se simula la actualización del primer negocio de la lista y se retorna un Observable<boolean> indicando el éxito.
   */
  updateBusinessInfo(updatedInfo: Partial<Business>): Observable<boolean> {
    this.businesses[0] = { ...this.businesses[0], ...updatedInfo };
    return of(true);
  }

  /**
   * Retorna la lista completa de negocios.
   */
  getAllBusinesses(): Observable<Business[]> {
    return of(this.businesses);
  }
}
