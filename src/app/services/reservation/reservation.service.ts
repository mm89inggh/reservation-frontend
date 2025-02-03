import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';
@Injectable()
export class ReservationService {
  private apiUrl = 'http://ec2-18-205-162-176.compute-1.amazonaws.com:8762/reservation-service/api/reservas';

  constructor(private http: HttpClient) {}

  // Simulación de reservas almacenadas localmente
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
   * Ejemplo de método para obtener reservas desde el backend (aún en mock).
   */
  getReservations(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, '{"targetMethod": "GET"}', { headers });
  }

  /**
   * Simula la cancelación de una reserva actualizando su estado en la lista local.
   */
  cancelReservation(id: number): Observable<boolean> {
    this.reservas = this.reservas.map(r =>
      r.id_reserva === id ? { ...r, estado: 'cancelada' } : r
    );
    return of(true);
  }

  /**
   * Obtiene una reserva por ID (ejemplo en memoria).
   */
  getReservationById(id: number): Observable<Reservation | undefined> {
    const reserva = this.reservas.find(r => r.id_reserva === id);
    return of(reserva);
  }

  /**
   * Actualiza el estado de una reserva en la lista local (solo simulación).
   */
  updateReservationStatus(id: number, nuevoEstado: string): Observable<boolean> {
    this.reservas = this.reservas.map(r =>
      r.id_reserva === id ? { ...r, estado: nuevoEstado } : r
    );
    return of(true);
  }

  /**
   * Crea una nueva reserva en la lista local (simulación).
   */
  createReservation(
    newReservation: { businessId: number; date: string; time: string; serviceId: number }
  ): Observable<Reservation> {
    const newId = this.reservas.length > 0
      ? Math.max(...this.reservas.map(r => r.id_reserva)) + 1
      : 1;

    const createdReservation: Reservation = {
      id_reserva: newId,
      fecha: newReservation.date,
      hora: newReservation.time,
      estado: 'pendiente',
      id_usuario: 3, // Puedes ajustar el ID de usuario según tu lógica
      id_negocio: newReservation.businessId,
      id_servicio: newReservation.serviceId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.reservas.push(createdReservation);
    return of(createdReservation);
  }
}