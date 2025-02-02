import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service/service.service';

@Component({
  selector: 'app-services-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.css']
})
export class ServicesManagementComponent implements OnInit {
  servicios: any[] = [];
  nuevoServicio: any = { nombre: '', descripcion: '', duracion: 0, precio: 0 };

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(data => {
      this.servicios = data;
    });
  }

  agregarServicio(): void {
    this.serviceService.addService(this.nuevoServicio).subscribe(success => {
      if (success) {
        this.loadServices();
        this.nuevoServicio = { nombre: '', descripcion: '', duracion: 0, precio: 0 };
      }
    });
  }

  eliminarServicio(id: number): void {
    this.serviceService.deleteService(id).subscribe(success => {
      if (success) {
        this.loadServices();
      }
    });
  }
}