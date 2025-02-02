import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { BusinessService } from '../../services/business/business.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservas: any[] = [];
  negocio: any;

  constructor(
    private reservationService: ReservationService,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadBusinessInfo();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(data => {
      this.reservas = data;
    });
  }

  loadBusinessInfo(): void {
    this.businessService.getBusinessInfo().subscribe(data => {
      this.negocio = data;
    });
  }
}