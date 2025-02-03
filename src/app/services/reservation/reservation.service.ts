// src/app/services/reservation/reservation.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8762/reservation-service/api/reservas';
  
  constructor(private http: HttpClient) {}

  // Simulación de reservas almacenadas
  private reservas: Reservation[] = [
    {
      id_reserva: 1,
      fecha: '2025-03-15',
      hora: '14:30:00',
      estado: 'pendiente',
      id_usuario: 3,
      id_negocio: 1,
      id_servicio: 2,
      created_at: '2025-02-01T10:00:00',
      updated_at: '2025-02-01T10:00:00'
    },
    {
      id_reserva: 2,
      fecha: '2025-03-16',
      hora: '16:00:00',
      estado: 'confirmada',
      id_usuario: 3,
      id_negocio: 1,
      id_servicio: 1,
      created_at: '2025-02-01T10:05:00',
      updated_at: '2025-02-01T10:05:00'
    }
  ];

  /**
   * Retorna la lista de reservas (a través de HTTP o simulada).
   */
  getReservations(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, '{"targetMethod": "GET"}', { headers: headers });
  }

  /**
   * Simula la cancelación de una reserva actualizando su estado.
   */
  cancelReservation(id: number): Observable<boolean> {
    this.reservas = this.reservas.map(r =>
      r.id_reserva === id ? { ...r, estado: 'cancelada' } : r
    );
    return of(true);
  }

  /**
   * Retorna una reserva en específico según su ID.
   */
  getReservationById(id: number): Observable<Reservation | undefined> {
    const reserva = this.reservas.find(r => r.id_reserva === id);
    return of(reserva);
  }

  /**
   * Actualiza el estado de una reserva.
   */
  updateReservationStatus(id: number, nuevoEstado: string): Observable<boolean> {
    this.reservas = this.reservas.map(r =>
      r.id_reserva === id ? { ...r, estado: nuevoEstado } : r
    );
    return of(true);
  }
  
  /**
   * Crea una nueva reserva (simulación).
   * Se asume que el objeto newReservation contiene:
   * { businessId, date, time, serviceId }
   */
  createReservation(newReservation: any): Observable<Reservation> {
    const newId = this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.id_reserva)) + 1 : 1;
    const createdReservation: Reservation = {
      id_reserva: newId,
      fecha: newReservation.date,
      hora: newReservation.time,
      estado: 'pendiente',
      id_usuario: 3, // Se asigna un usuario simulado; en una app real esto vendría de la sesión
      id_negocio: newReservation.businessId,
      id_servicio: newReservation.serviceId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.reservas.push(createdReservation);
    return of(createdReservation);
  }
}
