import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Business } from '../../models/business.model';

@Injectable()
export class BusinessService {
  private apiUrl = 'http://ec2-18-205-162-176.compute-1.amazonaws.com:8762/reservation-service/api/negocios';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información de un negocio por su ID.
   */
  getBusinessInfo(id_negocio: number): Observable<any> {
    const body = {
      targetMethod: "GET",
      body: { id_negocio }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza la información de un negocio.
   */
  updateBusinessInfo(id_negocio: number, updatedInfo: Partial<Business>): Observable<any> {
    const body = {
      targetMethod: "UPDATE",
      body: { id_negocio, ...updatedInfo }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene la lista de todos los negocios.
   */
  getAllBusinesses(): Observable<any> {
    const body = { targetMethod: "GET" };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
