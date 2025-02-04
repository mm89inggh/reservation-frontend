import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Business } from '../../../models/business.model';
import { BusinessService } from '../../../services/business/business.service';

@Component({
  selector: 'app-business-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css'],
})
export class BusinessCreateComponent {
  nuevoNegocio: Business = {
    id_negocio: 0,
    nombre: '',
    direccion: '',
    contacto: '',
    coordenadas: '',
  };

  constructor(private businessService: BusinessService, private router: Router) {}

  /**
   * Crea un nuevo negocio.
   */
  crearNegocio(): void {
    this.businessService.createBusiness(this.nuevoNegocio).subscribe(
      (response) => {
        alert('Negocio creado correctamente');
        this.router.navigate(['/business-info']); // Redirigir a la lista de negocios
      },
      (error) => {
        console.error('Error al crear el negocio:', error);
        alert('Error al crear el negocio');
      }
    );
  }
}