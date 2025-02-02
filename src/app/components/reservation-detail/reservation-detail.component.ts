import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reserva: any;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.loadReservationDetail(id);
    } else {
      console.error('No se encontró el parámetro "id" en la ruta.');
    }
  }

  loadReservationDetail(id: number): void {
    this.reservationService.getReservationById(id).subscribe(data => {
      this.reserva = data;
    });
  }

  actualizarEstado(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const nuevoEstado = target.value;

    if (!this.reserva?.id_reserva) {
      console.error("No se puede actualizar el estado porque la reserva es nula o no tiene un ID.");
      return;
    }

    this.reservationService.updateReservationStatus(this.reserva.id_reserva, nuevoEstado).subscribe(
      updated => {
        if (this.reserva) {
          this.reserva.estado = nuevoEstado;
        }
      }
    );
  }
}