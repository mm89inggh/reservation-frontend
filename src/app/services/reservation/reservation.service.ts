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
    }
  ];

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  cancelReservation(id: number): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id_reserva === id);
    if (index !== -1) {
      this.reservas[index].estado = 'cancelada';
      return of(true);
    }
    return of(false);
  }

  getReservationById(id: number): Observable<Reservation | undefined> {
    return of(this.reservas.find(r => r.id_reserva === id));
  }

  updateReservationStatus(id: number, nuevoEstado: string): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id_reserva === id);
    if (index !== -1) {
      this.reservas[index].estado = nuevoEstado;
      return of(true);
    }
    return of(false);
  }

  createReservation(newReservation: { businessId: number; date: string; time: string; serviceId: number }): Observable<Reservation> {
    const newId = this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.id_reserva)) + 1 : 1;
    const createdReservation: Reservation = {
      id_reserva: newId,
      fecha: newReservation.date,
      hora: newReservation.time,
      estado: 'pendiente',
      id_usuario: 3,
      id_negocio: newReservation.businessId,
      id_servicio: newReservation.serviceId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.reservas.push(createdReservation);
    return of(createdReservation);
  }
}
