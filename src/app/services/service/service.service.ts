import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/Service-manager.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/reservation-service/api/servicios`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los servicios.
   * @returns Observable con la lista de servicios.
   */
  getAllServices(): Observable<Service[]> {
    const body = { targetMethod: "GET" };
    return this.http.post<Service[]>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene un servicio por su ID.
   * @param id ID del servicio a obtener.
   * @returns Observable con la información del servicio.
   */
  getServiceById(id: number): Observable<Service> {
    const body = {
      targetMethod: "GET",
      body: { id }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

 /**
 * Crea un nuevo servicio en el sistema.
 * @param servicio Datos del servicio a crear (sin ID).
 * @returns Observable con la respuesta del backend.
 */
createService(servicio: Omit<Service, 'id'>): Observable<Service> {
    const body = {
      targetMethod: "POST",
      body: {
        id: 0,
        ...servicio
      }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza un servicio existente.
   * @param id ID del servicio a actualizar.
   * @param updatedInfo Datos actualizados del servicio.
   * @returns Observable con la respuesta del backend.
   */
  updateService(id: number, updatedInfo: Partial<Service>): Observable<Service> {
    const body = {
      targetMethod: "UPDATE",
      body: {
        id,
        ...updatedInfo
      }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina un servicio por su ID.
   * @param id ID del servicio a eliminar.
   * @returns Observable con la respuesta del backend.
   */
  deleteService(id: number): Observable<void> {
    const body = {
      targetMethod: "DELETE",
      body: { id }
    };
    return this.http.post<void>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
