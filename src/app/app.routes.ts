import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio'] } },
  // Rutas para Business
  { path: 'business-info/:id', loadComponent: () => import('./components/business/business-info/business-info.component').then(m => m.BusinessInfoComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio'] } },
  { path: 'business-list', loadComponent: () => import('./components/business/business-list/business-list.component').then(m => m.BusinessListComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio'] } },
  { path: 'business-create', loadComponent: () => import('./components/business/business-create/business-create.component').then(m => m.BusinessCreateComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio'] } },

  // 🔹 Rutas para Services
  { path: 'service-info/:id', loadComponent: () => import('./components/services-management/service-info/service-info.component').then(m => m.ServiceInfoComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio'] } },
  { path: 'service-list', loadComponent: () => import('./components/services-management/service-list/service-list.component').then(m => m.ServiceListComponent), canActivate: [AuthGuard] ,data: { roles: ['administrador','negocio'] }},
  { path: 'service-create', loadComponent: () => import('./components/services-management/service-create/service-create.component').then(m => m.ServiceCreateComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio'] } },

  { path: 'notifications', loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio'] } },


  { path: 'nueva-reserva', loadComponent: () => import('./components/nueva-reserva/nueva-reserva.component').then(m => m.NuevaReservaComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio','cliente'] }},
  { path: 'reservations', loadComponent: () => import('./components/reservations/reservations.component').then(m => m.ReservationsComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio','cliente'] } },
  { path: 'reservacion-info/:id', loadComponent: () => import('./components/reserva-info/reserva-info/reserva-info.component').then(m => m.ReservaInfoComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio','cliente'] } },

  // Rutas para Transactions
  { path: 'transactions-list', loadComponent: () => import('./components/transactions/transactions-list/transactions-list.component').then(m => m.TransactionsListComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio'] }},
  { path: 'transactions-info/:id', loadComponent: () => import('./components/transactions/transactions-info/transactions-info.component').then(m => m.TransactionsInfoComponent), canActivate: [AuthGuard],data: { roles: ['administrador','negocio'] } },
  { path: 'transactions-create', loadComponent: () => import('./components/transactions/transactions-create/transactions-create.component').then(m => m.TransactionsCreateComponent), canActivate: [AuthGuard], data: { roles: ['administrador','negocio'] } },
  { path: 'access-restricted', loadComponent: () => import('./components/access-restricted/access-restricted.component').then(m => m.AccessRestrictedComponent)},
  { path: '**', redirectTo: '/access-restricted' }
];
