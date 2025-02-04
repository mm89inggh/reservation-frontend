import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { BusinessService } from '../../services/business/business.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation.model';
import { Business } from '../../models/business.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ReservationService, BusinessService]
})
export class DashboardComponent implements OnInit {
  reservas: Reservation[] = [];
  negocio: Business | null = null;

  constructor(
    private reservationService: ReservationService,
    private businessService: BusinessService
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
        this.reservas = [];
      }
    );
  }

  /**
   * Carga la información del negocio desde el backend.
   */
  loadBusinessInfo(): void {
    const idNegocio = 1; // Ajustar según el negocio en sesión
    this.businessService.getBusinessById(idNegocio).subscribe(
      (response) => {
        this.negocio = response ?? this.getDefaultBusiness();
      },
      (error) => {
        console.error("Error cargando información del negocio:", error);
        this.negocio = this.getDefaultBusiness();
      }
    );
  }
  
  /**
   * Devuelve un objeto de negocio por defecto en caso de error.
   */
  private getDefaultBusiness(): Business {
    return {
      id_negocio: 0,
      nombre: "Negocio no disponible",
      direccion: "No disponible",
      contacto: "No disponible",
      coordenadas: "0,0"
    };
  }
  
}
