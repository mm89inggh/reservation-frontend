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

// PrimeNG
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';

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
    MapMarker,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    ToastModule,
    PanelModule
  ],
  providers: [ReservationService, ServiceService, BusinessService, MessageService],
  templateUrl: './nueva-reserva.component.html'
})
export class NuevaReservaComponent implements OnInit {
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  services: Service[] = [];
  reservationForm: FormGroup;
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 };

  constructor(
    private businessService: BusinessService,
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private messageService: MessageService
  ) {
    this.reservationForm = this.fb.group({
      negocioId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      servicioId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.businessService.getAllBusinesses().pipe(take(1)).subscribe({
      next: (businesses) => {
        this.businesses = businesses;
      },
      error: (err) => console.error('Error al obtener negocios:', err)
    });

    this.serviceService.getAllServices().pipe(take(1)).subscribe({
      next: (services) => this.services = services,
      error: (err) => console.error('Error al obtener servicios:', err)
    });
  }

  onBusinessSelect(event: any): void {
    const negocioId = event.value;
    const business = this.businesses.find(b => b.id === negocioId);
    if (business) {
      this.selectBusiness(business);
    }
  }

  selectBusiness(business: Business): void {
    this.selectedBusiness = business;
    this.center = this.parseCoordinates(business.coordenadas);
    this.reservationForm.patchValue({ negocioId: business.id });
  }

  parseCoordinates(coords: string): google.maps.LatLngLiteral {
    if (!coords) return { lat: 40.416775, lng: -3.70379 };
    const parts = coords.split(',').map(coord => parseFloat(coord.trim()));
    return parts.length === 2 ? { lat: parts[0], lng: parts[1] } : { lat: 40.416775, lng: -3.70379 };
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation: Omit<Reservation, 'id'> = {
        fecha: this.reservationForm.value.fecha,
        hora: this.reservationForm.value.hora,
        estado: "pendiente",
        usuarioId: 3,
        negocioId: this.reservationForm.value.negocioId,
        servicioId: this.reservationForm.value.servicioId
      };

      this.reservationService.createReservation(newReservation).pipe(take(1)).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Reserva creada', detail: 'Tu reserva se ha realizado con éxito' });
          this.reservationForm.reset();
          this.selectedBusiness = null;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la reserva' });
        }
      });
    }
  }
}