import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../../models/Service-manager.model';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  // Simulación de servicios ofrecidos
  private servicios: Service[] = [
    {
      id_servicio: 1,
      nombre: 'Corte de Cabello',
      descripcion: 'Corte y peinado',
      duracion: 30,
      precio: 15.00,
      id_negocio: 1
    },
    {
      id_servicio: 2,
      nombre: 'Manicure',
      descripcion: 'Cuidado de uñas',
      duracion: 45,
      precio: 20.00,
      id_negocio: 1
    }
  ];

  /**
   * Retorna la lista de servicios.
   */
  getServices(): Observable<Service[]> {
    return of(this.servicios);
  }

  /**
   * Agrega un nuevo servicio a la lista.
   */
  addService(servicio: Omit<Service, 'id_servicio' | 'id_negocio'>): Observable<boolean> {
    const newId = this.servicios.length + 1;
    // Se asume que el servicio siempre pertenece al negocio con id_negocio = 1
    this.servicios.push({ id_servicio: newId, ...servicio, id_negocio: 1 });
    return of(true);
  }

  /**
   * Elimina un servicio de la lista según su ID.
   */
  deleteService(id: number): Observable<boolean> {
    this.servicios = this.servicios.filter(s => s.id_servicio !== id);
    return of(true);
  }
}
