import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { BusinessService } from '../../services/business/business.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation.model';
import { Business } from '../../models/business.model';

// PrimeNG
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ReservationService, BusinessService, MessageService]
})
export class DashboardComponent implements OnInit {
  reservas: Reservation[] = [];
  negocio: Business | null = null;

  constructor(
    private reservationService: ReservationService,
    private businessService: BusinessService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
    this.loadBusinessInfo();
  }

  /**
   * Carga la lista de reservas desde el backend.
   */
  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (response) => {
        this.reservas = response ?? [];
      },
      (error) => {
        console.error("Error cargando reservas:", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las reservas' });
        this.reservas = [];
      }
    );
  }

  /**
   * Carga la información del negocio desde el backend.
   */
  loadBusinessInfo(): void {
    const idNegocio = 1; 
    this.businessService.getBusinessById(idNegocio).subscribe(
      (response) => {
        this.negocio = response ?? this.getDefaultBusiness();
      },
      (error) => {
        console.error("Error cargando información del negocio:", error);
        this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'No se pudo cargar la información del negocio' });
        this.negocio = this.getDefaultBusiness();
      }
    );
  }

  /**
   * Devuelve un objeto de negocio por defecto en caso de error.
   */
  private getDefaultBusiness(): Business {
    return {
      id: 0,
      nombre: "Negocio no disponible",
      direccion: "No disponible",
      contacto: "No disponible",
      coordenadas: "0,0"
    };
  }

  /**
   * Devuelve la clase CSS para el estado de la reserva.
   */
  getEstadoClase(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';
      case 'confirmada':
        return 'estado-confirmada';
      case 'cancelada':
        return 'estado-cancelada';
      default:
        return 'estado-desconocido';
    }
  }
}
