import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';

@Injectable()
export class ReservationService {
  private apiUrl = 'http://ec2-18-205-162-176.compute-1.amazonaws.com:8762/reservation-service/api/reservas';

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * Obtiene todas las reservas enviando una solicitud POST con targetMethod "GET".
   */
  getReservations(): Observable<any> {
    const body = {
      targetMethod: "GET"
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Cancela una reserva enviando una solicitud POST con targetMethod "CANCEL".
   */
  cancelReservation(id: number): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: { reservaId: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene una reserva por su ID enviando una solicitud POST con targetMethod "GET_BY_ID".
   */
  getReservationById(id: number): Observable<any> {
    const body = {
      targetMethod: "GET",
      body: { reservaId: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza el estado de una reserva enviando una solicitud POST con targetMethod "UPDATE_STATUS".
   */
  updateReservationStatus(id: number, nuevoEstado: string): Observable<any> {
    const body = {
      targetMethod: "UPDATE",
      body: {
        reservaId: id,
        estado: nuevoEstado
      }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea una nueva reserva enviando una solicitud POST con targetMethod "CREATE".
   */
  createReservation(newReservation: { businessId: number; date: string; time: string; serviceId: number }): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: {
        fecha: newReservation.date,
        hora: newReservation.time,
        estado: "pendiente",
        id_usuario: 3, // Este valor debe ajustarse dinámicamente según la lógica del usuario
        id_negocio: newReservation.businessId,
        id_servicio: newReservation.serviceId
      }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
