import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Business } from '../../models/business.model';
import { take } from 'rxjs/operators';
import {GoogleMap, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-nueva-reserva',
  styleUrls: ['./nueva-reserva.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    MapMarker
  ],
  providers: [ReservationService],
  templateUrl: './nueva-reserva.component.html'
})
export class NuevaReservaComponent implements OnInit {
  /** Listado completo de negocios. */
  businesses: Business[] = [];

  /** Negocio seleccionado al hacer clic en un marcador. */
  selectedBusiness: Business | null = null;

  /** Formulario de creación de reserva. */
  reservationForm: FormGroup;

  /** Ajustes iniciales del mapa. */
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 }; // Centro en Madrid por defecto

  constructor(
    private businessService: BusinessService,
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      businessId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      serviceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Al iniciar, cargamos la lista de negocios y ajustamos el centro del mapa
    this.businessService.getAllBusinesses().pipe(take(1)).subscribe({
      next: (businesses) => {
        this.businesses = businesses;
        if (businesses.length > 0) {
          // Ajusta el centro del mapa al primer negocio de la lista
          this.center = this.parseCoordinates(businesses[0].coordenadas);
        }
      },
      error: (err) => console.error('Error al obtener negocios:', err)
    });
  }

  /**
   * Convierte una cadena de coordenadas "lat,lng" en un objeto LatLngLiteral válido.
   * Si el formato es inválido o no existe, retorna un valor por defecto (Madrid).
   */
  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    if (!coords) {
      console.warn('Coordenadas no proporcionadas, usando valores predeterminados (Madrid).');
      return { lat: 40.416775, lng: -3.70379 };
    }

    const parts = coords.split(',').map(coord => parseFloat(coord.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }

    console.warn(`Formato incorrecto de coordenadas: "${coords}". Se usará el valor predeterminado (Madrid).`);
    return { lat: 40.416775, lng: -3.70379 };
  }

  /**
   * Accionado al hacer clic sobre un marcador del mapa. 
   * Establece el negocio seleccionado y actualiza el formulario.
   */
  onMarkerClick(business: Business): void {
    if (!business) return;
    this.selectedBusiness = business;
    this.reservationForm.patchValue({ businessId: business.id_negocio });
  }

  /**
   * Envía el formulario y crea una nueva reserva a través del servicio.
   */
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation = this.reservationForm.value;
      this.reservationService.createReservation(newReservation).pipe(take(1)).subscribe({
        next: (created) => {
          console.log('Nueva Reserva creada:', created);
          alert('Reserva creada exitosamente');
          this.reservationForm.reset();
          this.selectedBusiness = null;
        },
        error: (err) => console.error('Error al crear la reserva:', err)
      });
    } else {
      console.warn('El formulario no es válido.');
    }
  }
}