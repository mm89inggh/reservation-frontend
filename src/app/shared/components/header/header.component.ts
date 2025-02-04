import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuItems: MenuItem[];

  constructor(private keycloakService: KeycloakService, private router: Router) {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Reservas', icon: 'pi pi-calendar', routerLink: '/reservations' },
      { label: 'Nueva Reserva', icon: 'pi pi-plus', routerLink: '/nueva-reserva' },
      { label: 'Notificaciones', icon: 'pi pi-bell', routerLink: '/notifications' },
      { label: 'Negocio', icon: 'pi pi-briefcase', routerLink: '/business-list' }
    ];
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
