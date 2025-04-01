import { Injectable } from '@angular/core';
import { from, mergeMap, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/Service-manager.model';
import { environment } from '../../../environments/environment';
import { TokenUtilService } from '../token-util/token-util.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/reservation-service/api/servicios`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private tokenUtilService: TokenUtilService) {}

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
      targetMethod: "GET"
    };
    return this.http.post<Service>(`${this.apiUrl}/${id}`, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene los servicio por negocio
   * @param id Id del negocio
   * @returns  Lista de servicios
   */
  getServiceByNegocioId(id: number): Observable<Service[]> {
    const body = {
      targetMethod: "GET"
    };
    return this.http.post<Service[]>(this.apiUrl+"/negocios/"+id, JSON.stringify(body), { headers: this.headers });
  }

 /**
 * Crea un nuevo servicio en el sistema.
 * @param servicio Datos del servicio a crear (sin ID).
 * @returns Observable con la respuesta del backend.
 * */
  createService(nombre: string): Observable<Service> {
      const negocioId$ = from(this.tokenUtilService.getAttribute('negocioId'));
      return negocioId$.pipe(
        mergeMap(negocioId => {
          const body = {
            targetMethod: 'POST',
            body: {
              nombre,
              negocioId,
            },
          };
          return this.http.post<Service>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
        })
      );
    }
    


  /**
   * Actualiza un servicio existente.
   * @param id ID del servicio a actualizar.
   * @param updatedInfo Datos actualizados del servicio.
   * @returns Observable con la respuesta del backend.
   */
  updateService(id: number, updatedInfo: Partial<Service>): Observable<Service> {
    const body = {
      targetMethod: "PATCH",
      body: {
        nombre : updatedInfo.nombre
      }
    };
    console.log(JSON.stringify(body))
    return this.http.post<Service>(`${this.apiUrl}/${id}`, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina un servicio por su ID.
   * @param id ID del servicio a eliminar.
   * @returns Observable con la respuesta del backend.
   */
  deleteService(id: number): Observable<void> {
    const body = {
      targetMethod: "DELETE"
    };
    return this.http.post<void>(`${this.apiUrl}/${id}`, JSON.stringify(body), { headers: this.headers });
  }
}
