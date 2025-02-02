import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Simulación de notificaciones almacenadas
  private notificaciones: Notification[] = [
    {
      id_notificacion: 1,
      mensaje: 'Su reserva del 15/03 a las 14:30 ha sido confirmada.',
      leido: false,
      id_usuario: 3,
      id_reserva: 1,
      created_at: '2025-02-01T11:00:00'
    },
    {
      id_notificacion: 2,
      mensaje: 'La reserva del 16/03 fue cancelada por el establecimiento.',
      leido: true,
      id_usuario: 3,
      id_reserva: 2,
      created_at: '2025-02-01T11:30:00'
    }
  ];

  /**
   * Retorna la lista de notificaciones.
   */
  getNotifications(): Observable<Notification[]> {
    return of(this.notificaciones);
  }

  /**
   * Marca una notificación como leída.
   */
  markAsRead(id: number): Observable<boolean> {
    this.notificaciones = this.notificaciones.map(noti =>
      noti.id_notificacion === id ? { ...noti, leido: true } : noti
    );
    return of(true);
  }
}
