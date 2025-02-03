import { Component, OnInit } from '@angular/core';
import { Business } from '../../models/business.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsConfigModule } from '../../modules/google-maps-config.module';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsConfigModule,
    FormsModule
  ],
  providers: [ReservationService] // Se agrega el servicio aquí si no está en root
})
export class NuevaReservaComponent implements OnInit {
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  reservationForm: FormGroup;
  
  // Configuración inicial del mapa
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
      serviceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.businessService.getAllBusinesses().subscribe(businesses => {
      this.businesses = businesses;
      if (businesses.length > 0) {
        const firstCoords = this.parseCoordinates(businesses[0].coordenadas);
        this.center = { lat: firstCoords.lat, lng: firstCoords.lng };
      }
    });
  }

  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    const parts = coords.split(',');
    return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]) };
  }

  onMarkerClick(business: Business): void {
    this.selectedBusiness = business;
    this.reservationForm.patchValue({ businessId: business.id_negocio });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation = this.reservationForm.value;
      this.reservationService.createReservation(newReservation).subscribe(created => {
        console.log('Nueva Reserva creada:', created);
        alert('Reserva creada exitosamente');
        this.reservationForm.reset();
        this.selectedBusiness = null;
      });
    }
  }
}
