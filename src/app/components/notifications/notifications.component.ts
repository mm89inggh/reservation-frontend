import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';
import { HttpClientModule } from '@angular/common/http';

// Importaciones de PrimeNG
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardModule,
    ListboxModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationService, MessageService]
})
export class NotificationsComponent implements OnInit {
  notificaciones: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  /**
   * Carga las notificaciones desde el servicio.
   */
  cargarNotificaciones(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notificaciones = data;
      },
      (error) => {
        console.error("Error al obtener las notificaciones:", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las notificaciones'
        });
      }
    );
  }

  /**
   * Marca una notificación como leída.
   */
  marcarComoLeida(noti: any): void {
    noti.leido = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Notificación leída',
      detail: 'Has marcado esta notificación como leída'
    });
  }
}
