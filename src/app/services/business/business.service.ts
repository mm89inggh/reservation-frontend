import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Business } from '../../models/business.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/reservation-service/api/negocios`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información de un negocio por su ID.
   * @param id ID del negocio
   * @returns Observable con la respuesta del backend
   */
  getBusinessById(id: number): Observable<Business> {
    const body = {
      targetMethod: "GET"
    };
    return this.http.post<Business>(this.apiUrl+"/"+id, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza la información de un negocio.
   * @param id ID del negocio a actualizar
   * @param updatedInfo Objeto con la información actualizada
   * @returns Observable con la respuesta del backend
   */
  updateBusiness(id: number, updatedInfo: Partial<Business>): Observable<Business> {
    const body = {
      targetMethod: "PATCH",
      body: { ...updatedInfo }
    };
    return this.http.post<Business>(`${this.apiUrl}/${id}`, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina un negocio por su ID.
   * @param id ID del negocio a eliminar
   * @returns Observable con la respuesta del backend
   */
  deleteBusiness(id: number): Observable<void> {
    const body = {
      targetMethod: "DELETE",
      body: { id }
    };
    return this.http.post<void>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene la lista de todos los negocios.
   * @returns Observable con la lista de negocios
   */
  getAllBusinesses(): Observable<Business[]> {
    const body = {
      targetMethod: "GET"
    };
    return this.http.post<Business[]>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea un nuevo negocio.
   * @param business Objeto con la información del negocio a crear
   * @returns Observable con la respuesta del backend
   */
  createBusiness(business: Business): Observable<Business> {
    const body = {
      targetMethod: "POST",
      body: business
    };
    return this.http.post<Business>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}