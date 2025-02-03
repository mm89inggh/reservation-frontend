// src/app/app-routing.module.ts (o el archivo de rutas que utilices)
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'reservations', loadComponent: () => import('./components/reservations/reservations.component').then(m => m.ReservationsComponent), canActivate: [AuthGuard] },
  { path: 'reservations/:id', loadComponent: () => import('./components/reservation-detail/reservation-detail.component').then(m => m.ReservationDetailComponent), canActivate: [AuthGuard] },
  { path: 'services-management', loadComponent: () => import('./components/services-management/services-management.component').then(m => m.ServicesManagementComponent), canActivate: [AuthGuard] },
  { path: 'business-info', loadComponent: () => import('./components/business-info/business-info.component').then(m => m.BusinessInfoComponent), canActivate: [AuthGuard] },
  { path: 'notifications', loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent), canActivate: [AuthGuard] },
  { path: 'transactions', loadComponent: () => import('./components/transactions/transactions.component').then(m => m.TransactionsComponent), canActivate: [AuthGuard] },
  { path: 'nueva-reserva', loadComponent: () => import('./components/nueva-reserva/nueva-reserva.component').then(m => m.NuevaReservaComponent), canActivate: [AuthGuard] }
];
