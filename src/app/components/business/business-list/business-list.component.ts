import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../../services/business/business.service';
import { Business } from '../../../models/business.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  negocios: Business[] = [];

  constructor(private businessService: BusinessService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllBusinesses();
  }

  /**
   * Carga la lista de todos los negocios.
   */
  loadAllBusinesses(): void {
    this.businessService.getAllBusinesses().subscribe(
      (response) => {
        this.negocios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

  /**
   * Navega a la vista de información de un negocio.
   * @param id_negocio ID del negocio
   */
  verNegocio(id_negocio: number): void {
    this.router.navigate(['/business-info', id_negocio]);
  }

  /**
   * Elimina un negocio por su ID.
   * @param id_negocio ID del negocio a eliminar
   */
  eliminarNegocio(id_negocio: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este negocio?')) {
      this.businessService.deleteBusiness(id_negocio).subscribe(
        () => {
          alert('Negocio eliminado correctamente');
          this.loadAllBusinesses(); // Recargar la lista de negocios
        },
        (error) => {
          console.error('Error al eliminar el negocio:', error);
          alert('Error al eliminar el negocio');
        }
      );
    }
  }


   /**
   * Navega a la vista de creación de un nuevo negocio.
   */
   crearNegocio(): void {
    this.router.navigate(['/business-create']);
  }
}