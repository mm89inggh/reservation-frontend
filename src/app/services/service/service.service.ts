import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/Service-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://ec2-3-89-128-121.compute-1.amazonaws.com:8762/reservation-service/api/reservas';
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
   * @param id_servicio ID del servicio a obtener.
   * @returns Observable con la información del servicio.
   */
  getServiceById(id_servicio: number): Observable<Service> {
    const body = {
      targetMethod: "GET",
      body: { id_servicio }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea un nuevo servicio en el sistema.
   * @param servicio Datos del servicio a crear (sin ID).
   * @param negocioId ID del negocio al que pertenece el servicio.
   * @returns Observable con la respuesta del backend.
   */
  createService(servicio: Omit<Service, 'id_servicio'>, negocioId: number): Observable<Service> {
    const body = {
      targetMethod: "POST",
      body: {
        ...servicio,
        id_negocio: negocioId
      }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza un servicio existente.
   * @param id_servicio ID del servicio a actualizar.
   * @param updatedInfo Datos actualizados del servicio.
   * @returns Observable con la respuesta del backend.
   */
  updateService(id_servicio: number, updatedInfo: Partial<Service>): Observable<Service> {
    const body = {
      targetMethod: "UPDATE",
      body: {
        id_servicio,
        ...updatedInfo
      }
    };
    return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina un servicio por su ID.
   * @param id_servicio ID del servicio a eliminar.
   * @returns Observable con la respuesta del backend.
   */
  deleteService(id_servicio: number): Observable<void> {
    const body = {
      targetMethod: "DELETE",
      body: { id_servicio }
    };
    return this.http.post<void>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
