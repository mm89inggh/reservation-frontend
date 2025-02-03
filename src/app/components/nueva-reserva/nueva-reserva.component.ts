import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GoogleMapsConfigModule } from '../../modules/google-maps-config.module';
import { Business } from '../../models/business.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nueva-reserva',
  styleUrls: ['./nueva-reserva.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, GoogleMapsConfigModule, ReactiveFormsModule, FormsModule],
  providers: [ReservationService],
  templateUrl: './nueva-reserva.component.html'
})
export class NuevaReservaComponent implements OnInit {
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  reservationForm: FormGroup;

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 }; // Centro predeterminado en Madrid

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
    this.businessService.getAllBusinesses().pipe(take(1)).subscribe({
      next: (businesses) => {
        this.businesses = businesses;
        if (businesses.length > 0) {
          const firstCoords = this.parseCoordinates(businesses[0].coordenadas);
          if (firstCoords) {
            this.center = firstCoords;
          }
        }
      },
      error: (err) => console.error('Error al obtener negocios:', err)
    });
  }

  /**
   * Convierte una cadena de coordenadas "lat,lng" en un objeto LatLngLiteral válido.
   */
  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    if (!coords) {
      console.warn('Coordenadas no proporcionadas, usando valores predeterminados.');
      return { lat: 0, lng: 0 }; // Coordenadas seguras en caso de error
    }

    const parts = coords.split(',').map(coord => parseFloat(coord.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }

    console.warn(`Formato incorrecto de coordenadas: ${coords}. Se usará el valor predeterminado.`);
    return { lat: 0, lng: 0 }; // Retorno seguro en caso de error
  }

  /**
   * Selecciona un negocio al hacer clic en un marcador del mapa.
   */
  onMarkerClick(business: Business): void {
    if (!business) return;
    this.selectedBusiness = business;
    this.reservationForm.patchValue({ businessId: business.id_negocio });
  }

  /**
   * Envía el formulario para crear una reserva.
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
