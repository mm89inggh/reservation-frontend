import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Business } from '../../models/business.model';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  // Simulación de información del negocio
  private negocio: Business = {
    id_negocio: 1,
    nombre: 'Mi Peluquería',
    direccion: 'Calle Principal 123',
    contacto: '555-1234',
    coordenadas: '40.416775,-3.703790',
    id_usuario: 2
  };

  /**
   * Retorna la información del negocio.
   */
  getBusinessInfo(): Observable<Business> {
    return of(this.negocio);
  }

  /**
   * Actualiza la información del negocio.
   * Se simula la actualización mediante la combinación (spread) de objetos.
   */
  updateBusinessInfo(updatedNegocio: Partial<Business>): Observable<boolean> {
    this.negocio = { ...this.negocio, ...updatedNegocio };
    return of(true);
  }
}
