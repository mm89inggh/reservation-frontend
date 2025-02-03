// src/app/components/nueva-reserva/nueva-reserva.component.ts
import { Component, OnInit } from '@angular/core';
import { Business } from '../../models/business.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GoogleMapsConfigModule } from '../../modules/google-maps-config.module';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsConfigModule,
    FormsModule
  ]
})
export class NuevaReservaComponent implements OnInit {
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  reservationForm: FormGroup;
  
  // Configuración inicial del mapa (centrado en Madrid, por ejemplo)
  zoom: number = 12;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 };

  constructor(
    private businessService: BusinessService,
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      businessId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      serviceId: ['', Validators.required] // Selección del servicio
    });
  }

  ngOnInit(): void {
    this.businessService.getAllBusinesses().subscribe(businesses => {
      this.businesses = businesses;
      if (businesses.length > 0) {
        // Centramos el mapa en el primer negocio
        const firstCoords = this.parseCoordinates(businesses[0].coordenadas);
        this.center = { lat: firstCoords.lat, lng: firstCoords.lng };
      }
    });
  }

  /**
   * Convierte la cadena de coordenadas (lat,lng) en un objeto numérico compatible con Google Maps.
   */
  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    const parts = coords.split(',');
    return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]) };
  }

  /**
   * Al hacer clic en un marcador se selecciona el negocio y se actualiza el formulario.
   */
  onMarkerClick(business: Business): void {
    this.selectedBusiness = business;
    this.reservationForm.patchValue({
      businessId: business.id_negocio
    });
  }

  /**
   * Envía el formulario para crear la reserva.
   */
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation = this.reservationForm.value;
      this.reservationService.createReservation(newReservation).subscribe(created => {
        console.log('Nueva Reserva creada:', created);
        alert('Reserva creada exitosamente');
        // Reiniciamos el formulario y limpiamos la selección
        this.reservationForm.reset();
        this.selectedBusiness = null;
      });
    }
  }
}
