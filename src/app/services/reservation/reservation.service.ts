import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://ec2-3-87-210-143.compute-1.amazonaws.com:8762/reservation-service/api/reservas';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las reservas.
   * @returns Observable con la lista de reservas.
   */
  getAllReservations(): Observable<Reservation[]> {
    const body = { targetMethod: "GET" };
    return this.http.post<Reservation[]>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene una reserva por su ID.
   * @param reservaId ID de la reserva a obtener.
   * @returns Observable con la información de la reserva.
   */
  getReservationById(reservaId: number): Observable<Reservation> {
    const body = {
      targetMethod: "GET",
      body: { reservaId }
    };
    return this.http.post<Reservation>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea una nueva reserva.
   * @param newReservation Datos de la nueva reserva.
   * @returns Observable con la respuesta del backend.
   */
  createReservation(newReservation: Omit<Reservation, 'id_reserva' | 'created_at' | 'updated_at'>): Observable<Reservation> {
    const body = {
      targetMethod: "POST",
      body: newReservation
    };
    return this.http.post<Reservation>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
  

  /**
   * Actualiza una reserva existente.
   * @param reservaId ID de la reserva a actualizar.
   * @param updatedInfo Datos actualizados de la reserva.
   * @returns Observable con la respuesta del backend.
   */
  updateReservation(reservaId: number, updatedInfo: Partial<Reservation>): Observable<Reservation> {
    const body = {
      targetMethod: "UPDATE",
      body: {
        reservaId,
        ...updatedInfo
      }
    };
    return this.http.post<Reservation>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina una reserva por su ID.
   * @param reservaId ID de la reserva a eliminar.
   * @returns Observable con la respuesta del backend.
   */
  deleteReservation(reservaId: number): Observable<void> {
    const body = {
      targetMethod: "DELETE",
      body: { reservaId }
    };
    return this.http.post<void>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
