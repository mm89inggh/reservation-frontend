import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { BusinessService } from '../../services/business/business.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ReservationService, BusinessService]
})
export class DashboardComponent implements OnInit {
  reservas: any[] = [];
  negocio: any = null;

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
    this.reservationService.getReservations().subscribe(response => {
      if (response && response.body) {
        this.reservas = response.body;
      } else {
        this.reservas = [];
      }
    }, error => {
      console.error("Error cargando reservas:", error);
      this.reservas = [];
    });
  }

  /**
   * Carga la información del negocio desde el backend.
   */
  loadBusinessInfo(): void {
    const idNegocio = 1; // Ajustar según el negocio en sesión
    this.businessService.getBusinessInfo(idNegocio).subscribe(response => {
      if (response && response.body) {
        this.negocio = response.body;
      } else {
        this.negocio = { nombre: "Negocio no disponible" };
      }
    }, error => {
      console.error("Error cargando información del negocio:", error);
      this.negocio = { nombre: "Negocio no disponible" };
    });
  }
}
