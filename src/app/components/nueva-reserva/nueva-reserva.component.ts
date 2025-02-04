import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Business } from '../../models/business.model';
import { take } from 'rxjs/operators';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ServiceService } from '../../services/service/service.service';
import { Service } from '../../models/Service-manager.model';
import { Reservation } from '../../models/reservation.model';

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
  providers: [ReservationService, ServiceService, BusinessService],
  templateUrl: './nueva-reserva.component.html'
})
export class NuevaReservaComponent implements OnInit {
  /** Listado completo de negocios. */
  businesses: Business[] = [];
  /** Negocio seleccionado. */
  selectedBusiness: Business | null = null;
  /** Listado de servicios disponibles. */
  services: Service[] = [];
  /** Formulario de creación de reserva. */
  reservationForm: FormGroup;
  /** Ajustes iniciales del mapa. */
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 }; // Centro en Madrid por defecto

  constructor(
    private businessService: BusinessService,
    private serviceService: ServiceService,
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
    // Cargar lista de negocios
    this.businessService.getAllBusinesses().pipe(take(1)).subscribe({
      next: (businesses) => {
        this.businesses = businesses;
      },
      error: (err) => console.error('Error al obtener negocios:', err)
    });

    // Cargar lista de servicios
    this.serviceService.getAllServices().pipe(take(1)).subscribe({
      next: (services) => this.services = services,
      error: (err) => console.error('Error al obtener servicios:', err)
    });
  }

  /**
   * Maneja la selección de negocio desde el menú desplegable.
   * Busca el negocio seleccionado por ID y actualiza el formulario y el mapa.
   */
  onBusinessSelect(businessIdStr: string): void {
    if (!businessIdStr) {
      this.selectedBusiness = null;
      return;
    }
    const businessId = +businessIdStr;
    const business = this.businesses.find(b => b.id_negocio === businessId);
    if (business) {
      this.selectBusiness(business);
    }
  }

  /**
   * Selecciona el negocio, centra el mapa y actualiza el formulario.
   */
  selectBusiness(business: Business): void {
    this.selectedBusiness = business;
    this.center = this.parseCoordinates(business.coordenadas);
    this.reservationForm.patchValue({ businessId: business.id_negocio });
  }

  /**
   * Convierte una cadena de coordenadas "lat,lng" en un objeto LatLngLiteral.
   */
  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    if (!coords) {
      console.warn('Coordenadas no proporcionadas, usando valores predeterminados (Madrid).');
      return { lat: 40.416775, lng: -3.70379 };
    }
    const parts = coords.split(',').map(coord => parseFloat(coord.trim()));
    return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) ? 
      { lat: parts[0], lng: parts[1] } : { lat: 40.416775, lng: -3.70379 };
  }

  /**
   * Envía el formulario y crea una nueva reserva a través del servicio.
   */
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation: Omit<Reservation, 'id_reserva' | 'created_at' | 'updated_at'> = {
        fecha: this.reservationForm.value.date,
        hora: this.reservationForm.value.time,
        estado: "pendiente",
        id_usuario: 3, // Se debería obtener dinámicamente
        id_negocio: this.reservationForm.value.businessId,
        id_servicio: this.reservationForm.value.serviceId
      };
  
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
