import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationService]
})
export class ReservationsComponent implements OnInit {

  reservas: any[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(data => {
      this.reservas = data;
    });
  }

  cancelarReserva(id: number): void {
    // Llamada al servicio para cancelar la reserva
    this.reservationService.cancelReservation(id).subscribe(response => {
      // Actualizar la lista o notificar al usuario
      this.ngOnInit();
    });
  }
}