import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

interface RoleBasedMenuItem {
  item: MenuItem;
  roles: string[];
}


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];
  roleBasedMenuItems: RoleBasedMenuItem[] = [
    { item: { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' }, roles: ['administrador', 'negocio'] },
    { item: { label: 'Reservas', icon: 'pi pi-calendar', routerLink: '/reservations' }, roles: ['administrador','negocio','cliente'] },
    { item: { label: 'Nueva Reserva', icon: 'pi pi-plus', routerLink: '/nueva-reserva' }, roles: ['administrador','cliente'] },
    { item: { label: 'Notificaciones', icon: 'pi pi-bell', routerLink: '/notifications' }, roles: ['administrador','negocio'] },
    { item: { label: 'Negocio', icon: 'pi pi-briefcase', routerLink: '/business-list' }, roles: ['administrador'] },
    { item: { label: 'Soporte', icon: 'pi pi-briefcase', routerLink: '/notfound' }, roles: ['administrador','soporte'] }
  ];


  constructor(private keycloakService: KeycloakService) {
    this.filterMenuItems();
  }


  private filterMenuItems(): void {
    const userRoles = this.keycloakService.getUserRoles(); // Obtén los roles del usuario
    console.log('Roles del usuario:', userRoles);
    this.menuItems = this.roleBasedMenuItems
      .filter(menuItem => menuItem.roles.some(role => userRoles.includes(role)))
      .map(menuItem => menuItem.item); // Extraer solo los objetos MenuItem
  }




  logout(): void {
    this.keycloakService.logout();
  }
}
