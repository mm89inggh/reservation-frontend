import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-reserva-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './reserva-info.component.html',
  styleUrls: ['./reserva-info.component.css']
})
export class ReservaInfoComponent implements OnInit { 
  reservationForm: FormGroup;
  estadoOptions = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Confirmada', value: 'confirmada' },
    { label: 'Cancelada', value: 'cancelada' }
  ];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      id: [0],  // Se cambia id_reserva por id
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      estado: ['', Validators.required],
      usuarioId: [0],  // Se cambia id_usuario por usuarioId
      negocioId: [0, Validators.required],  // Se cambia id_negocio por negocioId
      servicioId: [0, Validators.required]  // Se cambia id_servicio por servicioId
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadReservationInfo(id);
      }
    });
  }

  /**
   * Carga la información de una reserva por su ID.
   */
  loadReservationInfo(id: number): void {
    this.reservationService.getReservationById(id).subscribe(
      (response) => {
        this.reservationForm.patchValue(response);
      },
      (error) => {
        console.error('Error al obtener la información de la reserva:', error);
      }
    );
  }

  /**
   * Guarda los cambios en la reserva.
   */
  guardarCambios(): void {
    if (this.reservationForm.valid) {
      this.reservationService.updateReservation(
        this.reservationForm.value.id,  // Se cambia id_reserva por id
        this.reservationForm.value
      ).subscribe(
        () => {
          alert('Reserva actualizada correctamente');
          this.router.navigate(['/reservations']);
        },
        (error) => {
          console.error('Error al actualizar la reserva:', error);
          alert('Error al actualizar la reserva');
        }
      );
    }
  }

  /**
   * Cancelar y volver a la lista de reservas.
   */
  cancelar(): void {
    this.router.navigate(['/reservations']);
  }
}