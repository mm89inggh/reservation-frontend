import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';
import { Business } from '../../models/business.model';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css'],
  providers: [BusinessService] // Asegura que el servicio se inyecte correctamente
})
export class BusinessInfoComponent implements OnInit {
  negocio: Business  = {
    id_negocio: 1, // Ajustar dinámicamente si es necesario
    nombre: '',
    direccion: '',
    contacto: '',
    coordenadas: ''
  };

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    this.loadBusinessInfo();
  }

  /**
   * Carga la información del negocio desde el backend.
   */
  loadBusinessInfo(): void {
    this.businessService.getBusinessInfo(this.negocio.id_negocio).subscribe(
      response => {
        if (response && response.body) {
          this.negocio = response.body;
        } else {
          console.warn("No se encontró información del negocio.");
        }
      },
      error => {
        console.error("Error al obtener la información del negocio:", error);
      }
    );
  }

  /**
   * Guarda los cambios en la información del negocio.
   */
  guardarCambios(): void {
    this.businessService.updateBusinessInfo(this.negocio.id_negocio, this.negocio).subscribe(
      response => {
        if (response && response.success) {
          alert('Información actualizada correctamente');
        } else {
          alert('Error al actualizar la información');
        }
      },
      error => {
        console.error("Error al actualizar la información del negocio:", error);
        alert('Error al actualizar la información');
      }
    );
  }
}
