import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../services/service/service.service';
import { Service } from '../../../models/Service-manager.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TokenUtilService } from '../../../services/token-util/token-util.service';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, HttpClientModule ],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [CurrencyPipe, ServiceService]
})
export class ServiceListComponent implements OnInit {
  servicios: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router, private tokenUtilService: TokenUtilService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.tokenUtilService.getAttribute('negocioId')
    .then(negocioId => {
      console.log('Custom Field:', negocioId);
      this.porNegocio(negocioId)
    })
    .catch(error => {
      console.error('Failed to retrieve custom field:', error);
    });
  }

  /**
   * Carga la lista de todos los servicios.
   */
  loadAllServices(): void {
    this.serviceService.getAllServices().subscribe(
      (response) => {
        this.servicios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de servicios:', error);
      }
    );
  }

  porNegocio(id: number): void {
    this.serviceService.getServiceByNegocioId(id)
      .pipe(
        catchError(error => {
          console.error('Error al obtener la lista de servicios:', error);
          throw error; // Propagar el error
        })
      )
      .subscribe(response => {
        this.servicios = response;
      });
  }
  


  /**
   * Navega a la vista de información de un servicio.
   * @param id ID del servicio
   */
  verServicio(id: number): void {
    this.router.navigate(['/service-info', id]);
  }

  /**
   * Elimina un servicio por su ID con confirmación.
   * @param id ID del servicio a eliminar
   */
  eliminarServicio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.serviceService.deleteService(id).subscribe(
        () => {
          alert('Servicio eliminado correctamente');
          this.cargar();
        },
        (error) => {
          console.error('Error al eliminar el servicio:', error);
          alert('Error al eliminar el servicio');
        }
      );
    }
  }

  /**
   * Navega a la vista de creación de un nuevo servicio.
   */
  crearServicio(): void {
    this.router.navigate(['/service-create']);
  }
}