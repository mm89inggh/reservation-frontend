import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, TagModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationService]
})
export class ReservationsComponent implements OnInit {
  reservas: Reservation[] = [];

  constructor(private reservationService: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  /**
   * Carga todas las reservas desde el servicio.
   */
  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  /**
   * Cancela una reserva y recarga la lista de reservas.
   * @param id ID de la reserva a cancelar.
   */
  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          alert('Reserva cancelada correctamente');
          this.loadReservations();
        },
        (error) => {
          console.error('Error al cancelar la reserva:', error);
          alert('Error al cancelar la reserva');
        }
      );
    }
  }

  /**
   * Redirige a la vista de información de la reserva seleccionada.
   * @param id ID de la reserva.
   */
  verReserva(id: number): void {
    this.router.navigate(['/reservacion-info', id]);
  }

  /**
   * Retorna el color del estado de la reserva en base a su valor.
   * @param estado Estado de la reserva.
   */
  getEstadoColor(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "warning";
      case "confirmada":
        return "success";
      case "cancelada":
        return "danger";
      default:
        return "secondary";
    }
  }
}