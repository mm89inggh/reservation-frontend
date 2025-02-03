import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/Service-manager.model';

@Injectable()
export class ServiceService {
  private apiUrl = 'http://ec2-18-205-162-176.compute-1.amazonaws.com:8762/reservation-service/api/reservas';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de servicios desde el backend.
   */
  getServices(): Observable<any> {
    const body = { targetMethod: "GET" };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Agrega un nuevo servicio enviando una solicitud POST con targetMethod "ADD_SERVICE".
   */
  addService(servicio: Omit<Service, 'id_servicio' | 'id_negocio'>, negocioId: number): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: {
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        duracion: servicio.duracion,
        precio: servicio.precio,
        id_negocio: negocioId
      }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina un servicio enviando una solicitud POST con targetMethod "DELETE_SERVICE".
   */
  deleteService(id: number): Observable<any> {
    const body = {
      targetMethod: "DELETE",
      body: { id_servicio: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
