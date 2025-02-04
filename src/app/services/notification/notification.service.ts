import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../../models/notification.model';

@Injectable()
export class NotificationService {
  private apiUrl = 'http://ec2-3-89-128-121.compute-1.amazonaws.com:8762/notification-service/api/notificaciones';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de notificaciones desde el backend.
   */
  getNotifications(): Observable<any> {
    const body = { targetMethod: "GET" };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene una notificación específica por su ID.
   */
  getNotificationById(id: number): Observable<any> {
    const body = {
      targetMethod: "GET",
      body: { id_notificacion: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Marca una notificación como leída.
   */
  markAsRead(id: number): Observable<any> {
    const body = {
      targetMethod: "MARK_AS_READ",
      body: { id_notificacion: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea una nueva notificación.
   */
  createNotification(notification: Omit<Notification, 'id_notificacion'>): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: notification
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
