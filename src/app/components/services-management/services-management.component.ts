import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service/service.service';

@Component({
  selector: 'app-services-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.css'],
    providers: [ServiceService]
})
export class ServicesManagementComponent implements OnInit {
  servicios: any[] = [];
  nuevoServicio: any = { nombre: '', descripcion: '', duracion: 0, precio: 0 };
  negocioId: number = 1; // Ajustar dinámicamente si es necesario

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  /**
   * Carga la lista de servicios desde el backend.
   */
  loadServices(): void {
    this.serviceService.getServices().subscribe(response => {
      if (response && response.body) {
        this.servicios = response.body;
      }
    });
  }

  /**
   * Agrega un nuevo servicio enviando la información al backend.
   */
  agregarServicio(): void {
    this.serviceService.addService(this.nuevoServicio, this.negocioId).subscribe(response => {
      if (response && response.success) {
        this.loadServices();
        this.nuevoServicio = { nombre: '', descripcion: '', duracion: 0, precio: 0 };
      }
    });
  }

  /**
   * Elimina un servicio por su ID enviando una solicitud al backend.
   */
  eliminarServicio(id: number): void {
    this.serviceService.deleteService(id).subscribe(response => {
      if (response && response.success) {
        this.loadServices();
      }
    });
  }
}